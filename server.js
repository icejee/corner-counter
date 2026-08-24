/**
 * Corner Counter POS — Production Static File Server
 * Deployed on Render.com (https://render.com)
 *
 * This server serves the entire static PWA (HTML, CSS, JS, icons)
 * so it can be accessed remotely from any device worldwide.
 */

const express = require("express");
const path = require("path");
const cors = require("cors");

const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, "cloud_db.json");

// Persistent Store Helper
function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    }
  } catch (err) {
    console.error("Error reading cloud_db.json:", err);
  }
  return { devices: {}, companies: [], lastSyncedAt: Date.now() };
}

function saveDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to cloud_db.json:", err);
  }
}

let db = loadDB();

// ——————————————————————————————
// Middleware
// ——————————————————————————————
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Security & performance headers
app.use((req, res, next) => {
  if (req.url.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf)$/i)) {
    res.setHeader("Cache-Control", "public, max-age=3600");
  }
  if (req.url === "/" || req.url === "/index.html" || req.url.includes("service-worker")) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  }
  res.setHeader("Service-Worker-Allowed", "/");
  next();
});

// ——————————————————————————————
// Health Check Endpoints (Both /health and /api/health)
// ——————————————————————————————
const healthHandler = (req, res) => {
  res.json({
    status: "ok",
    app: "Corner Counter POS",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    devicesCount: Object.keys(db.devices || {}).length,
  });
};

app.get("/health", healthHandler);
app.get("/api/health", healthHandler);

// ——————————————————————————————
// Remote Company Management API Endpoints (Super Admin)
// ——————————————————————————————

// Get all companies from Cloud Master DB
app.get("/api/companies", (req, res) => {
  res.json({
    success: true,
    companies: db.companies || [],
    deletedCompanyIds: db.deletedCompanyIds || [],
    lastSyncedAt: db.lastSyncedAt || Date.now()
  });
});

// Delete company remotely (Super Admin)
app.post("/api/companies/delete", (req, res) => {
  const { companyId } = req.body || {};
  if (!companyId) {
    return res.status(400).json({ error: "Missing companyId" });
  }

  db.companies = (db.companies || []).filter(c => c.id !== companyId);
  db.deletedCompanyIds = db.deletedCompanyIds || [];
  if (!db.deletedCompanyIds.includes(companyId)) {
    db.deletedCompanyIds.push(companyId);
  }
  db.lastSyncedAt = Date.now();
  saveDB(db);

  console.log(`[Remote Delete] Super Admin permanently deleted company ID '${companyId}' from Cloud Server`);

  res.json({
    success: true,
    message: `Company ${companyId} deleted from Cloud Server`,
    companies: db.companies,
    deletedCompanyIds: db.deletedCompanyIds,
    lastSyncedAt: db.lastSyncedAt
  });
});

// ——————————————————————————————
// Cloud Sync API Endpoint (Automatic Offline -> Online Sync)
// ——————————————————————————————
app.post("/api/sync", (req, res) => {
  const { deviceId, companies, deletedCompanyIds, pendingQueue, syncedAt } = req.body || {};
  const devId = deviceId || "pos_terminal_" + Date.now();

  db.deletedCompanyIds = db.deletedCompanyIds || [];
  db.companies = db.companies || [];

  // 1. Process any incoming deleted company IDs from client
  if (Array.isArray(deletedCompanyIds)) {
    deletedCompanyIds.forEach(id => {
      if (!db.deletedCompanyIds.includes(id)) {
        db.deletedCompanyIds.push(id);
      }
    });
  }

  // 2. Process pending sync queue items (e.g. offline delete-company actions)
  if (Array.isArray(pendingQueue)) {
    pendingQueue.forEach(item => {
      if (item && item.type === "delete-company" && item.payload && item.payload.id) {
        const delId = item.payload.id;
        if (!db.deletedCompanyIds.includes(delId)) {
          db.deletedCompanyIds.push(delId);
        }
      }
    });
  }

  // 3. Filter out all deleted companies
  if (Array.isArray(companies)) {
    db.companies = companies.filter(c => !db.deletedCompanyIds.includes(c.id));
  } else {
    db.companies = db.companies.filter(c => !db.deletedCompanyIds.includes(c.id));
  }

  // 4. Save device snapshot
  db.devices = db.devices || {};
  db.devices[devId] = {
    companies: db.companies,
    pendingQueueCount: (pendingQueue || []).length,
    syncedAt: syncedAt || Date.now(),
    receivedAt: Date.now()
  };

  db.lastSyncedAt = Date.now();
  saveDB(db);

  console.log(`[Cloud Sync] Terminal '${devId}' synchronized (${db.companies.length} active companies, ${db.deletedCompanyIds.length} deleted tracked)`);

  res.json({
    success: true,
    message: "Cloud Sync Successful",
    syncedAt: db.lastSyncedAt,
    cloudCompanies: db.companies,
    deletedCompanyIds: db.deletedCompanyIds
  });
});

app.get("/api/sync/:deviceId?", (req, res) => {
  const devId = req.params.deviceId;
  if (devId && db.devices && db.devices[devId]) {
    return res.json({ found: true, ...db.devices[devId] });
  }
  res.json({
    found: true,
    companies: db.companies || [],
    deletedCompanyIds: db.deletedCompanyIds || [],
    lastSyncedAt: db.lastSyncedAt || Date.now()
  });
});

// ——————————————————————————————
// SPA Fallback — serve index.html for all unmatched routes
// (Required for PWA offline / navigation)
// Note: Express 5 uses app.use() for catch-all instead of app.get("*")
// ——————————————————————————————
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ——————————————————————————————
// Start Server
// ——————————————————————————————
app.listen(PORT, () => {
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║       Corner Counter POS  — Server Ready     ║");
  console.log("╠══════════════════════════════════════════════╣");
  console.log(`║  🌐 URL     : http://localhost:${PORT}             ║`);
  console.log(`║  💾 Mode    : Production Static Server        ║`);
  console.log(`║  ☁️  Sync   : /api/sync (cloud backup)        ║`);
  console.log(`║  ❤️  Health : /health                         ║`);
  console.log("╚══════════════════════════════════════════════╝");
});
