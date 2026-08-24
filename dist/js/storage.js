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
