// Enhanced wrapper around localStorage for offline reliability and backup features.
const Storage = {
  get(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      console.warn("Storage.get failed for", key, err);
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn("Storage.set failed for", key, err);
      return false;
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.warn("Storage.remove failed for", key, err);
    }
  },
  exportAll() {
    try {
      const data = {
        version: "2.0",
        exportedAt: new Date().toISOString(),
        companies: this.get("cc_companies_v1", []),
        theme: this.get("cc_theme_v1", "dark"),
        settings: this.get("cc_settings_v1", {}),
      };
      return JSON.stringify(data, null, 2);
    } catch (err) {
      console.error("Storage.exportAll failed", err);
      return null;
    }
  },
  importAll(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && Array.isArray(parsed.companies)) {
        this.set("cc_companies_v1", parsed.companies);
        if (parsed.theme) this.set("cc_theme_v1", parsed.theme);
        if (parsed.settings) this.set("cc_settings_v1", parsed.settings);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Storage.importAll failed", err);
      return false;
    }
  }
};

// --- IndexedDB backup helpers (run in background) ---
;(function(){
  function idbOpen() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) return reject(new Error('IndexedDB not supported'));
      const req = indexedDB.open('cc_backups_db', 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('backups')) db.createObjectStore('backups');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function idbPut(key, value) {
    const db = await idbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('backups', 'readwrite');
      const store = tx.objectStore('backups');
      const r = store.put(value, key);
      r.onsuccess = () => { resolve(true); db.close(); };
      r.onerror = () => { reject(r.error); db.close(); };
    });
  }

  async function idbGet(key) {
    const db = await idbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('backups', 'readonly');
      const store = tx.objectStore('backups');
      const r = store.get(key);
      r.onsuccess = () => { resolve(r.result); db.close(); };
      r.onerror = () => { reject(r.error); db.close(); };
    });
  }

  Storage.ensurePersistentStorage = async function() {
    try {
      if (navigator.storage && navigator.storage.persist) {
        const persisted = await navigator.storage.persist();
        console.log('Storage.persisted?', persisted);
        return persisted;
      }
    } catch (err) {
      console.warn('persist() failed', err);
    }
    return false;
  };

  Storage.backupToIndexedDB = async function() {
    try {
      const payload = this.exportAll();
      if (!payload) return false;
      const data = { exportedAt: Date.now(), payload };
      await idbPut('backup_v1', data);
      console.log('Storage: backup written to IndexedDB');
      return true;
    } catch (err) {
      console.warn('Storage.backupToIndexedDB failed', err);
      return false;
    }
  };

  Storage.restoreFromIndexedDB = async function() {
    try {
      const data = await idbGet('backup_v1');
      if (!data || !data.payload) return false;
      // only restore if companies key missing
      if (!window.localStorage.getItem('cc_companies_v1')) {
        this.importAll(data.payload);
        console.log('Storage: restored data from IndexedDB backup');
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Storage.restoreFromIndexedDB failed', err);
      return false;
    }
  };

  // Run persistence request and background backup; non-blocking.
  (async () => {
    try {
      await Storage.ensurePersistentStorage();
    } catch (e) { /* ignore */ }
    try {
      // run backup after small delay to avoid blocking startup
      setTimeout(() => { Storage.backupToIndexedDB(); }, 1000);
    } catch (e) { /* ignore */ }
  })();
})();
