# Corner Counter — Modern Offline POS 🚀

A fast, modern, offline-first Point of Sale (POS) system. Zero external framework dependencies, instant load times, 100% on-device storage (`localStorage`), and built-in PWA support for mobile and desktop tablets.

```
corner-counter/
├── index.html          App shell with Google fonts and canvas confetti
├── manifest.json       PWA manifest ("Add to Home Screen")
├── service-worker.js   Offline caching engine (v3)
├── css/
│   └── style.css       Modern design system, dual-pane responsive layout & themes
├── js/
│   ├── app.js          Full POS engine, tabs, checkout, analytics & receipts
│   ├── audio.js        Synthesized Web Audio sound effects (scanner, chime, coin)
│   └── storage.js      LocalStorage wrapper with JSON export/import backup
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## ✨ Features

### 🎨 Modern Visual Experience & Dual-Pane Layout
- **Adaptive Layout**: Automatically switches between a **Desktop/Tablet Split-Screen POS** (catalog on left, live order ledger on right) and a **Mobile-Optimized Single-Column POS**.
- **Dark & Light Mode**: Curated dark obsidian and crisp light themes with glassmorphism cards and glowing accents.
- **Web Audio Sound Effects**: Synthesized scanner beeps, checkout chimes, and coin sounds (with instant one-tap mute toggle).
- **Celebration Confetti**: Animated celebration on every completed transaction.

### 🏷️ Fast Catalog & Ordering
- **Category Filter Chips**: Filter products instantly with live item counts.
- **Favorites / Starred Pinning**: Star your highest-volume items to pin them to the quick-tap bar.
- **Custom Quick Items**: Sell custom-priced items on the fly without catalog setup.
- **Item Modifiers & Notes**: Attach special preparation instructions (e.g., "Oat Milk", "Extra Hot") to any cart line item.

### 📑 Parked Orders & Open Tabs
- Hold and manage multiple customer/table orders simultaneously (e.g. "Table 4", "Bar Tab", "Walk-in") and toggle between them seamlessly.

### 💳 Multi-Payment Checkout
- **Cash**: Smart denomination calculator ($5, $10, $20, $50, $100, exact amount) with automatic change calculation.
- **Card Terminal Simulator**: Realistic contactless / chip terminal simulation.
- **QR Code Pay**: Simulated mobile wallet QR code scanner.
- **Split Payment**: Split tickets between cash and card.

### 🧾 Printable Digital Thermal Receipts
- Styled specifically for 80mm thermal receipt printers with one-click `window.print()` formatting, store branding, and barcode footer.

### 📊 Sales Analytics & Reports
- Real-time KPI cards: **Gross Revenue**, **Transactions**, **Average Ticket Size (AOV)**, **Sales Tax Collected**, and **Tips**.
- Top-selling products visual ranking chart.
- Timeframe filters: *Today*, *Yesterday*, *Last 7 Days*, *This Month*, *All Time*.
- **CSV Export**: 1-click download of all transaction details for bookkeeping and accounting.
- **Demo Data Generator**: 1-click load of sample sales for instant demonstration.

### 📦 Inventory & Stock Control
- Real-time stock decrement on sales with **Low Stock** (≤5) and **Out of Stock** alert badges.

### ⚙️ Store Customization & Data Backup
- Customizable currency symbols (`$`, `€`, `£`, `¥`, `₹`, `₱`, `A$`, `C$`).
- Configurable tax rates (e.g. 0%, 5%, 8.5%).
- JSON data export & restore backup tools.

---

## 🚀 Running Locally

```bash
# Using Python
python -m http.server 8080

# Or using Node
npx serve . -l 8080
```

Open `http://localhost:8080` in any browser.

## Installing on Android (PWA)

This app is a Progressive Web App (PWA) and can be installed on Android devices via Chrome or other modern browsers.

- Host the app over HTTPS (GitHub Pages works) or run locally and access it via `http://localhost`.
- Open the site in Chrome on your Android device.
- Chrome will show an install prompt automatically or you can tap the menu and choose "Install app" / "Add to Home screen".
- On this project the app will also show an "Install App" floating button when the browser supports PWA installation.

If you want to bundle the app as an Android APK, use a Trusted Web Activity (TWA) wrapper in Android Studio or tools like Bubblewrap.

---

## 🔑 Login Credentials

| Role | Username | Password |
|------|----------|----------|
| **Superadmin** | `JOESH` | `@Icejee01` |
| **Company Admin** | `admin` | `admin123` |
| **Staff Member** | `staff` | `staff123` |
