/* Corner Counter POS — Modern Offline-Ready Point of Sale Engine
 * Features: Dual-pane responsive layout, Dark/Light theme, Web Audio effects,
 * Parked Tabs, Multi-payment (Cash, Card terminal, QR, Split), Discounts/Tips/Taxes,
 * Thermal Receipt Printing, Analytics Dashboard, CSV Export, Inventory Control,
 * Superadmin Company Subscription Management (Activate / Deactivate Service),
 * and Automatic Expiration Warning Alerts for Company Admins.
 */

// ---------- SVG Icons ----------
const ICONS = {
  store: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l1.5-4h17L22 7"/><path d="M4 7v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7"/><path d="M9 21V12h6v9"/><path d="M2 7h20"/></svg>',
  package: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  history: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>',
  analytics: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
  search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
  x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  pencil: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
  chevron: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  wifi: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  wifiOff: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="2 2l20 20"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M5 13a10 10 0 0 1 5.17-2.69"/><path d="M19 13a10 10 0 0 0-2.5-2.19"/><path d="M2 8.82a15 15 0 0 1 4.17-2.66"/><path d="M10.66 5.08A15 15 0 0 1 22 8.82"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  starFilled: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  park: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>',
  print: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>',
  card: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>',
  cash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>',
  qr: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>',
  split: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M12 12H2"/></svg>',
  moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
  volume2: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
  volumeX: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>',
  settings: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  download: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  coffee: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>',
  note: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  shield: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  mobileApp: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/><path d="m9 11 3 3 3-3"/><path d="M12 6v8"/></svg>',
};

const SEED_PRODUCTS = [];

const KEYS = {
  companies: "cc_companies_v1",
  session: "cc_session_v1",
  theme: "cc_theme_v1",
  settings: "cc_settings_v1",
  favorites: "cc_favorites_v1",
  pendingSync: "cc_pending_sync_v1",
  cloudBackup: "cc_cloud_store_v1",
  lastSyncTime: "cc_last_sync_time_v1",
  deletedCompanyIds: "cc_deleted_company_ids_v1",
};

const DEFAULT_SETTINGS = {
  theme: "dark",
  sound: true,
  currency: "$",
  taxRate: 5, // 5% default tax
  storeName: "Corner Counter HQ",
  receiptFooter: "Thank you for supporting our local counter!",
};

const DEFAULT_COMPANIES = [
  {
    id: "company_1",
    name: "Corner Counter HQ",
    products: [],
    sales: [],
    staff: [
      { id: "admin_1", name: "Company Admin", username: "admin", password: "admin123", role: "company_admin" },
      { id: "staff_1", name: "Front Desk", username: "staff", password: "staff123", role: "staff" },
    ],
    invites: [],
    subscription: {
      status: "active",
      plan: "standard",
      startAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30 // 30 days
    }
  },
];

// ---------- State Engine ----------
const state = {
  screen: "sell",
  online: typeof navigator !== "undefined" ? navigator.onLine : true,
  companies: Storage.get(KEYS.companies, DEFAULT_COMPANIES),
  session: Storage.get(KEYS.session, null),
  settings: Storage.get(KEYS.settings, DEFAULT_SETTINGS),
  favorites: Storage.get(KEYS.favorites, []),
  theme: Storage.get(KEYS.theme, "dark"),

  // Cloud Synchronization Engine State
  pendingSyncQueue: Storage.get(KEYS.pendingSync, []),
  lastSyncTime: Storage.get(KEYS.lastSyncTime, null),
  syncStatus: typeof navigator !== "undefined" && !navigator.onLine
    ? "offline_pending"
    : (Storage.get(KEYS.pendingSync, []).length > 0 ? "offline_pending" : "synced"),

  // Products & Sales for current session
  products: [],
  sales: [],

  // Cart & Tabs State
  orderTabs: [
    { id: "tab_1", name: "Order #1", cart: [], discountPct: 0, tipAmt: 0 }
  ],
  activeTabId: "tab_1",
  cartOpen: false,
  checkoutOpen: false,

  // Payment UI state
  paymentMethod: "cash", // 'cash' | 'card' | 'qr' | 'split'
  cashValue: "",
  cardProcessing: false,
  splitCash: "",

  // Filters & Lookups
  search: "",
  staffSearch: "",
  activeCategory: "all",

  // Modals & Overlays
  productForm: null,
  customItemForm: null,
  expandedSaleId: null,
  thermalReceiptSale: null,
  toast: null,
  companyForm: null,
  staffForm: null,
  subscriptionForm: null,
  settingsModal: false,
  itemNoteModal: null,
  installModalOpen: false,
  analyticsTimeframe: "today", // 'today' | 'yesterday' | 'week' | 'month' | 'all'

  loginForm: {
    username: "",
    password: "",
    error: "",
  },
};

// API URL from Environment Configuration (process.env.NEXT_PUBLIC_API_URL)
const NEXT_PUBLIC_API_URL = (function() {
  if (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined" && window.process && window.process.env && window.process.env.NEXT_PUBLIC_API_URL) {
    return window.process.env.NEXT_PUBLIC_API_URL;
  }
  return "https://corner-counter-2.onrender.com";
})();

let syncDebounceTimer = null;

// Cloud Synchronization Engine Helpers
function queuePendingSync(actionType, payload) {
  state.pendingSyncQueue.push({
    id: uid("sync"),
    type: actionType,
    payload: payload,
    timestamp: Date.now()
  });
  Storage.set(KEYS.pendingSync, state.pendingSyncQueue);
  state.syncStatus = "offline_pending";
  render();
}

async function syncWithCloud(isImmediate = false) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    showToast("Offline: Will sync automatically when internet restores");
    return false;
  }

  state.syncStatus = "syncing";
  try { render(); } catch (e) {}

  const deviceId = "master_terminal";

  const deletedIds = Storage.get(KEYS.deletedCompanyIds, []);
  const currentCompanies = Storage.get(KEYS.companies, []).filter(c => !deletedIds.includes(c.id));
  const pendingEvents = [...(state.pendingSyncQueue || [])];

  const payload = {
    deviceId: deviceId,
    companies: currentCompanies,
    deletedCompanyIds: deletedIds,
    pendingQueue: pendingEvents,
    syncedAt: Date.now()
  };

  const targetUrls = Array.from(new Set([
    `${(typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL) || NEXT_PUBLIC_API_URL}/api/sync`,
    `${(typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL) || NEXT_PUBLIC_API_URL}/api/sync/master_terminal`,
    "/api/sync",
    "https://corner-counter-2.onrender.com/api/sync"
  ])).filter(u => !!u);

  let cloudSynced = false;
  let serverCompanies = null;

  for (const url of targetUrls) {
    try {
      if (typeof fetch === "function") {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          cloudSynced = true;
          try {
            const resData = await response.json();
            if (resData && Array.isArray(resData.deletedCompanyIds)) {
              const mergedDeleted = Array.from(new Set([...deletedIds, ...resData.deletedCompanyIds]));
              Storage.set(KEYS.deletedCompanyIds, mergedDeleted);
              state.companies = (state.companies || []).filter(c => !mergedDeleted.includes(c.id));
            }
            if (resData && (Array.isArray(resData.cloudCompanies) || Array.isArray(resData.companies))) {
              serverCompanies = resData.cloudCompanies || resData.companies;
            }
          } catch (e) {
            console.warn("Could not parse cloud sync response JSON", e);
          }
          break; // Successfully synced to server
        }
      }
    } catch (err) {
      // Try next endpoint fallback
    }
  }

  const cloudData = {
    companies: serverCompanies && serverCompanies.length > 0 ? serverCompanies : currentCompanies,
    deletedCompanyIds: deletedIds,
    syncedAt: Date.now(),
    processedEvents: pendingEvents.length,
    remoteSynced: cloudSynced
  };

  Storage.set(KEYS.cloudBackup, cloudData);
  state.pendingSyncQueue = [];
  Storage.set(KEYS.pendingSync, []);
  state.lastSyncTime = Date.now();
  Storage.set(KEYS.lastSyncTime, state.lastSyncTime);
  state.syncStatus = cloudSynced ? "synced" : "synced";

  if (cloudSynced && !isImmediate) {
    showToast("Cloud Sync Complete ☁️ All data updated");
  }
  try { render(); } catch (e) {}
  return true;
}

// Pull latest data from Cloud Master Server (for multi-device sync)
async function pullFromCloud(silent = false) {
  if (typeof fetch !== "function" || (typeof navigator !== "undefined" && !navigator.onLine)) {
    return false;
  }

  const targetUrls = Array.from(new Set([
    `${(typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL) || NEXT_PUBLIC_API_URL}/api/sync/master_terminal`,
    `${(typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL) || NEXT_PUBLIC_API_URL}/api/sync`,
    "/api/sync/master_terminal",
    "https://corner-counter-2.onrender.com/api/sync/master_terminal"
  ])).filter(u => !!u);

  for (const url of targetUrls) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        if (data && (Array.isArray(data.companies) || Array.isArray(data.cloudCompanies))) {
          const cloudList = data.companies || data.cloudCompanies || [];
          const cloudDeleted = data.deletedCompanyIds || [];
          const localDeleted = Storage.get(KEYS.deletedCompanyIds, []);
          const mergedDeleted = Array.from(new Set([...localDeleted, ...cloudDeleted]));
          Storage.set(KEYS.deletedCompanyIds, mergedDeleted);

          const validCloud = cloudList.filter(c => c && c.id && !mergedDeleted.includes(c.id));

          if (validCloud.length > 0) {
            const localStr = JSON.stringify(state.companies || []);
            const cloudStr = JSON.stringify(validCloud);

            if (localStr !== cloudStr) {
              state.companies = validCloud;
              Storage.set(KEYS.companies, validCloud);
              if (!state.activeCompany || !validCloud.find(c => c.id === state.activeCompany.id)) {
                state.activeCompany = validCloud[0];
                Storage.set(KEYS.activeCompanyId, state.activeCompany.id);
              }
              syncCurrentCompanyData();
              state.syncStatus = "synced";
              state.lastSyncTime = data.lastSyncedAt || Date.now();
              Storage.set(KEYS.lastSyncTime, state.lastSyncTime);
              if (!silent) showToast("Cloud data synced across devices ☁️");
              try { render(); } catch (e) {}
              return true;
            }
          }
          state.syncStatus = "synced";
          return true;
        }
      }
    } catch (err) {
      // Try next endpoint fallback
    }
  }
  return false;
}

// Global Network Listeners for Internet Reconnection & Tab Focus
if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
  window.addEventListener("online", () => {
    state.online = true;
    showToast("Internet connected! Syncing with cloud...");
    syncWithCloud();
    pullFromCloud(true);
  });

  window.addEventListener("offline", () => {
    state.online = false;
    state.syncStatus = "offline_pending";
    showToast("Internet disconnected. Operating in offline mode");
    render();
  });

  // Pull latest cloud updates whenever the user switches back to this tab
  window.addEventListener("focus", () => {
    if (navigator.onLine) pullFromCloud(true);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && navigator.onLine) {
      pullFromCloud(true);
    }
  });

  // Periodic multi-device background sync every 20 seconds
  setInterval(() => {
    if (typeof navigator !== "undefined" && navigator.onLine) {
      pullFromCloud(true);
    }
  }, 20000);
}

// Global PWA Install Prompt Handler
let deferredPwaPrompt = null;
if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    state.pwaInstallable = true;
    try { render(); } catch (err) {}
  });

  window.addEventListener("appinstalled", () => {
    deferredPwaPrompt = null;
    state.pwaInstallable = false;
    showToast("App installed on device! 🎉");
    try { render(); } catch (err) {}
  });
}

// Initialize theme & sound
if (typeof PosAudio !== "undefined") {
  PosAudio.enabled = state.settings.sound !== false;
}
document.body.setAttribute("data-theme", state.theme);

if (!Storage.get(KEYS.companies, null)) {
  Storage.set(KEYS.companies, DEFAULT_COMPANIES);
}

// Migration: ensure existing companies have subscription metadata
(function ensureCompanySubscriptions() {
  const comps = Storage.get(KEYS.companies, DEFAULT_COMPANIES) || [];
  let changed = false;
  const now = Date.now();
  for (const c of comps) {
    if (!c.subscription) {
      c.subscription = { status: "active", plan: "standard", startAt: now, expiresAt: now + 1000 * 60 * 60 * 24 * 30 };
      changed = true;
    } else {
      if (!c.subscription.status) {
        c.subscription.status = "active";
        changed = true;
      }
      if (!c.subscription.plan) {
        c.subscription.plan = "standard";
        changed = true;
      }
    }
  }
  if (changed) {
    Storage.set(KEYS.companies, comps);
    if (typeof state !== "undefined") {
      state.companies = comps;
    }
  }
})();

// -- Persistent storage status UI (shows whether storage.persist() granted) --
async function initStorageStatusUI() {
  try {
    const containerId = 'storage-status';
    let el = document.getElementById(containerId);
    if (!el) {
      el = document.createElement('div');
      el.id = containerId;
      el.className = 'storage-status';
      el.textContent = 'Storage: checking...';
      document.body.appendChild(el);
    }

    // ask Storage to persist
    let persisted = false;
    if (Storage && typeof Storage.ensurePersistentStorage === 'function') {
      try {
        persisted = await Storage.ensurePersistentStorage();
      } catch (e) {
        persisted = false;
      }
    }

    if (persisted) {
      el.textContent = 'Storage: persistent';
      el.classList.add('ok');
      el.classList.remove('warn');
    } else {
      el.textContent = 'Storage: best-effort';
      el.classList.add('warn');
      el.classList.remove('ok');
    }
  } catch (err) {
    console.warn('initStorageStatusUI failed', err);
  }
}

// kick off status UI (non-blocking)
(function(){
  try { initStorageStatusUI(); } catch (e) { /* ignore */ }
})();

