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

const app = express();
const PORT = process.env.PORT || 3000;

// ——————————————————————————————
// Middleware
// ——————————————————————————————
app.use(cors());
app.use(express.json());

// Security & performance headers
app.use((req, res, next) => {
  // Cache static assets (icons, CSS, JS) for 1 hour in browsers
  if (req.url.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf)$/i)) {
    res.setHeader("Cache-Control", "public, max-age=3600");
  }
  // Never cache the service worker or HTML (so PWA updates properly)
  if (req.url === "/" || req.url === "/index.html" || req.url.includes("service-worker")) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  }
  // Required for PWA Service Worker scope
  res.setHeader("Service-Worker-Allowed", "/");
  next();
});

// ——————————————————————————————
// Serve Static Files
// ——————————————————————————————
app.use(express.static(path.join(__dirname), {
  index: "index.html",
  extensions: ["html"],
}));

// ——————————————————————————————
// Health Check Endpoint (Render uses this to verify the server is running)
// ——————————————————————————————
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Corner Counter POS",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ——————————————————————————————
// Cloud Sync API Endpoint (stores queued offline data per device)
// ——————————————————————————————
const syncStore = {}; // In-memory store (persists while server is running)

app.post("/api/sync", (req, res) => {
  const { deviceId, companies, syncedAt } = req.body;
  if (!deviceId) {
    return res.status(400).json({ error: "Missing deviceId" });
  }
  syncStore[deviceId] = { companies, syncedAt, receivedAt: Date.now() };
  console.log(`[Sync] Device ${deviceId} synced at ${new Date().toISOString()}`);
  res.json({ success: true, message: "Data synced to cloud", syncedAt: Date.now() });
});

app.get("/api/sync/:deviceId", (req, res) => {
  const { deviceId } = req.params;
  if (!syncStore[deviceId]) {
    return res.json({ found: false, companies: null });
  }
  res.json({ found: true, ...syncStore[deviceId] });
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
