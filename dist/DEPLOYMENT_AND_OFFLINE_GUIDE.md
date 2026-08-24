# Corner Counter POS — Export & Deployment Guide (Offline & Online)

A modern, fast, offline-first Point of Sale (POS) Web Application and Mobile PWA.

---

## 🚀 1. How to Run Locally (100% Offline)

Because Corner Counter is completely self-contained with no external runtime dependencies or database installations, you can run it immediately on any computer, tablet, or mobile device.

### Option A: Open Directly in Any Browser
- Simply double-click `index.html` or open it with Google Chrome, Microsoft Edge, Safari, Firefox, or Brave.

### Option B: Local Web Server (Recommended for PWA Features)
Run any simple local HTTP server from this directory:
- **Node.js**: `npx serve .` or `npx http-server . -p 8080`
- **Python**: `python -m http.server 8080`
- **VS Code**: Install the "Live Server" extension and click "Go Live".

Then open: **`http://localhost:8080`**

---

## 📱 2. How to Install as a Mobile App (iOS & Android)

You can install Corner Counter directly to your home screen with a full-screen native app experience and offline launch support:

### On iPhone / iPad (iOS Safari):
1. Open the website in Safari.
2. Tap the **Share** button (the square with an arrow pointing up).
3. Scroll down and tap **"Add to Home Screen"** (`+`).
4. Tap **Add**. The Corner Counter icon will now appear on your home screen and run in full-screen standalone mode even when disconnected from the internet.

### On Android (Chrome / Brave / Edge):
1. Open the website in Chrome.
2. Tap the **Three Dots Menu** (`⋮`) in the top right.
3. Tap **"Install App"** or **"Add to Home screen"**.
4. Confirm by tapping **Install**.

### On Desktop (Windows / Mac / Linux Chrome or Edge):
1. Open the website in Chrome or Edge.
2. Click the **Install** icon in the address bar (looks like a monitor with an arrow) or open the menu and choose **"Install Corner Counter..."**.
3. It will launch as an independent desktop application window in your dock or taskbar.

---

## 🌐 3. Free 1-Click Online Web Deployment

You can host Corner Counter online for free on any modern static hosting platform:

### Option A: Vercel (Instant Deployment)
1. Drag and drop this folder into the [Vercel Dashboard](https://vercel.com/new).
2. Click **Deploy**. Your live HTTPS link will be generated in 5 seconds.

### Option B: Netlify (Drag & Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `dist` or project folder into the dropzone.
3. Your app is live with free SSL!

### Option C: GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings** → **Pages** → Source: **Deploy from a branch** (`main` / root).
3. Click **Save**.

### Option D: Traditional Web Server (Apache / Nginx / Cpanel)
- Simply upload all files (`index.html`, `css/`, `js/`, `icons/`, `manifest.json`, `service-worker.js`) to your `public_html` or `www` directory.

---

## 🔒 4. Default System Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Super Admin** | `JOESH` | `@Icejee01` |
| **Company Admin** | `admin` | `admin123` |
| **Front Desk / Staff** | `staff` | `staff123` |

### Key Admin & Cloud Capabilities:
- **🟢 / ⛔ Superadmin Activate & Deactivate Controls**: Superadmin can toggle 1-click active/deactivated status per company.
- **🗑️ Superadmin Company Deletion**: Superadmin can permanently delete any company, its staff credentials, sales records, and products from the system with confirmation.
- **☁️ Cloud Data Synchronization (Offline ➔ Online Sync)**:
  - When offline, POS transactions and company updates are automatically queued in the local sync queue (`cc_pending_sync_v1`).
  - As soon as an internet connection is established, the application automatically uploads all queued data to the cloud backup server (`cc_cloud_store_v1`) and updates the sync indicator.
  - Manual sync can be triggered anytime via the **`☁️ Synced` / `☁️ Queued`** header pill or **⚙️ POS Store Settings**.

---

## 💾 5. Offline Data & Backups

- All products, inventory, transactions, orders, discounts, and settings are persisted locally in `localStorage`.
- To create a full data backup at any time:
  1. Open the POS app.
  2. Tap the **⚙️ Settings** icon in the top header.
  3. Under **Data Backup & Restore**, click **"Backup JSON"** to download a complete backup file.
  4. You can restore this file on any other device or browser using **"Restore JSON"**.