// If localStorage is empty but an IndexedDB backup exists, show restore prompt
async function checkForIndexedDBRestore() {
  try {
    const companies = Storage.get(KEYS.companies, null);
    if (companies && companies.length) return; // we have data
    if (Storage && typeof Storage.peekIndexedDBBackup === 'function') {
      const backup = await Storage.peekIndexedDBBackup();
      if (backup) {
        // show a simple prompt in the UI
        const id = 'restore-backup';
        if (!document.getElementById(id)) {
          const box = document.createElement('div');
          box.id = id;
          box.className = 'restore-backup';
          box.innerHTML = '<div>Found backup data. Restore?</div>' +
            '<div style="margin-top:8px"><button id="restore-yes">Yes</button> <button id="restore-no">No</button></div>';
          document.body.appendChild(box);
          document.getElementById('restore-yes').addEventListener('click', async () => {
            try {
              const ok = await Storage.restoreFromIndexedDB();
              box.remove();
              if (ok) {
                showToast('Restored backup — reloading UI');
                try { state.companies = Storage.get(KEYS.companies, []); render(); } catch(e){}
              } else {
                showToast('Restore failed');
              }
            } catch (e) { showToast('Restore failed'); }
          });
          document.getElementById('restore-no').addEventListener('click', () => { box.remove(); });
        }
      }
    }
  } catch (err) {
    console.warn('checkForIndexedDBRestore failed', err);
  }
}

// schedule check once DOM ready
document.addEventListener('DOMContentLoaded', () => { try { checkForIndexedDBRestore(); } catch(e){} });

// Helpers for Order Tabs
function getActiveTab() {
  let tab = state.orderTabs.find((t) => t.id === state.activeTabId);
  if (!tab) {
    tab = { id: "tab_1", name: "Order #1", cart: [], discountPct: 0, tipAmt: 0 };
    state.orderTabs.push(tab);
    state.activeTabId = "tab_1";
  }
  return tab;
}

// Global Cart reference (maps to active tab's cart)
Object.defineProperty(state, "cart", {
  get() {
    return getActiveTab().cart;
  },
  set(newCart) {
    getActiveTab().cart = newCart;
  }
});

function money(n) {
  const sym = state.settings.currency || "$";
  const num = typeof n === "number" ? n : parseFloat(n) || 0;
  return sym + (Math.round(num * 100) / 100).toFixed(2);
}

function esc(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function uid(prefix) {
  return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
}

function isSameDay(ts, ref) {
  const a = new Date(ts), b = new Date(ref);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  return days + " day" + (days === 1 ? "" : "s") + " ago";
}

function getCurrentCompany() {
  if (!state.session || (state.session.role !== "staff" && state.session.role !== "company_admin")) return null;
  return state.companies.find((company) => company.id === state.session.companyId) || null;
}

// Subscription Info Helper
function getSubscriptionInfo(company) {
  if (!company || !company.subscription) {
    return {
      status: "active",
      plan: "standard",
      isExpired: false,
      isExpiringSoon: false,
      isDeactivated: false,
      daysLeft: 30,
      expiresAt: Date.now() + 86400000 * 30,
      startAt: Date.now()
    };
  }
  const sub = company.subscription;
  const now = Date.now();
  const isDeactivated = sub.status === "deactivated";
  const expiresAt = typeof sub.expiresAt === "number" ? sub.expiresAt : now;
  const daysLeft = Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24));
  const isExpired = !isDeactivated && (expiresAt <= now);
  const isExpiringSoon = !isDeactivated && !isExpired && (daysLeft <= 7);
  const status = isDeactivated ? "deactivated" : (isExpired ? "expired" : (isExpiringSoon ? "expiring" : "active"));

  return {
    status,
    plan: sub.plan || "standard",
    isExpired,
    isExpiringSoon,
    isDeactivated,
    daysLeft,
    expiresAt,
    startAt: sub.startAt || now
  };
}

function renderSubscriptionStatus(company) {
  const subInfo = getSubscriptionInfo(company);
  const dateStr = new Date(subInfo.expiresAt).toLocaleDateString();

  if (subInfo.isDeactivated) {
    return '<span class="sub-status-pill deactivated">⛔ Deactivated</span> <span style="color:var(--text-muted);">· Service suspended</span>';
  }
  if (subInfo.isExpired) {
    return '<span class="sub-status-pill expired">⚠️ Expired</span> <span style="color:var(--rose);">· Ended ' + timeAgo(subInfo.expiresAt) + ' (' + dateStr + ')</span>';
  }
  if (subInfo.isExpiringSoon) {
    return '<span class="sub-status-pill expiring">⏳ Expiring Soon</span> <span style="color:var(--amber);">· <strong>' + subInfo.daysLeft + ' day' + (subInfo.daysLeft === 1 ? '' : 's') + ' left</strong> (' + dateStr + ')</span>';
  }
  return '<span class="sub-status-pill active">🟢 Active</span> <span style="color:var(--text-muted);">· ' + subInfo.daysLeft + ' days left (' + dateStr + ') · ' + esc(subInfo.plan.toUpperCase()) + '</span>';
}

function renderSubscriptionWarningBanner() {
  const company = getCurrentCompany();
  if (!company) return "";
  const subInfo = getSubscriptionInfo(company);
  const dateStr = new Date(subInfo.expiresAt).toLocaleDateString();

  if (subInfo.isDeactivated) {
    return (
      '<div class="subscription-banner deactivated">' +
      '<div class="sub-banner-icon">⛔</div>' +
      '<div class="sub-banner-content">' +
      '<strong>POS Service Deactivated:</strong> Your store account has been deactivated by the system administrator. Transactions are temporarily suspended. Please contact platform support or settle your account balance to reactivate.' +
      '</div></div>'
    );
  }

  if (subInfo.isExpired) {
    return (
      '<div class="subscription-banner expired">' +
      '<div class="sub-banner-icon">⚠️</div>' +
      '<div class="sub-banner-content">' +
      '<strong>Subscription Expired:</strong> Your plan expired on ' + dateStr + ' (' + timeAgo(subInfo.expiresAt) + '). Please pay your renewal balance immediately to avoid service interruption and lockouts.' +
      '</div></div>'
    );
  }

  if (subInfo.isExpiringSoon) {
    return (
      '<div class="subscription-banner warning">' +
      '<div class="sub-banner-icon">⏳</div>' +
      '<div class="sub-banner-content">' +
      '<strong>Payment Reminder:</strong> Your POS subscription (' + esc(subInfo.plan) + ' plan) expires in <strong>' + subInfo.daysLeft + ' day' + (subInfo.daysLeft === 1 ? '' : 's') + '</strong> on ' + dateStr + '. Please pay your balance on time to maintain continuous POS service.' +
      '</div></div>'
    );
  }

  return "";
}

function syncCurrentCompanyData() {
  const company = getCurrentCompany();
  state.products = company ? company.products : [];
  state.sales = company ? company.sales : [];
}

function persistCompanies(triggerCloud = true) {
  Storage.set(KEYS.companies, state.companies);
  if (triggerCloud) {
    if (syncDebounceTimer) clearTimeout(syncDebounceTimer);
    syncDebounceTimer = setTimeout(() => {
      syncWithCloud(true);
    }, 250);
  }
}

function persistSession() {
  if (state.session) {
    Storage.set(KEYS.session, state.session);
  } else {
    Storage.remove(KEYS.session);
  }
}

function persistProducts() {
  const company = getCurrentCompany();
  if (!company) return;
  company.products = state.products;
  persistCompanies();
}

function persistSales() {
  const company = getCurrentCompany();
  if (!company) return;
  company.sales = state.sales;
  persistCompanies();
}

function persistSettings() {
  Storage.set(KEYS.settings, state.settings);
  Storage.set(KEYS.theme, state.theme);
  if (typeof PosAudio !== "undefined") {
    PosAudio.enabled = state.settings.sound !== false;
  }
}

function persistFavorites() {
  Storage.set(KEYS.favorites, state.favorites);
}

if (state.session && (state.session.role === "staff" || state.session.role === "company_admin")) {
  syncCurrentCompanyData();
}

let toastTimer = null;
function showToast(msg) {
  state.toast = msg;
  render();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    state.toast = null;
    render();
  }, 2200);
}

// ---------- Order Calculations ----------
function cartSubtotal() {
  return state.cart.reduce((s, i) => s + i.qty * i.price, 0);
}

function cartDiscountAmount() {
  const tab = getActiveTab();
  const subtotal = cartSubtotal();
  if (!tab.discountPct) return 0;
  return subtotal * (tab.discountPct / 100);
}

function cartTaxAmount() {
  const rate = (state.settings && state.settings.taxRate) ? state.settings.taxRate : 0;
  const taxable = Math.max(0, cartSubtotal() - cartDiscountAmount());
  return taxable * (rate / 100);
}

function cartTipAmount() {
  return (getActiveTab().tipAmt || 0);
}

function cartTotal() {
  const total = cartSubtotal() - cartDiscountAmount() + cartTaxAmount() + cartTipAmount();
  return Math.max(0, Math.round(total * 100) / 100);
}

function cartCount() {
  return state.cart.reduce((s, i) => s + i.qty, 0);
}

// ---------- Cart & Actions ----------
function addToCart(productId) {
  const company = getCurrentCompany();
  if (company) {
    const subInfo = getSubscriptionInfo(company);
    if (subInfo.isDeactivated) {
      if (typeof PosAudio !== "undefined") PosAudio.playError();
      showToast("Service is deactivated by admin. Contact support.");
      return;
    }
  }

  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  // Stock check
  if (typeof product.stock === "number" && product.stock <= 0) {
    if (typeof PosAudio !== "undefined") PosAudio.playError();
    showToast("Item is out of stock!");
    return;
  }

  const existing = state.cart.find((i) => i.productId === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      qty: 1,
      note: ""
    });
  }

  if (typeof PosAudio !== "undefined") PosAudio.playBeep();
  render();

  const tile = document.querySelector('.product-tile[data-id="' + productId + '"]');
  if (tile) {
    tile.classList.add("pulse");
    setTimeout(() => tile.classList.remove("pulse"), 180);
  }
}

function changeQty(productId, delta) {
  const item = state.cart.find((i) => i.productId === productId);
  if (!item) return;
  item.qty += delta;
  state.cart = state.cart.filter((i) => i.qty > 0);
  if (typeof PosAudio !== "undefined") PosAudio.playTap();
  render();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((i) => i.productId !== productId);
  if (typeof PosAudio !== "undefined") PosAudio.playTap();
  render();
}

function toggleFavorite(productId, e) {
  if (e) e.stopPropagation();
  if (state.favorites.includes(productId)) {
    state.favorites = state.favorites.filter((id) => id !== productId);
  } else {
    state.favorites.push(productId);
  }
  persistFavorites();
  if (typeof PosAudio !== "undefined") PosAudio.playTap();
  render();
}

function completeSale() {
  const company = getCurrentCompany();
  if (company) {
    const subInfo = getSubscriptionInfo(company);
    if (subInfo.isDeactivated) {
      if (typeof PosAudio !== "undefined") PosAudio.playError();
      showToast("Cannot complete sale: Company service is deactivated.");
      return;
    }
  }

  if (state.cart.length === 0) return;
  const total = cartTotal();
  const subtotal = cartSubtotal();
  const tax = cartTaxAmount();
  const tip = cartTipAmount();
  const discount = cartDiscountAmount();
  const method = state.paymentMethod || "cash";

  let cash = total;
  let change = 0;

  if (method === "cash") {
    cash = parseFloat(state.cashValue || "0") || total;
    if (cash < total) {
      if (typeof PosAudio !== "undefined") PosAudio.playError();
      showToast("Cash received is less than amount due!");
      return;
    }
    change = Math.max(0, cash - total);
  } else if (method === "split") {
    const splitCashNum = parseFloat(state.splitCash || "0") || 0;
    cash = splitCashNum;
    change = 0;
  }

  // Decrement inventory stock
  state.cart.forEach((item) => {
    const p = state.products.find((prod) => prod.id === item.productId);
    if (p && typeof p.stock === "number") {
      p.stock = Math.max(0, p.stock - item.qty);
    }
  });
  persistProducts();

  const sale = {
    id: uid("sale"),
    timestamp: Date.now(),
    items: JSON.parse(JSON.stringify(state.cart)),
    subtotal: subtotal,
    discount: discount,
    tax: tax,
    tip: tip,
    total: total,
    cash: cash,
    change: change,
    paymentMethod: method,
    cashier: (state.session && (state.session.displayName || state.session.username)) || "Cashier",
    companyName: (state.session && state.session.companyName) || state.settings.storeName,
  };

  state.sales.unshift(sale);
  persistSales();

  // Cloud Sync Integration
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    queuePendingSync("sale", sale);
  } else {
    syncWithCloud();
  }

  // Reset tab cart
  const tab = getActiveTab();
  tab.cart = [];
  tab.discountPct = 0;
  tab.tipAmt = 0;

  state.checkoutOpen = false;
  state.cartOpen = false;
  state.cashValue = "";
  state.splitCash = "";
  state.thermalReceiptSale = sale;

  // Sound + celebration
  if (typeof PosAudio !== "undefined") PosAudio.playChime();
  if (window.confetti) {
    try {
      window.confetti({ particleCount: 75, spread: 65, origin: { y: 0.65 } });
    } catch (e) {}
  }

  showToast("Sale completed successfully! 🎉");
  render();
}

function loginUser(username, password) {
  const trimmedUser = String(username || "").trim();
  const trimmedPass = String(password || "");

  // Superadmin credentials
  if (trimmedUser === "JOESH" && trimmedPass === "@Icejee01") {
    state.session = { role: "superadmin", username: "JOESH" };
    state.screen = "admin";
    state.cart = [];
    state.loginForm.error = "";
    state.loginForm.username = "";
    state.loginForm.password = "";
    persistSession();
    if (typeof PosAudio !== "undefined") PosAudio.playChime();
    render();
    return true;
  }

  for (const company of state.companies) {
    const staffMember = company.staff.find(
      (member) =>
        String(member.username).trim().toLowerCase() === trimmedUser.toLowerCase() &&
        String(member.password) === trimmedPass
    );

    if (staffMember) {
      const role = String(staffMember.role || "staff");
      state.session = {
        role,
        companyId: company.id,
        companyName: company.name,
        username: staffMember.username,
        displayName: staffMember.name,
      };
      state.screen = "sell";
      state.loginForm.error = "";
      state.loginForm.username = "";
      state.loginForm.password = "";
      syncCurrentCompanyData();
      persistSession();
      if (typeof PosAudio !== "undefined") PosAudio.playChime();
      render();
      return true;
    }
  }

  state.loginForm.error = "Incorrect username or password.";
  if (typeof PosAudio !== "undefined") PosAudio.playError();
  render();
  return false;
}

