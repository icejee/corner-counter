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
// Middleware & CORS Configuration
// ——————————————————————————————
const allowedOrigins = [
  "https://corner-counter-eosin.vercel.app",
  "https://corner-counter-2.onrender.com",
  "http://localhost:3000",
  "http://localhost:8080",
  "http://127.0.0.1:8080"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman) or matching Vercel/Render
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app") || origin.endsWith(".onrender.com")) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive fallback
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

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

  // 3. Smart Merge: Merge incoming companies without wiping other devices' data
  if (Array.isArray(companies) && companies.length > 0) {
    if (!db.companies || db.companies.length === 0) {
      db.companies = companies.filter(c => !db.deletedCompanyIds.includes(c.id));
    } else {
      companies.forEach(incomingComp => {
        if (!incomingComp || !incomingComp.id) return;
        if (db.deletedCompanyIds.includes(incomingComp.id)) return;
        const idx = db.companies.findIndex(c => c.id === incomingComp.id);
        if (idx >= 0) {
          const existing = db.companies[idx];

          // Products: if incoming has products, update; otherwise preserve existing products
          const incomingHasProds = Array.isArray(incomingComp.products) && incomingComp.products.length > 0;
          const mergedProducts = incomingHasProds ? incomingComp.products : (existing.products || []);

          // Staff: merge staff by username / ID
          const staffMap = {};
          (existing.staff || []).forEach(s => { if (s && (s.username || s.id)) staffMap[s.username || s.id] = s; });
          (incomingComp.staff || []).forEach(s => { if (s && (s.username || s.id)) staffMap[s.username || s.id] = s; });

          // Sales: merge sales by sale ID
          const salesMap = {};
          (existing.sales || []).forEach(s => { if (s && s.id) salesMap[s.id] = s; });
          (incomingComp.sales || []).forEach(s => { if (s && s.id) salesMap[s.id] = s; });

          db.companies[idx] = {
            ...existing,
            ...incomingComp,
            products: mergedProducts,
            staff: Object.values(staffMap),
            sales: Object.values(salesMap),
            subscription: incomingComp.subscription || existing.subscription
          };
        } else {
          db.companies.push(incomingComp);
        }
      });
      db.companies = db.companies.filter(c => !db.deletedCompanyIds.includes(c.id));
    }
  } else {
    db.companies = (db.companies || []).filter(c => !db.deletedCompanyIds.includes(c.id));
  }

  // 4. Save device snapshot
  db.devices = db.devices || {};
  db.devices[devId] = {
    syncedAt: syncedAt || Date.now(),
    receivedAt: Date.now(),
    companiesCount: (companies || []).length
  };

  db.lastSyncedAt = Date.now();
  saveDB(db);

  console.log(`[Cloud Sync] Terminal '${devId}' synchronized (${db.companies.length} active master companies, ${db.deletedCompanyIds.length} deleted tracked)`);

  res.json({
    success: true,
    message: "Cloud Sync Successful",
    syncedAt: db.lastSyncedAt,
    cloudCompanies: db.companies,
    companies: db.companies,
    deletedCompanyIds: db.deletedCompanyIds
  });
});

const syncGetHandler = (req, res) => {
  res.json({
    found: true,
    companies: db.companies || [],
    cloudCompanies: db.companies || [],
    deletedCompanyIds: db.deletedCompanyIds || [],
    lastSyncedAt: db.lastSyncedAt || Date.now()
  });
};

app.get("/api/sync", syncGetHandler);
app.get("/api/sync/:deviceId", syncGetHandler);

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