function logoutUser() {
  state.session = null;
  state.orderTabs = [{ id: "tab_1", name: "Order #1", cart: [], discountPct: 0, tipAmt: 0 }];
  state.activeTabId = "tab_1";
  state.checkoutOpen = false;
  state.cartOpen = false;
  state.cashValue = "";
  state.productForm = null;
  state.companyForm = null;
  state.staffForm = null;
  state.subscriptionForm = null;
  state.thermalReceiptSale = null;
  state.settingsModal = false;
  state.customItemForm = null;
  state.loginForm.username = "";
  state.loginForm.password = "";
  state.loginForm.error = "";
  state.screen = "sell";
  persistSession();
  render();
}

// ---------- Demo Sales Generator ----------
function loadDemoSales() {
  const company = getCurrentCompany();
  if (!company) return;
  const now = Date.now();
  const demoItems = state.products.length ? state.products : SEED_PRODUCTS;

  const dummySales = [
    {
      id: uid("demo_1"),
      timestamp: now - 1000 * 60 * 15,
      items: [{ productId: "p1", name: "Espresso", price: 2.5, qty: 2 }, { productId: "p4", name: "Croissant", price: 3.25, qty: 1 }],
      subtotal: 8.25,
      tax: 0.41,
      tip: 1.0,
      total: 9.66,
      cash: 10.0,
      change: 0.34,
      paymentMethod: "cash",
      cashier: state.session.displayName || "Cashier",
      companyName: company.name
    },
    {
      id: uid("demo_2"),
      timestamp: now - 1000 * 60 * 45,
      items: [{ productId: "p2", name: "Latte", price: 3.75, qty: 2 }, { productId: "p6", name: "Muffin", price: 3.5, qty: 2 }],
      subtotal: 14.5,
      tax: 0.73,
      tip: 2.0,
      total: 17.23,
      cash: 17.23,
      change: 0,
      paymentMethod: "card",
      cashier: state.session.displayName || "Cashier",
      companyName: company.name
    },
    {
      id: uid("demo_3"),
      timestamp: now - 1000 * 60 * 90,
      items: [{ productId: "p3", name: "Iced Tea", price: 3.0, qty: 1 }, { productId: "p5", name: "Bagel", price: 2.75, qty: 1 }],
      subtotal: 5.75,
      tax: 0.29,
      tip: 0.5,
      total: 6.54,
      cash: 6.54,
      change: 0,
      paymentMethod: "qr",
      cashier: state.session.displayName || "Cashier",
      companyName: company.name
    },
  ];

  company.sales = dummySales.concat(company.sales || []);
  state.sales = company.sales;
  persistSales();
  showToast("Loaded 3 demo sales transactions!");
  render();
}

// ---------- CSV Export Helper ----------
function exportSalesToCSV() {
  if (!state.sales || state.sales.length === 0) {
    showToast("No sales data to export");
    return;
  }
  const headers = ["Sale ID", "Date", "Time", "Items", "Subtotal", "Tax", "Tip", "Total", "Payment Method", "Cashier"];
  const rows = state.sales.map((s) => {
    const d = new Date(s.timestamp);
    const dateStr = d.toLocaleDateString();
    const timeStr = d.toLocaleTimeString();
    const itemSummary = s.items.map((i) => `${i.qty}x ${i.name}`).join("; ");
    return [
      s.id,
      dateStr,
      timeStr,
      `"${itemSummary.replace(/"/g, '""')}"`,
      s.subtotal ? s.subtotal.toFixed(2) : s.total.toFixed(2),
      s.tax ? s.tax.toFixed(2) : "0.00",
      s.tip ? s.tip.toFixed(2) : "0.00",
      s.total.toFixed(2),
      s.paymentMethod || "cash",
      `"${(s.cashier || "").replace(/"/g, '""')}"`
    ].join(",");
  });

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `corner_counter_sales_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Sales exported to CSV!");
}

// ---------- Rendering Engine ----------
function render() {
  try {
    renderApp();
  } catch (e) {
    console.error("Render error:", e);
  }
}

function renderApp() {
  const app = document.getElementById("app");
  if (!app) return;

  if (!state.session) {
    app.innerHTML = renderLoginScreen() + (state.inviteAcceptForm ? renderInviteAcceptForm() : "");
    attachDynamicListeners();
    return;
  }

  if (state.session.role === "superadmin") {
    app.innerHTML =
      renderHeader() +
      '<div class="body-scroll" id="body-scroll">' + renderAdminScreen() + "</div>" +
      (state.companyForm ? renderCompanyForm() : "") +
      (state.staffForm ? renderStaffForm() : "") +
      (state.subscriptionForm ? renderSubscriptionForm() : "") +
      (state.settingsModal ? renderSettingsModal() : "") +
      (state.toast ? '<div class="toast">' + esc(state.toast) + "</div>" : "");
    attachDynamicListeners();
    return;
  }

  syncCurrentCompanyData();

  app.innerHTML =
    renderHeader() +
    '<div class="body-scroll" id="body-scroll">' +
    renderSubscriptionWarningBanner() +
    renderMainLayout() +
    "</div>" +
    renderCartBar() +
    renderBottomNav() +
    (state.cartOpen ? renderCartDrawer() : "") +
    (state.checkoutOpen ? renderCheckout() : "") +
    (state.productForm ? renderProductForm() : "") +
    (state.customItemForm ? renderCustomItemModal() : "") +
    (state.thermalReceiptSale ? renderThermalReceiptModal() : "") +
    (state.staffForm ? renderStaffForm() : "") +
    (state.subscriptionForm ? renderSubscriptionForm() : "") +
    (state.settingsModal ? renderSettingsModal() : "") +
    (state.itemNoteModal ? renderItemNoteModal() : "") +
    (state.installModalOpen ? renderInstallModal() : "") +
    (state.toast ? '<div class="toast">' + esc(state.toast) + "</div>" : "");

  attachDynamicListeners();
}

function renderHeader() {
  const dateStr = new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const title =
    state.session && state.session.role === "superadmin"
      ? "Manager"
      : state.session && state.session.role === "company_admin"
        ? "Admin POS"
        : "POS Terminal";

  const company = getCurrentCompany();
  let companyBadge = "";
  if (state.session && state.session.companyName) {
    if (company && company.subscription) {
      const subInfo = getSubscriptionInfo(company);
      if (subInfo.isDeactivated) {
        companyBadge = '<span class="header-store-badge" style="background:var(--rose-glow);color:var(--rose);border-color:var(--rose);">⛔ Deactivated</span>';
      } else if (subInfo.isExpired) {
        companyBadge = '<span class="header-store-badge" style="background:var(--rose-glow);color:var(--rose);border-color:var(--rose);">⚠️ Expired</span>';
      } else if (subInfo.isExpiringSoon) {
        companyBadge = '<span class="header-store-badge" style="background:var(--amber-glow);color:var(--amber);border-color:var(--amber);">⏳ ' + subInfo.daysLeft + 'd left</span>';
      } else {
        companyBadge = '<span class="header-store-badge">' + esc(state.session.companyName) + '</span>';
      }
    } else {
      companyBadge = '<span class="header-store-badge">' + esc(state.session.companyName) + '</span>';
    }
  }

  const themeIcon = state.theme === "light" ? ICONS.moon : ICONS.sun;
  const soundIcon = state.settings.sound !== false ? ICONS.volume2 : ICONS.volumeX;

  let syncPill = "";
  const pendingCount = state.pendingSyncQueue ? state.pendingSyncQueue.length : 0;
  if (state.syncStatus === "syncing") {
    syncPill = '<span class="status-pill cloud-syncing">🔄 Syncing...</span>';
  } else if (pendingCount > 0 || !state.online) {
    syncPill = '<button class="status-pill cloud-pending" data-action="manual-cloud-sync" title="Click to sync queued offline items">☁️ ' + pendingCount + ' Queued</button>';
  } else {
    syncPill = '<button class="status-pill cloud-synced" data-action="manual-cloud-sync" title="Synced with Cloud (Click to resync)">☁️ Synced</button>';
  }

  return (
    '<div class="header">' +
    '<div class="header-brand">' +
    '<div class="header-logo-badge"><img src="icons/icon-192.png" alt="POS Logo" /></div>' +
    '<div class="header-title-wrap">' +
    '<div class="header-title">' + esc(title) + ' ' + companyBadge + '</div>' +
    '<div class="header-subinfo">' + dateStr + ' · ' + esc((state.session && (state.session.displayName || state.session.username)) || "User") + '</div>' +
    '</div>' +
    '</div>' +
    '<div class="header-actions">' +
    '<button class="install-app-btn" data-action="prompt-install-app" title="Download Mobile App">' + ICONS.mobileApp + ' <span>Install App</span></button>' +
    syncPill +
    '<button class="icon-btn" data-action="toggle-theme" title="Toggle Theme">' + themeIcon + '</button>' +
    '<button class="icon-btn" data-action="toggle-sound" title="Toggle Sound">' + soundIcon + '</button>' +
    '<button class="icon-btn" data-action="open-settings" title="Settings">' + ICONS.settings + '</button>' +
    '<div class="status-pill ' + (state.online ? "online" : "offline") + '">' +
    (state.online ? ICONS.wifi : ICONS.wifiOff) +
    '<span>' + (state.online ? "Online" : "Offline") + '</span>' +
    '</div>' +
    '<button class="logout-btn" data-action="logout">Logout</button>' +
    '</div></div>'
  );
}

function renderMainLayout() {
  if (state.session && state.session.role === "staff") return renderSellScreen();
  if (state.screen === "sell") return renderSellScreen();
  if (state.screen === "products") return renderProductsScreen();
  if (state.screen === "analytics") return renderAnalyticsScreen();
  if (state.screen === "staff") return renderManageStaff();
  if (state.screen === "history") return renderHistoryScreen();
  return "";
}

function filteredProducts() {
  let list = state.products;
  if (state.activeCategory === "favorites") {
    list = list.filter((p) => state.favorites.includes(p.id));
  } else if (state.activeCategory !== "all") {
    list = list.filter((p) => p.category && p.category.toLowerCase() === state.activeCategory.toLowerCase());
  }

  const q = state.search.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) => p.name.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q)));
}

function getCategories() {
  const cats = new Set();
  state.products.forEach((p) => {
    if (p.category) cats.add(p.category);
  });
  return Array.from(cats);
}

function renderSellScreen() {
  return (
    '<div class="pos-dual-container">' +
    '<div class="pos-catalog-pane">' +
    renderToolbar() +
    renderCategoryChips() +
    renderFavoritesStrip() +
    renderProductGrid() +
    '</div>' +
    '<div class="pos-order-pane">' +
    renderOrderTabsBar() +
    renderOrderLedger() +
    '</div>' +
    '</div>'
  );
}

function renderToolbar() {
  const isAdmin = !state.session || state.session.role === "company_admin" || state.session.role === "superadmin";
  return (
    '<div class="toolbar-row">' +
    '<div class="search-box">' +
    '<span class="search-icon">' + ICONS.search + '</span>' +
    '<input id="search-input" type="text" placeholder="Search catalog by name or category..." value="' + esc(state.search) + '" />' +
    '</div>' +
    (isAdmin ? '<button class="pill-btn" data-action="open-add-product" title="Add Product to Catalog">' + ICONS.plus + ' <span>Add Item</span></button>' : '') +
    '<button class="pill-btn" style="background:var(--surface-raised);border:1px solid var(--border);color:var(--text-primary);" data-action="open-custom-item">' + ICONS.plus + ' <span>Custom</span></button>' +
    '</div>'
  );
}

function renderCategoryChips() {
  const cats = getCategories();
  const allCount = state.products.length;
  const favCount = state.products.filter((p) => state.favorites.includes(p.id)).length;

  return (
    '<div class="category-chips-bar">' +
    '<button class="category-chip ' + (state.activeCategory === "all" ? "active" : "") + '" data-action="select-category" data-cat="all">' +
    'All Products <span class="category-chip-count">' + allCount + '</span></button>' +
    '<button class="category-chip ' + (state.activeCategory === "favorites" ? "active" : "") + '" data-action="select-category" data-cat="favorites">' +
    ICONS.starFilled + ' Starred <span class="category-chip-count">' + favCount + '</span></button>' +
    cats.map((c) => {
      const count = state.products.filter((p) => p.category === c).length;
      return (
        '<button class="category-chip ' + (state.activeCategory.toLowerCase() === c.toLowerCase() ? "active" : "") + '" data-action="select-category" data-cat="' + esc(c) + '">' +
        esc(c) + ' <span class="category-chip-count">' + count + '</span></button>'
      );
    }).join("") +
    '</div>'
  );
}

function renderFavoritesStrip() {
  const favItems = state.products.filter((p) => state.favorites.includes(p.id));
  if (favItems.length === 0 || state.activeCategory === "favorites") return "";

  return (
    '<div class="favorites-section">' +
    '<div class="section-label"><span>Quick Tap Favorites</span>' + ICONS.starFilled + '</div>' +
    '<div class="favorites-strip">' +
    favItems.map((p) => (
      '<button class="fav-tile" data-action="add-to-cart" data-id="' + p.id + '">' +
      '<div class="fav-icon">' + esc(p.icon || "🛒") + '</div>' +
      '<div class="fav-name">' + esc(p.name) + '</div>' +
      '<div class="fav-price">' + money(p.price) + '</div>' +
      '</button>'
    )).join("") +
    '</div></div>'
  );
}

function renderProductGrid() {
  const list = filteredProducts();

  if (list.length === 0) {
    if (state.products.length === 0) {
      const isAdmin = !state.session || state.session.role === "company_admin" || state.session.role === "superadmin";
      return (
        '<div class="empty-state" style="padding:40px 20px;">' +
        '<div class="empty-icon">' + ICONS.package + '</div>' +
        '<div class="empty-title">Store Catalog is Empty</div>' +
        '<div class="empty-body">You have no products listed in your inventory yet. Add what you sell to start taking orders!</div>' +
        '<div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap;justify-content:center;">' +
        (isAdmin ? '<button class="pill-btn" data-action="open-add-product">' + ICONS.plus + ' Add First Product</button>' : '') +
        '<button class="pill-btn" style="background:var(--surface-raised);border:1px solid var(--border);color:var(--text-primary);" data-action="open-custom-item">' + ICONS.plus + ' Add Custom Item</button>' +
        '</div>' +
        '</div>'
      );
    }
    return renderEmpty("No products found", "Try clearing your search query.");
  }

  return (
    '<div class="product-grid">' +
    list.map((p) => {
      const isFav = state.favorites.includes(p.id);
      const stockBadge = (typeof p.stock === "number")
        ? (p.stock <= 5
          ? '<span class="stock-badge low">' + (p.stock === 0 ? "Out of Stock" : p.stock + " left") + '</span>'
          : '<span class="stock-badge unlimited">' + p.stock + ' in stock</span>')
        : "";

      return (
        '<div class="product-tile" data-action="add-to-cart" data-id="' + p.id + '">' +
        '<div class="product-tile-top">' +
        '<div class="product-icon">' + esc(p.icon || "🛒") + '</div>' +
        '<button class="star-toggle-btn ' + (isFav ? "starred" : "") + '" data-action="toggle-fav" data-id="' + p.id + '">' +
        (isFav ? ICONS.starFilled : ICONS.star) +
        '</button>' +
        '</div>' +
        '<div class="product-name">' + esc(p.name) + '</div>' +
        stockBadge +
        '<div class="product-price-row">' +
        '<span class="product-price">' + money(p.price) + '</span>' +
        '<span class="product-add-badge">' + ICONS.plus + '</span>' +
        '</div>' +
        '</div>'
      );
    }).join("") +
    '</div>'
  );
}

function renderOrderTabsBar() {
  return (
    '<div class="order-tabs-bar">' +
    state.orderTabs.map((t) => {
      const active = t.id === state.activeTabId;
      const count = t.cart.reduce((s, i) => s + i.qty, 0);
      return (
        '<button class="order-tab ' + (active ? "active" : "") + '" data-action="switch-tab" data-id="' + t.id + '">' +
        ICONS.park + ' ' + esc(t.name) + (count > 0 ? ' (' + count + ')' : '') +
        '</button>'
      );
    }).join("") +
    '<button class="order-tab-add-btn" data-action="add-new-tab" title="Hold / Park New Order Tab">' + ICONS.plus + '</button>' +
    '</div>'
  );
}

function renderOrderLedger() {
  const tab = getActiveTab();
  const rows = tab.cart.length === 0
    ? renderEmpty("No items in order", "Tap any product in the catalog to add it here.")
    : '<div class="order-items-list">' +
      tab.cart.map((item) => (
        '<div class="cart-row">' +
        '<div class="cart-row-icon">' + esc(item.icon || "🛒") + '</div>' +
        '<div class="cart-row-info">' +
        '<div class="cart-row-name">' + esc(item.name) + '</div>' +
        (item.note ? '<div class="cart-row-note">' + ICONS.note + ' ' + esc(item.note) + '</div>' : '') +
        '<div class="cart-row-unit">' + money(item.price) + ' each · <a href="#" data-action="open-item-note" data-id="' + item.productId + '" style="color:var(--cyan);text-decoration:none;font-size:11px;">+ Note</a></div>' +
        '</div>' +
        '<div class="stepper">' +
        '<button class="stepper-btn" data-action="qty-dec" data-id="' + item.productId + '">' + ICONS.minus + '</button>' +
        '<span class="stepper-qty">' + item.qty + '</span>' +
        '<button class="stepper-btn" data-action="qty-inc" data-id="' + item.productId + '">' + ICONS.plus + '</button>' +
        '</div>' +
        '<button class="remove-btn" data-action="remove-item" data-id="' + item.productId + '">' + ICONS.trash + '</button>' +
        '</div>'
      )).join("") +
      '</div>';

  const subtotal = cartSubtotal();
  const discount = cartDiscountAmount();
  const tax = cartTaxAmount();
  const tip = cartTipAmount();
  const total = cartTotal();

  const modifiers = (
    '<div class="order-modifiers-section">' +
    '<div class="modifier-row">' +
    '<span class="modifier-label">Discount</span>' +
    '<div class="modifier-pills">' +
    [0, 5, 10, 15, 20].map((pct) => (
      '<button class="mod-pill ' + ((tab.discountPct || 0) === pct ? "active" : "") + '" data-action="set-discount" data-val="' + pct + '">' + (pct === 0 ? "None" : pct + "%") + '</button>'
    )).join("") +
    '</div></div>' +
    '<div class="modifier-row">' +
    '<span class="modifier-label">Tip</span>' +
    '<div class="modifier-pills">' +
    [0, 1, 2, 5].map((amt) => (
      '<button class="mod-pill ' + ((tab.tipAmt || 0) === amt ? "active" : "") + '" data-action="set-tip" data-val="' + amt + '">' + (amt === 0 ? "None" : money(amt)) + '</button>'
    )).join("") +
    '</div></div>' +
    '</div>'
  );

  const summary = (
    '<div class="order-summary-footer">' +
    '<div class="summary-line"><span>Subtotal</span><span>' + money(subtotal) + '</span></div>' +
    (discount > 0 ? '<div class="summary-line discount"><span>Discount (' + tab.discountPct + '%)</span><span>-' + money(discount) + '</span></div>' : '') +
    (tax > 0 ? '<div class="summary-line tax"><span>Tax (' + state.settings.taxRate + '%)</span><span>+' + money(tax) + '</span></div>' : '') +
    (tip > 0 ? '<div class="summary-line tip"><span>Tip</span><span>+' + money(tip) + '</span></div>' : '') +
    '<div class="summary-total-line">' +
    '<span class="summary-total-label">Total Due</span>' +
    '<span class="summary-total-value">' + money(total) + '</span>' +
    '</div>' +
    '<div class="checkout-action-row">' +
    '<button class="btn-park-tab" data-action="rename-tab" title="Rename Table/Tab">' + ICONS.pencil + ' Rename Tab</button>' +
    '<button class="btn-charge-now" data-action="open-checkout"' + (total > 0 && tab.cart.length > 0 ? "" : " disabled") + '>' +
    ICONS.check + ' Charge ' + money(total) +
    '</button>' +
    '</div>' +
    '</div>'
  );

  return (
    '<div class="order-ledger-head">' +
    '<div class="order-ledger-title">' + esc(tab.name) + ' <span class="badge" style="font-size:12px;color:var(--text-muted);font-weight:normal;">(' + cartCount() + ' items)</span></div>' +
    (tab.cart.length > 0 ? '<button class="text-btn danger" data-action="clear-current-tab">Clear</button>' : '') +
    '</div>' +
    rows +
    modifiers +
    summary
  );
}

function renderCartBar() {
  if (state.screen !== "sell" || state.cart.length === 0 || state.cartOpen) return "";
  return (
    '<button class="cart-bar" data-action="open-cart">' +
    '<div class="cart-bar-left">' +
    '<div class="cart-count">' + cartCount() + '</div>' +
    '<span class="cart-bar-label">View Order Ledger</span>' +
    '</div>' +
    '<span class="cart-bar-total">' + money(cartTotal()) + '</span>' +
    '</button>'
  );
}

function renderBottomNav() {
  if (state.session && state.session.role === "staff") {
    return (
      '<div class="bottom-nav">' +
      '<button class="nav-btn active" data-action="nav" data-screen="sell">' + ICONS.store + '<span class="nav-label">Sell</span></button>' +
      '</div>'
    );
  }

  const tabs = [
    { key: "sell", label: "Sell", icon: ICONS.store },
    { key: "products", label: "Products", icon: ICONS.package },
    { key: "analytics", label: "Analytics", icon: ICONS.analytics },
    { key: "history", label: "History", icon: ICONS.history },
  ];

  if (state.session && state.session.role === "company_admin") {
    tabs.push({ key: "staff", label: "Staff", icon: ICONS.package });
  }

  return (
    '<div class="bottom-nav">' +
    tabs.map((t) => (
      '<button class="nav-btn' + (state.screen === t.key ? " active" : "") + '" data-action="nav" data-screen="' + t.key + '">' +
      t.icon +
      '<span class="nav-label">' + t.label + '</span></button>'
    )).join("") +
    '</div>'
  );
}

// ---------- Checkout & Payments (Cash, Card, QR, Split) ----------
function renderCheckout() {
  const total = cartTotal();
  const cash = parseFloat(state.cashValue || "0") || 0;
  const change = cash - total;
  const canConfirm = cash >= total && total > 0;
  const method = state.paymentMethod || "cash";

  // Quick denomination suggestions
  const rawSuggestions = [total, Math.ceil(total / 5) * 5, Math.ceil(total / 10) * 10, Math.ceil(total / 20) * 20, 50, 100];
  const quick = Array.from(new Set(rawSuggestions.filter((n) => n >= total))).sort((a, b) => a - b).slice(0, 4);

  let paymentBody = "";

  if (method === "cash") {
    paymentBody = (
      '<div class="quick-amounts">' +
      quick.map((amt) => '<button class="quick-amt-btn" data-action="quick-cash" data-amount="' + amt.toFixed(2) + '">' + money(amt) + '</button>').join("") +
      '</div>' +
      '<div class="cash-row"><span class="cash-row-label">Cash Received</span>' +
      '<input id="cash-input" class="cash-input" type="number" inputmode="decimal" placeholder="0.00" value="' + esc(state.cashValue) + '" /></div>' +
      '<div class="change-row"><span class="change-label">Change Due</span>' +
      '<span id="change-value" class="change-value ' + (change >= 0 ? "ok" : "short") + '">' + money(Math.max(0, change)) + '</span></div>'
    );
  } else if (method === "card") {
    paymentBody = (
      '<div class="card-terminal-box">' +
      '<div class="nfc-wave-ring">' + ICONS.card + '</div>' +
      '<div class="terminal-prompt">Ready for Contactless / Chip Card</div>' +
      '<div class="terminal-sub">Customer can tap or insert card on the terminal</div>' +
      '<button class="btn-simulate-tap" data-action="simulate-card-pay">' +
      (state.cardProcessing ? 'Processing Transaction...' : 'Tap to Simulate Card Payment') +
      '</button>' +
      '</div>'
    );
  } else if (method === "qr") {
    paymentBody = (
      '<div class="qr-payment-box">' +
      '<div class="qr-code-frame">' +
      '<svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="1.8">' +
      '<rect width="6" height="6" x="2" y="2" rx="1" fill="#0f172a"/>' +
      '<rect width="6" height="6" x="16" y="2" rx="1" fill="#0f172a"/>' +
      '<rect width="6" height="6" x="2" y="16" rx="1" fill="#0f172a"/>' +
      '<rect x="10" y="4" width="4" height="2" fill="#0f172a"/>' +
      '<rect x="10" y="8" width="2" height="6" fill="#0f172a"/>' +
      '<rect x="14" y="10" width="6" height="2" fill="#0f172a"/>' +
      '<rect x="16" y="16" width="6" height="6" rx="1" fill="#0f172a"/>' +
      '</svg>' +
      '</div>' +
      '<div class="terminal-prompt">Scan QR Code to Pay ' + money(total) + '</div>' +
      '<div class="terminal-sub">Instant Apple Pay / Google Pay / Mobile Wallet</div>' +
      '<button class="btn-simulate-tap" data-action="simulate-qr-pay">Simulate Customer Scan & Pay</button>' +
      '</div>'
    );
  } else if (method === "split") {
    const splitCashNum = parseFloat(state.splitCash || "0") || 0;
    const remainingCard = Math.max(0, total - splitCashNum);
    paymentBody = (
      '<div style="display:flex;flex-direction:column;gap:12px;">' +
      '<div class="cash-row"><span class="cash-row-label">Cash Portion</span>' +
      '<input id="split-cash-input" class="cash-input" type="number" placeholder="0.00" value="' + esc(state.splitCash) + '" /></div>' +
      '<div class="change-row"><span class="change-label">Remaining Card Charge</span>' +
      '<span class="change-value ok">' + money(remainingCard) + '</span></div>' +
      '<button class="btn-teal" data-action="confirm-split-sale" ' + (splitCashNum > 0 && splitCashNum < total ? "" : "disabled") + '>Complete Split Payment</button>' +
      '</div>'
    );
  }

  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-checkout"></div>' +
    '<div class="sheet">' +
    '<div class="sheet-header"><div class="sheet-title">Take Payment</div>' +
    '<button class="sheet-close" data-action="close-checkout">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<div class="due-block"><div class="due-label">Total Amount Due</div><div class="due-amount">' + money(total) + '</div></div>' +
    '<div class="payment-tabs">' +
    '<button class="payment-tab-btn ' + (method === "cash" ? "active" : "") + '" data-action="set-payment-method" data-method="cash">' + ICONS.cash + ' Cash</button>' +
    '<button class="payment-tab-btn ' + (method === "card" ? "active" : "") + '" data-action="set-payment-method" data-method="card">' + ICONS.card + ' Card</button>' +
    '<button class="payment-tab-btn ' + (method === "qr" ? "active" : "") + '" data-action="set-payment-method" data-method="qr">' + ICONS.qr + ' QR Pay</button>' +
    '<button class="payment-tab-btn ' + (method === "split" ? "active" : "") + '" data-action="set-payment-method" data-method="split">' + ICONS.split + ' Split</button>' +
    '</div>' +
    paymentBody +
    '</div>' +
    (method === "cash"
      ? '<div class="sheet-footer"><button id="confirm-sale-btn" class="btn-teal" data-action="confirm-sale"' + (canConfirm ? "" : " disabled") + '>' + ICONS.check + ' Complete Sale</button></div>'
      : '') +
    '</div></div>'
  );
}

function renderCartDrawer() {
  const tab = getActiveTab();
  const rows = tab.cart.length === 0
    ? renderEmpty("Cart is empty", "Tap a product to add it here.")
    : tab.cart.map((item) => (
      '<div class="cart-row">' +
      '<div class="cart-row-icon">' + esc(item.icon || "🛒") + '</div>' +
      '<div class="cart-row-info"><div class="cart-row-name">' + esc(item.name) + '</div>' +
      '<div class="cart-row-unit">' + money(item.price) + ' each</div></div>' +
      '<div class="stepper">' +
      '<button class="stepper-btn" data-action="qty-dec" data-id="' + item.productId + '">' + ICONS.minus + '</button>' +
      '<span class="stepper-qty">' + item.qty + '</span>' +
      '<button class="stepper-btn" data-action="qty-inc" data-id="' + item.productId + '">' + ICONS.plus + '</button>' +
      '</div>' +
      '<button class="remove-btn" data-action="remove-item" data-id="' + item.productId + '">' + ICONS.trash + '</button>' +
      '</div>'
    )).join("");

  const footer = tab.cart.length === 0 ? "" : (
    '<div class="sheet-footer">' +
    '<button class="btn-teal" data-action="open-checkout">Proceed to Checkout ' + money(cartTotal()) + '</button>' +
    '</div>'
  );

  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-cart"></div>' +
    '<div class="sheet"><div class="sheet-header"><div class="sheet-title">Current Order (' + tab.name + ')</div>' +
    '<button class="sheet-close" data-action="close-cart">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' + rows + '</div>' +
    footer +
    '</div></div>'
  );
}

// ---------- Digital Thermal Receipt Modal ----------
function renderThermalReceiptModal() {
  const sale = state.thermalReceiptSale;
  if (!sale) return "";

  const timeStr = new Date(sale.timestamp).toLocaleString();

  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="dismiss-receipt"></div>' +
    '<div class="sheet" style="max-width:380px;">' +
    '<div class="sheet-header"><div class="sheet-title">Sale Complete 🎉</div>' +
    '<button class="sheet-close" data-action="dismiss-receipt">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<div class="thermal-receipt-container" id="printable-receipt">' +
    '<div class="receipt-store-name">' + esc(sale.companyName || state.settings.storeName) + '</div>' +
    '<div style="text-align:center;font-size:11px;color:#6b7280;margin-top:2px;">OFFLINE POS RECEIPT</div>' +
    '<div style="text-align:center;font-size:10px;color:#9ca3af;">' + timeStr + '</div>' +
    '<div style="text-align:center;font-size:10px;color:#9ca3af;">Cashier: ' + esc(sale.cashier) + ' · ID: ' + esc(sale.id.slice(-6)) + '</div>' +
    '<div class="receipt-divider"></div>' +
    sale.items.map((i) => (
      '<div class="receipt-line"><span>' + i.qty + 'x ' + esc(i.name) + '</span><span>' + money(i.qty * i.price) + '</span></div>'
    )).join("") +
    '<div class="receipt-divider"></div>' +
    '<div class="receipt-line"><span>Subtotal</span><span>' + money(sale.subtotal || sale.total) + '</span></div>' +
    (sale.tax ? '<div class="receipt-line"><span>Tax</span><span>' + money(sale.tax) + '</span></div>' : '') +
    (sale.tip ? '<div class="receipt-line"><span>Tip</span><span>' + money(sale.tip) + '</span></div>' : '') +
    '<div class="receipt-line total"><span>TOTAL PAID</span><span>' + money(sale.total) + '</span></div>' +
    '<div class="receipt-line" style="font-size:11px;color:#6b7280;"><span>Method</span><span>' + (sale.paymentMethod || "cash").toUpperCase() + '</span></div>' +
    (sale.paymentMethod === "cash" ? '<div class="receipt-line" style="font-size:11px;color:#6b7280;"><span>Change</span><span>' + money(sale.change) + '</span></div>' : '') +
    '<div class="receipt-barcode">||| | |||| | || | |||</div>' +
    '<div class="receipt-footer-text">' + esc(state.settings.receiptFooter || "Thank you!") + '</div>' +
    '<div class="receipt-serrated-edge"></div>' +
    '</div>' +
    '</div>' +
    '<div class="sheet-footer" style="display:flex;gap:8px;">' +
    '<button class="pill-btn" style="flex:1;" data-action="print-receipt">' + ICONS.print + ' Print Receipt</button>' +
    '<button class="mini-btn" style="flex:1;" data-action="dismiss-receipt">Done</button>' +
    '</div>' +
    '</div></div>'
  );
}

// ---------- Analytics Screen ----------
function renderAnalyticsScreen() {
  const sales = state.sales || [];
  const now = Date.now();

  let filtered = sales;
  if (state.analyticsTimeframe === "today") {
    filtered = sales.filter((s) => isSameDay(s.timestamp, now));
  } else if (state.analyticsTimeframe === "yesterday") {
    filtered = sales.filter((s) => isSameDay(s.timestamp, now - 86400000));
  } else if (state.analyticsTimeframe === "week") {
    filtered = sales.filter((s) => now - s.timestamp <= 86400000 * 7);
  } else if (state.analyticsTimeframe === "month") {
    filtered = sales.filter((s) => now - s.timestamp <= 86400000 * 30);
  }

  const grossRev = filtered.reduce((s, x) => s + x.total, 0);
  const totalOrders = filtered.length;
  const aov = totalOrders > 0 ? grossRev / totalOrders : 0;
  const totalTax = filtered.reduce((s, x) => s + (x.tax || 0), 0);
  const totalTips = filtered.reduce((s, x) => s + (x.tip || 0), 0);

  // Top products count
  const productTally = {};
  filtered.forEach((sale) => {
    sale.items.forEach((item) => {
      productTally[item.name] = (productTally[item.name] || 0) + item.qty;
    });
  });
  const topProducts = Object.entries(productTally).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxQty = topProducts.length ? topProducts[0][1] : 1;

  return (
    '<div class="screen">' +
    '<div class="screen-header-row">' +
    '<div class="screen-title">Sales Analytics & Reports</div>' +
    '<div style="display:flex;gap:6px;">' +
    '<button class="pill-btn" data-action="export-csv">' + ICONS.download + ' Export CSV</button>' +
    (sales.length === 0 ? '<button class="mini-btn" data-action="load-demo-sales">Load Demo Data</button>' : '') +
    '</div>' +
    '</div>' +
    '<div class="analytics-dashboard">' +
    '<div class="timeframe-selector">' +
    ['today', 'yesterday', 'week', 'month', 'all'].map((tf) => (
      '<button class="timeframe-pill ' + (state.analyticsTimeframe === tf ? "active" : "") + '" data-action="set-analytics-tf" data-tf="' + tf + '">' +
      (tf === "today" ? "Today" : tf === "yesterday" ? "Yesterday" : tf === "week" ? "Last 7 Days" : tf === "month" ? "This Month" : "All Time") +
      '</button>'
    )).join("") +
    '</div>' +
    '<div class="kpi-grid">' +
    '<div class="kpi-card"><span class="kpi-label">Gross Revenue</span><span class="kpi-value">' + money(grossRev) + '</span><span class="kpi-sub">' + totalOrders + ' transactions</span></div>' +
    '<div class="kpi-card"><span class="kpi-label">Avg Order Value</span><span class="kpi-value">' + money(aov) + '</span><span class="kpi-sub">per ticket</span></div>' +
    '<div class="kpi-card"><span class="kpi-label">Total Tax Collected</span><span class="kpi-value">' + money(totalTax) + '</span><span class="kpi-sub">sales tax</span></div>' +
    '<div class="kpi-card"><span class="kpi-label">Total Tips</span><span class="kpi-value">' + money(totalTips) + '</span><span class="kpi-sub">gratuity</span></div>' +
    '</div>' +
    '<div class="chart-card">' +
    '<div class="chart-card-head">' +
    '<div class="chart-card-title">Top-Selling Products (Units Sold)</div>' +
    '</div>' +
    (topProducts.length === 0 ? renderEmpty("No sales in this period", "Complete sales to view rankings.") : topProducts.map(([name, qty]) => {
      const pct = Math.round((qty / maxQty) * 100);
      return (
        '<div class="top-seller-row">' +
        '<div class="top-seller-info"><span>' + esc(name) + '</span><span>' + qty + ' units</span></div>' +
        '<div class="top-seller-bar-track"><div class="top-seller-bar-fill" style="width:' + pct + '%;"></div></div>' +
        '</div>'
      );
    }).join("")) +
    '</div>' +
    '</div></div>'
  );
}

// ---------- Products & Inventory Screen ----------
function renderProductsScreen() {
  const rows =
    state.products.length === 0
      ? renderEmpty("No products yet", "Add your first item to start selling.")
      : '<div class="product-list">' +
        state.products
          .map(
            (p) =>
              '<button class="product-list-row" data-action="edit-product" data-id="' + p.id + '">' +
              '<div class="product-list-icon">' + esc(p.icon || "🛒") + '</div>' +
              '<div class="product-list-info"><div class="product-list-name">' + esc(p.name) + '</div>' +
              '<div class="product-list-cat">' + esc(p.category || "General") + ' · Stock: ' + (typeof p.stock === "number" ? p.stock : "Unlimited") + '</div></div>' +
              '<span class="product-list-price">' + money(p.price) + '</span>' +
              '<span class="product-list-edit">' + ICONS.pencil + '</span>' +
              '</button>'
          )
          .join("") +
        '</div>';

  return (
    '<div class="screen">' +
    '<div class="screen-header-row"><div class="screen-title">Product Catalog & Inventory</div>' +
    '<button class="pill-btn" data-action="open-add-product">' + ICONS.plus + ' Add Item</button></div>' +
    rows +
    '</div>'
  );
}

// ---------- History Screen ----------
function renderHistoryScreen() {
  const today = state.sales.filter((s) => isSameDay(s.timestamp, Date.now()));
  const todayTotal = today.reduce((s, x) => s + x.total, 0);

  const list =
    state.sales.length === 0
      ? renderEmpty("No sales yet", "Completed sales will show up here.")
      : state.sales
          .map((s) => {
            const open = state.expandedSaleId === s.id;
            const time = new Date(s.timestamp).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
            const itemCount = s.items.reduce((n, i) => n + i.qty, 0);
            const detail = open
              ? '<div class="sale-detail">' +
                s.items
                  .map(
                    (i) =>
                      '<div class="sale-detail-item"><span>' + i.qty + "× " + esc(i.name) + "</span><span>" + money(i.qty * i.price) + "</span></div>"
                  )
                  .join("") +
                '<div class="sale-detail-foot"><span>Payment: ' + (s.paymentMethod || "cash").toUpperCase() + '</span><span>Change: ' + money(s.change || 0) + '</span></div>' +
                '<div class="sale-actions-row">' +
                '<button class="mini-btn" data-action="view-thermal-receipt" data-id="' + s.id + '">' + ICONS.print + ' Receipt Slip</button>' +
                '</div>' +
                "</div>"
              : "";
            return (
              '<div class="sale-card">' +
              '<button class="sale-card-row" data-action="toggle-sale" data-id="' + s.id + '">' +
              '<div><div class="sale-time">' + time + '</div><div class="sale-meta">' + itemCount + " item" + (itemCount === 1 ? "" : "s") + " · " + (s.paymentMethod || "cash").toUpperCase() + "</div></div>" +
              '<div style="display:flex;align-items:center;">' +
              '<span class="sale-total">' + money(s.total) + "</span>" +
              '<span class="sale-chevron' + (open ? " open" : "") + '">' + ICONS.chevron + "</span>" +
              "</div></button>" +
              detail +
              "</div>"
            );
          })
          .join("");

  return (
    '<div class="screen">' +
    '<div class="history-summary"><div><div class="history-summary-label">Today\'s Register Total (' + today.length + " sales)</div>" +
    '<div class="history-summary-value">' + money(todayTotal) + "</div></div>" + ICONS.history + "</div>" +
    list +
    "</div>"
  );
}

// ---------- Staff Management Screen ----------
function renderManageStaff() {
  const company = getCurrentCompany();
  if (!company) return renderEmpty("No company selected", "You must be a company admin to manage staff.");

  const q = (state.staffSearch || "").trim().toLowerCase();
  const filtered = q
    ? company.staff.filter((m) => m.name.toLowerCase().includes(q) || m.username.toLowerCase().includes(q))
    : company.staff;

  const rows = filtered
    .map(
      (member) =>
        '<div class="staff-row"><div><div class="staff-name">' + esc(member.name) + ' (' + (member.role || "staff") + ')</div>' +
        '<div class="staff-user">@' + esc(member.username) + '</div></div>' +
        '<div class="staff-actions"><button class="mini-btn" data-action="edit-staff" data-id="' + member.id + '">Edit</button>' +
        '<button class="text-btn danger" data-action="delete-staff" data-company-id="' + company.id + '" data-id="' + member.id + '">Remove</button></div>' +
        '</div>'
    )
    .join("");

  return (
    '<div class="screen">' +
    '<div class="screen-header-row"><div class="screen-title">Staff Management</div>' +
    '<div class="screen-header-actions" style="display:flex;gap:6px;"><input id="staff-search-input" class="form-input" style="width:140px;padding:6px 10px;" placeholder="Search..." value="' + esc(state.staffSearch) + '" />' +
    '<button class="pill-btn" data-action="open-staff-form" data-id="' + company.id + '">' + ICONS.plus + ' Add Staff</button>' +
    '<button class="mini-btn" data-action="invite-company" data-id="' + company.id + '">Invite</button>' +
    '</div></div>' +
    (company.invites && company.invites.length ? '<div style="margin-bottom:12px;background:var(--surface);padding:10px;border-radius:10px;border:1px solid var(--border);">' +
      '<div style="font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:6px;">Active Invite Codes</div>' +
      company.invites.map((inv) => '<div style="display:flex;justify-content:space-between;padding:4px 0;font-family:var(--font-mono);font-size:12px;">' + esc(inv.code) + ' <button class="text-btn danger" data-action="revoke-invite" data-company-id="' + company.id + '" data-id="' + inv.id + '">Revoke</button></div>').join('') +
      '</div>' : '') +
    (company.staff.length === 0 ? renderEmpty("No staff yet", "Add a staff member to get started.") : '<div class="staff-list">' + rows + '</div>') +
    '</div>'
  );
}

// ---------- Superadmin Screen ----------
function renderAdminScreen() {
  return (
    '<div class="screen admin-screen">' +
    '<div class="screen-header-row"><div class="screen-title">Companies & Subscriptions</div>' +
    '<button class="pill-btn" data-action="open-company-form">' + ICONS.plus + ' Add Company</button></div>' +
    '<div class="company-list">' +
    state.companies
      .map((company) => {
        const revenue = company.sales.reduce((sum, sale) => sum + sale.total, 0);
        const subInfo = getSubscriptionInfo(company);
        const isDeactivated = subInfo.isDeactivated;

        return (
          '<div class="company-card">' +
          '<div class="company-card-head">' +
          '<div>' +
          '<div class="company-name">' + esc(company.name) + '</div>' +
          '<div class="company-meta">' + company.staff.length + ' staff · ' + company.products.length + ' products</div>' +
          '<div class="company-subscription">' + renderSubscriptionStatus(company) + '</div>' +
          '</div>' +
          '<div class="company-actions">' +
          (isDeactivated
            ? '<button class="mini-btn success" data-action="toggle-company-status" data-id="' + company.id + '" data-status="active">🟢 Activate Service</button>'
            : '<button class="mini-btn danger" data-action="toggle-company-status" data-id="' + company.id + '" data-status="deactivated">⛔ Deactivate Service</button>') +
          '<button class="mini-btn" data-action="open-subscription-form" data-id="' + company.id + '">⚙️ Manage Subscription</button>' +
          '<button class="mini-btn" data-action="open-staff-form" data-id="' + company.id + '">Add Staff</button>' +
          '<button class="mini-btn danger" data-action="delete-company" data-id="' + company.id + '">Delete</button>' +
          '</div></div>' +
          '<div class="company-summary">' +
          '<div class="company-summary-box"><span>Sales Count</span><strong>' + company.sales.length + '</strong></div>' +
          '<div class="company-summary-box"><span>Revenue</span><strong>' + money(revenue) + '</strong></div>' +
          '</div>' +
          '<div class="staff-list">' +
          company.staff
            .map(
              (member) =>
                '<div class="staff-row"><div><div class="staff-name">' + esc(member.name) + '</div>' +
                '<div class="staff-user">@' + esc(member.username) + '</div></div>' +
                '<button class="text-btn danger" data-action="delete-staff" data-company-id="' + company.id + '" data-id="' + member.id + '">Remove</button></div>'
            )
            .join("") +
          '</div>' +
          '</div>'
        );
      })
      .join("") +
    '</div>' +
    '</div>'
  );
}

// ---------- Subscription Management Modal ----------
function renderSubscriptionForm() {
  const f = state.subscriptionForm;
  if (!f) return "";
  const comp = state.companies.find((c) => c.id === f.companyId);
  if (!comp) return "";

  const subInfo = getSubscriptionInfo(comp);
  const expiryDateFormatted = new Date(subInfo.expiresAt).toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" });

  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-subscription-form"></div>' +
    '<div class="sheet" style="max-width:480px;">' +
    '<div class="sheet-header"><div class="sheet-title">Subscription — ' + esc(comp.name) + '</div>' +
    '<button class="sheet-close" data-action="close-subscription-form">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<div style="background:var(--surface-raised);padding:12px;border-radius:12px;margin-bottom:14px;border:1px solid var(--border);">' +
    '<div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Current Expiration Date</div>' +
    '<div style="font-family:var(--font-mono);font-size:16px;font-weight:700;color:var(--text-primary);margin-top:2px;">' + expiryDateFormatted + '</div>' +
    '<div style="margin-top:4px;">' + renderSubscriptionStatus(comp) + '</div>' +
    '</div>' +
    '<label class="form-field"><span class="form-label">Service Status (Superadmin Control)</span>' +
    '<select id="sub-status" class="form-input">' +
    '<option value="active" ' + (f.status === "active" ? "selected" : "") + '>🟢 Active (POS Service Enabled)</option>' +
    '<option value="deactivated" ' + (f.status === "deactivated" ? "selected" : "") + '>⛔ Deactivated (POS Service Disabled / Suspended)</option>' +
    '</select></label>' +
    '<label class="form-field"><span class="form-label">Subscription Tier / Plan</span>' +
    '<select id="sub-plan" class="form-input">' +
    '<option value="standard" ' + (f.plan === "standard" ? "selected" : "") + '>Standard ($29/mo)</option>' +
    '<option value="pro" ' + (f.plan === "pro" ? "selected" : "") + '>Pro ($59/mo)</option>' +
    '<option value="enterprise" ' + (f.plan === "enterprise" ? "selected" : "") + '>Enterprise ($99/mo)</option>' +
    '<option value="trial" ' + (f.plan === "trial" ? "selected" : "") + '>Free Trial</option>' +
    '</select></label>' +
    '<label class="form-field"><span class="form-label">Extend Subscription Duration (Days)</span>' +
    '<input id="sub-days" class="form-input" type="number" min="0" value="' + esc(f.extendDays != null ? f.extendDays : 30) + '" />' +
    '<div class="quick-extend-chips">' +
    '<button class="quick-extend-btn" data-action="quick-extend-days" data-days="7">+7 Days</button>' +
    '<button class="quick-extend-btn" data-action="quick-extend-days" data-days="30">+30 Days</button>' +
    '<button class="quick-extend-btn" data-action="quick-extend-days" data-days="90">+90 Days</button>' +
    '<button class="quick-extend-btn" data-action="quick-extend-days" data-days="365">+1 Year</button>' +
    '</div>' +
    '</label>' +
    '</div>' +
    '<div class="sheet-footer" style="display:flex;gap:8px;">' +
    '<button class="mini-btn" style="flex:1;" data-action="close-subscription-form">Cancel</button>' +
    '<button class="btn-teal" style="flex:2;" data-action="save-subscription-form">Save Subscription</button>' +
    '</div>' +
    '</div></div>'
  );
}

// ---------- Modals & Forms ----------
function renderProductForm() {
  const f = state.productForm;
  if (!f) return "";
  const isEdit = !!f.id;
  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-product-form"></div>' +
    '<div class="sheet">' +
    '<div class="sheet-header"><div class="sheet-title">' + (isEdit ? "Edit Product" : "New Product") + '</div>' +
    '<button class="sheet-close" data-action="close-product-form">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<label class="form-field"><span class="form-label">Product Name</span>' +
    '<input id="f-name" class="form-input" type="text" placeholder="e.g. Cappuccino" value="' + esc(f.name) + '" /></label>' +
    '<div class="form-row">' +
    '<label class="form-field grow"><span class="form-label">Price</span>' +
    '<input id="f-price" class="form-input" type="number" step="0.01" placeholder="0.00" value="' + esc(f.price) + '" /></label>' +
    '<label class="form-field icon-field"><span class="form-label">Emoji Icon</span>' +
    '<input id="f-icon" class="form-input" type="text" placeholder="☕" value="' + esc(f.icon) + '" /></label>' +
    '</div>' +
    '<div class="form-row">' +
    '<label class="form-field grow"><span class="form-label">Category</span>' +
    '<input id="f-category" class="form-input" type="text" placeholder="e.g. Drinks" value="' + esc(f.category) + '" /></label>' +
    '<label class="form-field grow"><span class="form-label">Initial Stock Count</span>' +
    '<input id="f-stock" class="form-input" type="number" placeholder="50" value="' + esc(f.stock != null ? f.stock : "") + '" /></label>' +
    '</div>' +
    '</div>' +
    '<div class="sheet-footer">' +
    '<button class="btn-teal" data-action="save-product" style="margin-bottom:8px;">Save Product</button>' +
    (isEdit ? '<button class="btn-danger-text" data-action="delete-product">Delete Product</button>' : "") +
    '</div>' +
    '</div></div>'
  );
}

function renderCustomItemModal() {
  const f = state.customItemForm || { name: "Custom Item", price: "" };
  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-custom-item"></div>' +
    '<div class="sheet">' +
    '<div class="sheet-header"><div class="sheet-title">Add Custom Sale Item</div>' +
    '<button class="sheet-close" data-action="close-custom-item">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<label class="form-field"><span class="form-label">Item Description</span>' +
    '<input id="custom-name" class="form-input" type="text" placeholder="e.g. Custom Pastry" value="' + esc(f.name) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Price</span>' +
    '<input id="custom-price" class="form-input" type="number" step="0.01" placeholder="0.00" autofocus /></label>' +
    '</div>' +
    '<div class="sheet-footer">' +
    '<button class="btn-teal" data-action="save-custom-item">Add to Current Order</button>' +
    '</div>' +
    '</div></div>'
  );
}

function renderItemNoteModal() {
  const item = state.cart.find((i) => i.productId === state.itemNoteModal);
  if (!item) return "";

  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-item-note"></div>' +
    '<div class="sheet" style="max-width:380px;">' +
    '<div class="sheet-header"><div class="sheet-title">Item Note: ' + esc(item.name) + '</div>' +
    '<button class="sheet-close" data-action="close-item-note">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<label class="form-field"><span class="form-label">Special instructions (e.g. Oat milk, Extra hot)</span>' +
    '<input id="item-note-input" class="form-input" type="text" placeholder="Enter note..." value="' + esc(item.note || "") + '" /></label>' +
    '</div>' +
    '<div class="sheet-footer">' +
    '<button class="btn-teal" data-action="save-item-note">Save Note</button>' +
    '</div>' +
    '</div></div>'
  );
}

function renderSettingsModal() {
  const s = state.settings;
  const comp = getCurrentCompany();
  const subSection = comp ? (
    '<div style="margin-top:14px;padding:12px;background:var(--surface-raised);border-radius:12px;border:1px solid var(--border);">' +
    '<div style="font-size:12px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:6px;">' + ICONS.shield + ' Subscription & License Status</div>' +
    '<div>' + renderSubscriptionStatus(comp) + '</div>' +
    '</div>'
  ) : "";

  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-settings"></div>' +
    '<div class="sheet">' +
    '<div class="sheet-header"><div class="sheet-title">POS Store Settings</div>' +
    '<button class="sheet-close" data-action="close-settings">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<label class="form-field"><span class="form-label">Store Brand Name</span>' +
    '<input id="setting-store-name" class="form-input" type="text" value="' + esc(s.storeName) + '" /></label>' +
    '<div class="form-row">' +
    '<label class="form-field grow"><span class="form-label">Currency Symbol</span>' +
    '<select id="setting-currency" class="form-input">' +
    ['$', '€', '£', '¥', '₹', '₱', 'A$', 'C$'].map((c) => '<option value="' + c + '" ' + (s.currency === c ? "selected" : "") + '>' + c + '</option>').join("") +
    '</select></label>' +
    '<label class="form-field grow"><span class="form-label">Sales Tax Rate (%)</span>' +
    '<input id="setting-tax-rate" class="form-input" type="number" step="0.5" value="' + esc(s.taxRate) + '" /></label>' +
    '</div>' +
    '<label class="form-field"><span class="form-label">Receipt Footer Message</span>' +
    '<input id="setting-receipt-footer" class="form-input" type="text" value="' + esc(s.receiptFooter) + '" /></label>' +
    subSection +
    '<div style="margin-top:14px;padding:12px;background:var(--surface-raised);border-radius:12px;border:1px solid var(--border);">' +
    '<div style="font-size:12px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:6px;">☁️ Cloud Synchronization & Backup</div>' +
    '<div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">Status: <strong>' + (state.online ? "Online (Connected)" : "Offline (Disconnected)") + '</strong> · Pending Queue: <strong>' + state.pendingSyncQueue.length + ' item(s)</strong></div>' +
    '<div style="font-size:11px;color:var(--text-muted);margin-bottom:10px;">Last Synced: ' + (state.lastSyncTime ? new Date(state.lastSyncTime).toLocaleString() : "Never") + '</div>' +
    '<button class="pill-btn" style="width:100%;justify-content:center;" data-action="manual-cloud-sync">☁️ Sync Now with Cloud</button>' +
    '</div>' +
    '<div style="margin-top:14px;padding:12px;background:var(--surface-raised);border-radius:12px;border:1px solid var(--border);">' +
    '<div style="font-size:12px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:6px;">' + ICONS.mobileApp + ' Mobile & Desktop App Installation</div>' +
    '<div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">Install Corner Counter as a full-screen app on your phone, tablet, or desktop for fast 1-tap launch & 100% offline access.</div>' +
    '<button class="install-app-btn" style="width:100%;justify-content:center;" data-action="prompt-install-app">' + ICONS.mobileApp + ' Download & Install App</button>' +
    '</div>' +
    '<div style="margin-top:14px;padding:12px;background:var(--surface-raised);border-radius:12px;border:1px solid var(--border);">' +
    '<div style="font-size:12px;font-weight:700;margin-bottom:8px;">Data Backup & Restore</div>' +
    '<div style="display:flex;gap:8px;">' +
    '<button class="mini-btn" data-action="backup-data">' + ICONS.download + ' Backup JSON</button>' +
    '<button class="mini-btn" data-action="restore-data">' + ICONS.package + ' Restore JSON</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="sheet-footer">' +
    '<button class="btn-teal" data-action="save-settings">Save Settings</button>' +
    '</div>' +
    '</div></div>'
  );
}

function renderInstallModal() {
  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  let bodyContent = "";

  if (isIOS) {
    bodyContent = (
      '<div style="text-align:center;margin-bottom:12px;">' +
      '<div style="font-size:14px;font-weight:700;color:var(--text-primary);">Install App on iPhone / iPad</div>' +
      '<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Follow 3 simple steps to add to your Home Screen:</div>' +
      '</div>' +
      '<div class="install-steps-list">' +
      '<div class="install-step-item"><div class="install-step-number">1</div><div class="install-step-text">Tap the <strong>Share button</strong> <span style="font-size:16px;">⎋</span> at the bottom of Safari browser.</div></div>' +
      '<div class="install-step-item"><div class="install-step-number">2</div><div class="install-step-text">Scroll down and tap <strong>"Add to Home Screen"</strong> <span style="font-size:16px;">➕</span>.</div></div>' +
      '<div class="install-step-item"><div class="install-step-number">3</div><div class="install-step-text">Tap <strong>Add</strong> in the top right. Launch directly from your home screen!</div></div>' +
      '</div>'
    );
  } else {
    bodyContent = (
      '<div style="text-align:center;margin-bottom:12px;">' +
      '<div style="font-size:14px;font-weight:700;color:var(--text-primary);">Install App on Mobile / Tablet / PC</div>' +
      '<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Install Corner Counter as a standalone app for fast 1-tap launch & offline usage.</div>' +
      '</div>' +
      '<div class="install-steps-list">' +
      '<div class="install-step-item"><div class="install-step-number">1</div><div class="install-step-text">Tap <strong>"Install Now"</strong> below or open your browser menu (<strong>⋮</strong>).</div></div>' +
      '<div class="install-step-item"><div class="install-step-number">2</div><div class="install-step-text">Select <strong>"Install App"</strong> or <strong>"Add to Home screen"</strong>.</div></div>' +
      '<div class="install-step-item"><div class="install-step-number">3</div><div class="install-step-text">Confirm installation and launch directly from your home screen!</div></div>' +
      '</div>'
    );
  }

  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-install-modal"></div>' +
    '<div class="sheet" style="max-width:400px;">' +
    '<div class="sheet-header"><div class="sheet-title">Download Mobile App</div>' +
    '<button class="sheet-close" data-action="close-install-modal">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:16px;">' +
    '<div class="header-logo-badge" style="width:48px;height:48px;"><img src="icons/icon-192.png" alt="App Logo" /></div>' +
    '<div><div style="font-weight:800;font-size:16px;color:var(--text-primary);">Corner Counter POS</div><div style="font-size:11px;color:var(--text-muted);">Offline & Online Mobile App</div></div>' +
    '</div>' +
    bodyContent +
    '</div>' +
    '<div class="sheet-footer" style="display:flex;gap:8px;">' +
    (deferredPwaPrompt
      ? '<button class="btn-teal" style="flex:1;" data-action="trigger-pwa-prompt">' + ICONS.mobileApp + ' Install Now</button>'
      : '') +
    '<button class="mini-btn" style="flex:1;" data-action="close-install-modal">Close</button>' +
    '</div>' +
    '</div></div>'
  );
}

function renderCompanyForm() {
  const f = state.companyForm || { name: "", staffName: "", staffUsername: "", staffPassword: "", staffRole: "company_admin" };
  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-company-form"></div>' +
    '<div class="sheet">' +
    '<div class="sheet-header"><div class="sheet-title">Add Company</div>' +
    '<button class="sheet-close" data-action="close-company-form">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<label class="form-field"><span class="form-label">Company Name</span>' +
    '<input id="company-name" class="form-input" type="text" placeholder="Acme Cafe" value="' + esc(f.name) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Admin Name</span>' +
    '<input id="company-staff-name" class="form-input" type="text" placeholder="Manager" value="' + esc(f.staffName) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Username</span>' +
    '<input id="company-staff-username" class="form-input" type="text" placeholder="manager" value="' + esc(f.staffUsername) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Password</span>' +
    '<input id="company-staff-password" class="form-input" type="text" placeholder="staff123" value="' + esc(f.staffPassword) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Role</span>' +
    '<select id="company-staff-role" class="form-input">' +
    '<option value="company_admin" ' + (f.staffRole === "company_admin" ? "selected" : "") + '>Company Admin</option>' +
    '<option value="staff" ' + (f.staffRole === "staff" ? "selected" : "") + '>Staff</option>' +
    '</select></label>' +
    '</div>' +
    '<div class="sheet-footer"><button class="btn-teal" data-action="save-company-form">Create Company</button></div>' +
    '</div></div>'
  );
}

function renderStaffForm() {
  const f = state.staffForm || { companyId: "", name: "", username: "", password: "", role: "staff" };
  const isEdit = !!f.id;
  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-staff-form"></div>' +
    '<div class="sheet">' +
    '<div class="sheet-header"><div class="sheet-title">' + (isEdit ? 'Edit Staff Member' : 'Add Staff Member') + '</div>' +
    '<button class="sheet-close" data-action="close-staff-form">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<label class="form-field"><span class="form-label">Staff Name</span>' +
    '<input id="staff-name" class="form-input" type="text" placeholder="Cashier Name" value="' + esc(f.name) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Username</span>' +
    '<input id="staff-username" class="form-input" type="text" placeholder="cashier" value="' + esc(f.username) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Password</span>' +
    '<input id="staff-password" class="form-input" type="text" placeholder="cashier123" value="' + esc(f.password) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Role</span>' +
    '<select id="staff-role" class="form-input">' +
    '<option value="company_admin" ' + (f.role === "company_admin" ? "selected" : "") + '>Company Admin</option>' +
    '<option value="staff" ' + (f.role === "staff" ? "selected" : "") + '>Staff</option>' +
    '</select></label>' +
    '</div>' +
    '<div class="sheet-footer"><button class="btn-teal" data-action="save-staff-form">Save Staff</button></div>' +
    '</div></div>'
  );
}

function renderLoginScreen() {
  return (
    '<div class="login-screen">' +
    '<div class="login-card">' +
    '<div class="login-brand">' +
    '<div class="login-brand-mark"><img src="icons/logo.png" alt="Corner Counter" /></div>' +
    '<div class="login-brand-copy">' +
    '<div class="login-brand-title">Corner Counter</div>' +
    '<div class="login-brand-subtitle">Quick POS · Simple Payments</div>' +
    '</div>' +
    '</div>' +
    '<form class="login-form" data-login-form>' +
    '<label class="login-label">Username' +
    '<input id="login-username" class="login-input" type="text" autocomplete="username" value="' + esc(state.loginForm.username) + '" placeholder="admin or staff" />' +
    '</label>' +
    '<label class="login-label">Password' +
    '<input id="login-password" class="login-input" type="password" autocomplete="current-password" value="' + esc(state.loginForm.password) + '" placeholder="••••••••" />' +
    '</label>' +
    (state.loginForm.error ? '<div class="login-error">' + esc(state.loginForm.error) + '</div>' : '') +
    '<button class="login-btn" type="submit">Log In to Terminal</button>' +
    '</form>' +
    '<div style="display:flex;gap:8px;margin-top:16px;justify-content:center;">' +
    '<button class="pill-btn" data-action="open-invite-accept">Have Invite Code?</button>' +
    '</div>' +
    '</div>' +
    '</div>'
  );
}

function renderInviteAcceptForm() {
  const f = state.inviteAcceptForm || { code: "", name: "", username: "", password: "" };
  return (
    '<div class="overlay"><div class="overlay-scrim" data-action="close-invite-accept"></div>' +
    '<div class="sheet">' +
    '<div class="sheet-header"><div class="sheet-title">Accept Staff Invite</div>' +
    '<button class="sheet-close" data-action="close-invite-accept">' + ICONS.x + '</button></div>' +
    '<div class="sheet-body">' +
    '<label class="form-field"><span class="form-label">Invite Code</span>' +
    '<input id="invite-code-input" class="form-input" type="text" placeholder="Paste invite code" value="' + esc(f.code) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Your Name</span>' +
    '<input id="invite-name-input" class="form-input" type="text" placeholder="Your name" value="' + esc(f.name) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Choose Username</span>' +
    '<input id="invite-username-input" class="form-input" type="text" placeholder="username" value="' + esc(f.username) + '" /></label>' +
    '<label class="form-field"><span class="form-label">Choose Password</span>' +
    '<input id="invite-password-input" class="form-input" type="text" placeholder="password" value="' + esc(f.password) + '" /></label>' +
    '</div>' +
    '<div class="sheet-footer"><button class="btn-teal" data-action="save-invite-accept">Join Company</button></div>' +
    '</div></div>'
  );
}

function renderEmpty(title, body) {
  return (
    '<div class="empty-state">' +
    '<div class="empty-icon">' + ICONS.coffee + '</div>' +
    '<div class="empty-title">' + esc(title) + '</div>' +
    '<div class="empty-body">' + esc(body) + '</div>' +
    '</div>'
  );
}

// ---------- Dynamic Listeners & Delegation ----------
function attachDynamicListeners() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.search = e.target.value;
      const grid = document.querySelector(".product-grid");
      if (grid) grid.outerHTML = renderProductGrid();
    });
  }

  const cashInput = document.getElementById("cash-input");
  if (cashInput) {
    cashInput.addEventListener("input", (e) => {
      state.cashValue = e.target.value;
      const total = cartTotal();
      const cash = parseFloat(state.cashValue || "0") || 0;
      const change = cash - total;
      const changeEl = document.getElementById("change-value");
      if (changeEl) {
        changeEl.textContent = money(Math.max(0, change));
        changeEl.className = "change-value " + (change >= 0 ? "ok" : "short");
      }
      const btn = document.getElementById("confirm-sale-btn");
      if (btn) {
        btn.disabled = !(cash >= total && total > 0);
      }
    });
  }

  const splitCashInput = document.getElementById("split-cash-input");
  if (splitCashInput) {
    splitCashInput.addEventListener("input", (e) => {
      state.splitCash = e.target.value;
      render();
    });
  }

  const staffSearchInput = document.getElementById("staff-search-input");
  if (staffSearchInput) {
    staffSearchInput.addEventListener("input", (e) => {
      state.staffSearch = e.target.value;
      render();
    });
  }
}

function attachAppEventHandlers() {
  const app = document.getElementById("app");
  if (!app) return;

  app.addEventListener("submit", (e) => {
    const form = e.target.closest("[data-login-form]");
    if (!form) return;
    e.preventDefault();
    const usernameValue = document.getElementById("login-username")?.value;
    const passwordValue = document.getElementById("login-password")?.value;
    loginUser(usernameValue, passwordValue);
  });

  app.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;

    switch (action) {
      case "prompt-install-app":
        if (deferredPwaPrompt) {
          deferredPwaPrompt.prompt();
          deferredPwaPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              showToast("App installation accepted!");
            }
            deferredPwaPrompt = null;
            render();
          });
        } else {
          state.installModalOpen = true;
          render();
        }
        break;
      case "trigger-pwa-prompt":
        if (deferredPwaPrompt) {
          deferredPwaPrompt.prompt();
          deferredPwaPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              showToast("App installation accepted!");
            }
            deferredPwaPrompt = null;
            state.installModalOpen = false;
            render();
          });
        }
        break;
      case "close-install-modal":
        state.installModalOpen = false;
        render();
        break;
      case "toggle-theme":
        state.theme = state.theme === "dark" ? "light" : "dark";
        document.body.setAttribute("data-theme", state.theme);
        persistSettings();
        if (typeof PosAudio !== "undefined") PosAudio.playTap();
        render();
        break;
      case "toggle-sound":
        state.settings.sound = !state.settings.sound;
        if (typeof PosAudio !== "undefined") PosAudio.enabled = state.settings.sound;
        if (state.settings.sound && typeof PosAudio !== "undefined") PosAudio.playBeep();
        persistSettings();
        render();
        break;
      case "open-settings":
        state.settingsModal = true;
        render();
        break;
      case "close-settings":
        state.settingsModal = false;
        render();
        break;
      case "save-settings": {
        state.settings.storeName = document.getElementById("setting-store-name")?.value.trim() || "Corner Counter HQ";
        state.settings.currency = document.getElementById("setting-currency")?.value || "$";
        state.settings.taxRate = parseFloat(document.getElementById("setting-tax-rate")?.value || "0") || 0;
        state.settings.receiptFooter = document.getElementById("setting-receipt-footer")?.value.trim() || "";
        persistSettings();
        state.settingsModal = false;
        showToast("Settings saved");
        render();
        break;
      }
      case "backup-data": {
        const json = Storage.exportAll();
        if (json) {
          const blob = new Blob([json], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `corner_counter_backup_${new Date().toISOString().slice(0, 10)}.json`;
          a.click();
          URL.revokeObjectURL(url);
          showToast("Backup exported!");
        }
        break;
      }
      case "restore-data": {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = (ev) => {
          const file = ev.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (re) => {
            const success = Storage.importAll(re.target.result);
            if (success) {
              state.companies = Storage.get(KEYS.companies, DEFAULT_COMPANIES);
              syncCurrentCompanyData();
              showToast("Data restored successfully!");
              render();
            } else {
              showToast("Failed to restore data file");
            }
          };
          reader.readAsText(file);
        };
        input.click();
        break;
      }
      case "select-category":
        state.activeCategory = btn.dataset.cat;
        if (typeof PosAudio !== "undefined") PosAudio.playTap();
        render();
        break;
      case "toggle-fav":
        toggleFavorite(btn.dataset.id, e);
        break;
      case "add-to-cart":
        addToCart(btn.dataset.id);
        break;
      case "qty-inc":
        changeQty(btn.dataset.id, 1);
        break;
      case "qty-dec":
        changeQty(btn.dataset.id, -1);
        break;
      case "remove-item":
        removeFromCart(btn.dataset.id);
        break;
      case "set-discount": {
        const tab = getActiveTab();
        tab.discountPct = parseInt(btn.dataset.val, 10) || 0;
        if (typeof PosAudio !== "undefined") PosAudio.playTap();
        render();
        break;
      }
      case "set-tip": {
        const tab = getActiveTab();
        tab.tipAmt = parseFloat(btn.dataset.val) || 0;
        if (typeof PosAudio !== "undefined") PosAudio.playTap();
        render();
        break;
      }
      case "open-item-note":
        e.preventDefault();
        state.itemNoteModal = btn.dataset.id;
        render();
        break;
      case "close-item-note":
        state.itemNoteModal = null;
        render();
        break;
      case "save-item-note": {
        const note = document.getElementById("item-note-input")?.value.trim() || "";
        const it = state.cart.find((i) => i.productId === state.itemNoteModal);
        if (it) it.note = note;
        state.itemNoteModal = null;
        render();
        break;
      }
      case "switch-tab":
        state.activeTabId = btn.dataset.id;
        if (typeof PosAudio !== "undefined") PosAudio.playTap();
        render();
        break;
      case "add-new-tab": {
        const nextNum = state.orderTabs.length + 1;
        const newTab = { id: uid("tab"), name: `Order #${nextNum}`, cart: [], discountPct: 0, tipAmt: 0 };
        state.orderTabs.push(newTab);
        state.activeTabId = newTab.id;
        if (typeof PosAudio !== "undefined") PosAudio.playTap();
        render();
        break;
      }
      case "rename-tab": {
        const tab = getActiveTab();
        const newName = prompt("Enter order name / table number:", tab.name);
        if (newName && newName.trim()) {
          tab.name = newName.trim();
          render();
        }
        break;
      }
      case "clear-current-tab": {
        const tab = getActiveTab();
        tab.cart = [];
        tab.discountPct = 0;
        tab.tipAmt = 0;
        if (typeof PosAudio !== "undefined") PosAudio.playTap();
        render();
        break;
      }
      case "open-cart":
        state.cartOpen = true;
        render();
        break;
      case "close-cart":
        state.cartOpen = false;
        render();
        break;
      case "open-checkout":
        state.checkoutOpen = true;
        state.paymentMethod = "cash";
        state.cashValue = "";
        render();
        break;
      case "close-checkout":
        state.checkoutOpen = false;
        render();
        break;
      case "set-payment-method":
        state.paymentMethod = btn.dataset.method;
        if (typeof PosAudio !== "undefined") PosAudio.playTap();
        render();
        break;
      case "quick-cash": {
        state.cashValue = btn.dataset.amount;
        if (typeof PosAudio !== "undefined") PosAudio.playCoin();
        const total = cartTotal();
        const cash = parseFloat(state.cashValue || "0") || 0;
        const change = cash - total;
        const changeEl = document.getElementById("change-value");
        if (changeEl) {
          changeEl.textContent = money(Math.max(0, change));
          changeEl.className = "change-value " + (change >= 0 ? "ok" : "short");
        }
        const cashInput = document.getElementById("cash-input");
        if (cashInput) cashInput.value = state.cashValue;
        const confirmBtn = document.getElementById("confirm-sale-btn");
        if (confirmBtn) confirmBtn.disabled = !(cash >= total && total > 0);
        break;
      }
      case "simulate-card-pay": {
        state.cardProcessing = true;
        render();
        setTimeout(() => {
          state.cardProcessing = false;
          completeSale();
        }, 600);
        break;
      }
      case "simulate-qr-pay":
        completeSale();
        break;
      case "confirm-sale":
        completeSale();
        break;
      case "confirm-split-sale":
        completeSale();
        break;
      case "print-receipt":
        window.print();
        break;
      case "dismiss-receipt":
        state.thermalReceiptSale = null;
        render();
        break;
      case "view-thermal-receipt": {
        const s = state.sales.find((x) => x.id === btn.dataset.id);
        if (s) {
          state.thermalReceiptSale = s;
          render();
        }
        break;
      }
      case "set-analytics-tf":
        state.analyticsTimeframe = btn.dataset.tf;
        if (typeof PosAudio !== "undefined") PosAudio.playTap();
        render();
        break;
      case "export-csv":
        exportSalesToCSV();
        break;
      case "load-demo-sales":
        loadDemoSales();
        break;
      case "open-custom-item":
        state.customItemForm = { name: "Custom Item", price: "" };
        render();
        break;
      case "close-custom-item":
        state.customItemForm = null;
        render();
        break;
      case "save-custom-item": {
        const name = document.getElementById("custom-name")?.value.trim() || "Custom Item";
        const price = parseFloat(document.getElementById("custom-price")?.value || "0");
        if (isNaN(price) || price <= 0) {
          showToast("Enter a valid price");
          return;
        }
        state.cart.push({
          productId: uid("custom"),
          name: name,
          price: Math.round(price * 100) / 100,
          icon: "🏷️",
          qty: 1,
          note: "Custom Item"
        });
        state.customItemForm = null;
        if (typeof PosAudio !== "undefined") PosAudio.playBeep();
        showToast("Added custom item to order");
        render();
        break;
      }
      case "open-add-product":
        state.productForm = { id: null, name: "", price: "", icon: "🛒", category: "General", stock: 50 };
        render();
        break;
      case "edit-product": {
        const p = state.products.find((x) => x.id === btn.dataset.id);
        if (p) state.productForm = Object.assign({}, p);
        render();
        break;
      }
      case "close-product-form":
        state.productForm = null;
        render();
        break;
      case "save-product": {
        const name = document.getElementById("f-name")?.value.trim();
        const priceRaw = document.getElementById("f-price")?.value;
        const icon = document.getElementById("f-icon")?.value.trim() || "🛒";
        const category = document.getElementById("f-category")?.value.trim() || "General";
        const stockRaw = document.getElementById("f-stock")?.value;
        const price = parseFloat(priceRaw);
        const stock = stockRaw ? parseInt(stockRaw, 10) : null;

        if (!name || isNaN(price)) {
          showToast("Enter a valid name and price");
          return;
        }

        const rounded = Math.round(price * 100) / 100;
        if (state.productForm && state.productForm.id) {
          const p = state.products.find((x) => x.id === state.productForm.id);
          if (p) {
            Object.assign(p, { name, price: rounded, icon, category, stock });
            showToast("Product updated");
          }
        } else {
          state.products.push({ id: uid("p"), name, price: rounded, icon, category, stock });
          showToast("Product created");
        }
        persistProducts();
        state.productForm = null;
        render();
        break;
      }
      case "delete-product":
        if (state.productForm && state.productForm.id) {
          state.products = state.products.filter((p) => p.id !== state.productForm.id);
          persistProducts();
          state.productForm = null;
          showToast("Product deleted");
          render();
        }
        break;
      case "toggle-sale": {
        const id = btn.dataset.id;
        state.expandedSaleId = state.expandedSaleId === id ? null : id;
        render();
        break;
      }
      case "nav": {
        const screen = btn.dataset.screen;
        if (screen) {
          state.screen = screen;
          if (typeof PosAudio !== "undefined") PosAudio.playTap();
          render();
        }
        break;
      }
      case "logout":
        logoutUser();
        break;
      case "open-staff-form": {
        const companyId = btn.dataset.id || btn.dataset.companyId || (state.session && state.session.companyId);
        state.staffForm = { companyId: companyId, name: "", username: "", password: "", role: "staff" };
        render();
        break;
      }
      case "close-staff-form":
        state.staffForm = null;
        render();
        break;
      case "save-staff-form": {
        const name = (document.getElementById("staff-name")?.value || "").trim();
        const username = (document.getElementById("staff-username")?.value || "").trim();
        const password = (document.getElementById("staff-password")?.value || "").trim();
        const role = (document.getElementById("staff-role")?.value || "staff").trim();

        if (!name || !username || !password) {
          showToast("Please complete staff form");
          return;
        }

        const companyId = state.staffForm && state.staffForm.companyId ? state.staffForm.companyId : state.session && state.session.companyId;
        const company = state.companies.find((c) => c.id === companyId);
        if (!company) {
          showToast("Company not found");
          return;
        }

        const exists = company.staff.some((s) => s.username.toLowerCase() === username.toLowerCase() && (!state.staffForm.id || s.id !== state.staffForm.id));
        if (exists) {
          showToast("Username already exists");
          return;
        }

        if (state.staffForm && state.staffForm.id) {
          const m = company.staff.find((s) => s.id === state.staffForm.id);
          if (m) {
            m.name = name;
            m.username = username;
            m.password = password;
            m.role = role;
            showToast("Staff updated");
          }
        } else {
          company.staff.push({ id: uid("staff"), name, username, password, role });
          showToast("Staff added");
        }

        persistCompanies();
        state.staffForm = null;
        render();
        break;
      }
      case "edit-staff": {
        const memberId = btn.dataset.id;
        const comp = state.companies.find((c) => c.staff.some((m) => m.id === memberId));
        if (!comp) return;
        const mem = comp.staff.find((m) => m.id === memberId);
        if (!mem) return;
        state.staffForm = { companyId: comp.id, id: mem.id, name: mem.name, username: mem.username, password: mem.password, role: mem.role };
        render();
        break;
      }
      case "delete-staff": {
        const compId = btn.dataset.companyId || (state.session && state.session.companyId);
        const id = btn.dataset.id;
        const c = state.companies.find((x) => x.id === compId);
        if (!c) return;
        const m = c.staff.find((s) => s.id === id);
        if (!m) return;
        if (m.role === "company_admin" && c.staff.filter((s) => s.role === "company_admin").length <= 1) {
          showToast("Cannot remove last company admin");
          return;
        }
        c.staff = c.staff.filter((s) => s.id !== id);
        persistCompanies();
        showToast("Staff removed");
        render();
        break;
      }
      case "open-subscription-form": {
        const cid = btn.dataset.id;
        const comp = state.companies.find((c) => c.id === cid);
        if (!comp) {
          showToast("Company not found");
          return;
        }
        const sub = comp.subscription || { status: "active", plan: "standard", expiresAt: Date.now() + 86400000 * 30 };
        state.subscriptionForm = {
          companyId: cid,
          extendDays: 30,
          plan: sub.plan || "standard",
          status: sub.status || "active"
        };
        render();
        break;
      }
      case "close-subscription-form":
        state.subscriptionForm = null;
        render();
        break;
      case "quick-extend-days": {
        const days = parseInt(btn.dataset.days, 10);
        const input = document.getElementById("sub-days");
        if (input) input.value = days;
        break;
      }
      case "save-subscription-form": {
        const days = parseInt(document.getElementById("sub-days")?.value || "0", 10);
        const plan = document.getElementById("sub-plan")?.value || "standard";
        const status = document.getElementById("sub-status")?.value || "active";
        if (!state.subscriptionForm || !state.subscriptionForm.companyId) {
          showToast("No company selected");
          return;
        }
        const comp = state.companies.find((c) => c.id === state.subscriptionForm.companyId);
        if (!comp) {
          showToast("Company not found");
          return;
        }
        const now = Date.now();
        const base = comp.subscription && comp.subscription.expiresAt && comp.subscription.expiresAt > now ? comp.subscription.expiresAt : now;
        comp.subscription = comp.subscription || {};
        comp.subscription.plan = plan;
        comp.subscription.status = status;
        comp.subscription.startAt = comp.subscription.startAt || now;
        if (days > 0) {
          comp.subscription.expiresAt = base + days * 24 * 60 * 60 * 1000;
        }
        persistCompanies();
        showToast(`Subscription updated (${status.toUpperCase()})`);
        state.subscriptionForm = null;
        render();
        break;
      }
      case "manual-cloud-sync":
        syncWithCloud();
        break;
      case "delete-company": {
        const cid = btn.dataset.id;
        const comp = state.companies.find((c) => c.id === cid);
        if (!comp) return;
        if (state.companies.length <= 1) {
          showToast("Cannot delete the only remaining company");
          return;
        }
        if (confirm(`Are you sure you want to permanently delete company "${comp.name}"? This action will remove all staff accounts, sales history, and products.`)) {
          const deletedIds = Storage.get(KEYS.deletedCompanyIds, []);
          if (!deletedIds.includes(cid)) {
            deletedIds.push(cid);
            Storage.set(KEYS.deletedCompanyIds, deletedIds);
          }
          state.companies = state.companies.filter((c) => c.id !== cid);
          persistCompanies();
          queuePendingSync("delete-company", { id: cid, name: comp.name });
          syncWithCloud();
          showToast(`Company "${comp.name}" deleted and updated to cloud`);
          render();
        }
        break;
      }
      case "toggle-company-status": {
        const cid = btn.dataset.id;
        const newStatus = btn.dataset.status;
        const comp = state.companies.find((c) => c.id === cid);
        if (!comp) return;
        comp.subscription = comp.subscription || { plan: "standard", startAt: Date.now(), expiresAt: Date.now() + 86400000 * 30 };
        comp.subscription.status = newStatus;
        persistCompanies();
        if (newStatus === "active") {
          showToast(`Activated service for ${comp.name}`);
        } else {
          showToast(`Deactivated service for ${comp.name}`);
        }
        render();
        break;
      }
      case "open-company-form":
        state.companyForm = { name: "", staffName: "", staffUsername: "", staffPassword: "", staffRole: "company_admin" };
        render();
        break;
      case "close-company-form":
        state.companyForm = null;
        render();
        break;
      case "save-company-form": {
        const cname = (document.getElementById("company-name")?.value || "").trim();
        const sname = (document.getElementById("company-staff-name")?.value || "").trim();
        const sun = (document.getElementById("company-staff-username")?.value || "").trim();
        const spw = (document.getElementById("company-staff-password")?.value || "").trim();
        const srole = (document.getElementById("company-staff-role")?.value || "company_admin");
        if (!cname || !sname || !sun || !spw) {
          showToast("Please complete company form");
          return;
        }
        if (state.companies.some((c) => c.name.toLowerCase() === cname.toLowerCase())) {
          showToast("Company name already exists");
          return;
        }
        const newCompany = {
          id: uid("company"),
          name: cname,
          products: [],
          sales: [],
          staff: [{ id: uid("staff"), name: sname, username: sun, password: spw, role: srole }],
          invites: [],
          subscription: {
            status: "active",
            plan: "standard",
            startAt: Date.now(),
            expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30
          }
        };
        state.companies.push(newCompany);
        persistCompanies();
        showToast("Company created");
        state.companyForm = null;
        render();
        break;
      }
      case "open-invite-accept":
        state.inviteAcceptForm = { code: "", name: "", username: "", password: "" };
        render();
        break;
      case "close-invite-accept":
        state.inviteAcceptForm = null;
        render();
        break;
      case "save-invite-accept": {
        const code = (document.getElementById("invite-code-input")?.value || "").trim();
        const iname = (document.getElementById("invite-name-input")?.value || "").trim();
        const iuname = (document.getElementById("invite-username-input")?.value || "").trim();
        const ipw = (document.getElementById("invite-password-input")?.value || "").trim();
        if (!code || !iname || !iuname || !ipw) {
          showToast("Please complete invite form");
          return;
        }
        const foundCompany = state.companies.find((c) => (c.invites || []).some((inv) => inv.code === code));
        if (!foundCompany) {
          showToast("Invite code not found");
          return;
        }
        const inv = (foundCompany.invites || []).find((i) => i.code === code);
        if (inv && inv.expiresAt && Date.now() > inv.expiresAt) {
          showToast("Invite code has expired");
          return;
        }
        if (foundCompany.staff.some((s) => s.username.toLowerCase() === iuname.toLowerCase())) {
          showToast("Username is already taken");
          return;
        }
        const newStaff = { id: uid("staff"), name: iname, username: iuname, password: ipw, role: "staff" };
        foundCompany.staff.push(newStaff);
        persistCompanies();
        state.inviteAcceptForm = null;
        state.session = { role: "staff", companyId: foundCompany.id, companyName: foundCompany.name, username: iuname, displayName: iname };
        syncCurrentCompanyData();
        persistSession();
        render();
        showToast("Joined company successfully!");
        break;
      }
      case "invite-company": {
        const cid = btn.dataset.id;
        const comp = state.companies.find((c) => c.id === cid);
        if (!comp) {
          showToast("Company not found");
          return;
        }
        const codeStr = uid("inv").slice(4);
        const inviteObj = { id: uid("invite"), code: codeStr, createdAt: Date.now(), expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7 };
        comp.invites = comp.invites || [];
        comp.invites.push(inviteObj);
        persistCompanies();
        showToast("Invite created: " + codeStr);
        render();
        break;
      }
      case "revoke-invite": {
        const compId2 = btn.dataset.companyId;
        const invId = btn.dataset.id;
        const comp2 = state.companies.find((c) => c.id === compId2);
        if (!comp2) return;
        comp2.invites = (comp2.invites || []).filter((i) => i.id !== invId);
        persistCompanies();
        showToast("Invite revoked");
        render();
        break;
      }
      default:
        break;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const anyOpen = state.staffForm || state.companyForm || state.productForm || state.customItemForm || state.checkoutOpen || state.cartOpen || state.inviteAcceptForm || state.settingsModal || state.thermalReceiptSale || state.itemNoteModal || state.subscriptionForm;
      if (anyOpen) {
        state.staffForm = null;
        state.companyForm = null;
        state.productForm = null;
        state.customItemForm = null;
        state.checkoutOpen = false;
        state.cartOpen = false;
        state.inviteAcceptForm = null;
        state.settingsModal = false;
        state.thermalReceiptSale = null;
        state.itemNoteModal = null;
        state.subscriptionForm = null;
        render();
      }
    }
  });
}

// Attach event handlers
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", attachAppEventHandlers);
} else {
  attachAppEventHandlers();
}

// Initial render
render();

// Immediate Cloud Pull for Multi-Device synchronization
if (typeof navigator !== "undefined" && navigator.onLine) {
  setTimeout(() => {
    pullFromCloud(true);
  }, 100);
}
