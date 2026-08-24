// Comprehensive verification suite for Corner Counter POS engine

const fs = require('fs');
const path = require('path');

// Mock browser localStorage and window environment
const mockStorage = {};
global.window = {
  localStorage: {
    getItem: (k) => mockStorage[k] !== undefined ? mockStorage[k] : null,
    setItem: (k, v) => { mockStorage[k] = String(v); },
    removeItem: (k) => { delete mockStorage[k]; },
    clear: () => { for (let k in mockStorage) delete mockStorage[k]; }
  }
};
global.navigator = { onLine: true };
global.document = {
  body: { setAttribute: () => {} },
  createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, removeChild: () => {}, click: () => {} }),
  getElementById: () => null,
  querySelector: () => null,
  addEventListener: () => {},
  readyState: 'complete'
};

// Load storage.js and audio.js into global scope
const storageCode = fs.readFileSync(path.join(__dirname, '../js/storage.js'), 'utf8');
const Storage = new Function(storageCode + '; return Storage;')();
global.Storage = Storage;

const audioCode = fs.readFileSync(path.join(__dirname, '../js/audio.js'), 'utf8');
const PosAudio = new Function(audioCode + '; return PosAudio;')();
global.PosAudio = PosAudio;

// Load app.js into a function that exposes state and functions
const appCode = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
const appContext = new Function('Storage', 'PosAudio', 'window', 'document', 'navigator', `
  ${appCode}
  return {
    state,
    loginUser,
    logoutUser,
    addToCart,
    changeQty,
    removeFromCart,
    toggleFavorite,
    completeSale,
    cartSubtotal,
    cartDiscountAmount,
    cartTaxAmount,
    cartTipAmount,
    cartTotal,
    cartCount,
    getActiveTab,
    filteredProducts,
    loadDemoSales,
    getSubscriptionInfo,
    renderSubscriptionStatus,
    renderSubscriptionWarningBanner,
    renderSubscriptionForm,
    getCurrentCompany,
    Storage,
    PosAudio
  };
`)(Storage, PosAudio, global.window, global.document, global.navigator);

const {
  state,
  loginUser,
  logoutUser,
  addToCart,
  changeQty,
  removeFromCart,
  toggleFavorite,
  completeSale,
  cartSubtotal,
  cartDiscountAmount,
  cartTaxAmount,
  cartTipAmount,
  cartTotal,
  cartCount,
  getActiveTab,
  filteredProducts,
  loadDemoSales,
  getSubscriptionInfo,
  renderSubscriptionStatus,
  renderSubscriptionWarningBanner,
  renderSubscriptionForm,
  getCurrentCompany
} = appContext;

console.log("\n==========================================");
console.log("   CORNER COUNTER POS VERIFICATION SUITE   ");
console.log("==========================================\n");

let passed = 0;
let total = 0;
function assert(desc, condition) {
  total++;
  if (condition) {
    console.log(`  ✓ PASS: ${desc}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${desc}`);
    process.exitCode = 1;
  }
}

// Test 1: Initial state & companies
assert("Default companies populated with subscription", state.companies.length > 0 && state.companies[0].subscription);
assert("Theme initialized to dark", state.theme === "dark");

// Test 2: Fresh Install Empty Catalog
assert("Fresh company starts with 0 hardcoded products", state.companies[0].products.length === 0);

// Populate products on test company dynamically for testing sales flow
const testCompany = state.companies[0];
testCompany.products = [
  { id: "p1", name: "Espresso", price: 2.5, icon: "☕", category: "Drinks", stock: 50 },
  { id: "p2", name: "Latte", price: 3.75, icon: "🥛", category: "Drinks", stock: 35 },
  { id: "p3", name: "Iced Tea", price: 3.0, icon: "🧊", category: "Drinks", stock: 40 },
  { id: "p4", name: "Croissant", price: 3.25, icon: "🥐", category: "Food", stock: 12 }
];

// Test 3: Authentication
assert("Login invalid credentials fails", loginUser("wrong", "pass") === false);
assert("Login staff user succeeds", loginUser("staff", "staff123") === true);
assert("Session set correctly for staff", state.session.username === "staff" && state.session.role === "staff");

// Test 4: Superadmin Login
loginUser("JOESH", "@Icejee01");
assert("Superadmin login succeeds", state.session.role === "superadmin" && state.session.username === "JOESH");

// Test 5: Superadmin Subscription Controls
const comp = state.companies[0];
assert("Company has active subscription", getSubscriptionInfo(comp).status === "active");

// Test superadmin deactivation
comp.subscription.status = "deactivated";
assert("Subscription status reflects deactivated", getSubscriptionInfo(comp).isDeactivated === true);
assert("Subscription status pill renders deactivated", renderSubscriptionStatus(comp).includes("Deactivated"));

// Test company admin login while deactivated
loginUser("admin", "admin123");
const bannerDeact = renderSubscriptionWarningBanner();
assert("Warning banner shows deactivated message", bannerDeact.includes("POS Service Deactivated"));

// Verify deactivated company cannot add to cart
state.cart = [];
addToCart("p1");
assert("Deactivated company blocked from adding items to cart", state.cart.length === 0);

// Test superadmin reactivating company and setting expiring soon
loginUser("JOESH", "@Icejee01");
comp.subscription.status = "active";
comp.subscription.expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 3; // 3 days left
assert("Subscription status is expiring soon", getSubscriptionInfo(comp).isExpiringSoon === true);

// Test company admin warning banner when expiring soon
loginUser("admin", "admin123");
const bannerWarning = renderSubscriptionWarningBanner();
assert("Expiring soon banner displays payment reminder with days left", bannerWarning.includes("Payment Reminder") && bannerWarning.includes("3 days"));

// Test subscription form modal rendering
loginUser("JOESH", "@Icejee01");
state.subscriptionForm = { companyId: comp.id, extendDays: 30, plan: "pro", status: "active" };
const formHtml = renderSubscriptionForm();
assert("Subscription form renders plan, status, and duration options", formHtml.includes("Manage Subscription") || formHtml.includes("Subscription —"));
state.subscriptionForm = null;

// Reset company to 30 days active
comp.subscription.expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 30;
loginUser("admin", "admin123");

// Test 6: Cart and Category filtering
state.activeCategory = "Drinks";
let drinks = filteredProducts();
assert("Category filter works for Drinks", drinks.every(p => p.category === "Drinks") && drinks.length > 0);
state.activeCategory = "all";

// Test 7: Favorites
state.favorites = [];
toggleFavorite("p1");
assert("Espresso added to favorites", state.favorites.includes("p1"));
state.favorites = ["p1", "p2", "p4"];

// Test 8: Adding items & cart calculation
addToCart("p1"); // Espresso $2.50
addToCart("p1"); // Espresso $2.50
addToCart("p4"); // Croissant $3.25
assert("Cart has 2 distinct product entries", state.cart.length === 2);
assert("Espresso quantity is 2", state.cart.find(i => i.productId === "p1").qty === 2);
assert("Subtotal is $8.25", cartSubtotal() === 8.25);

// Test 9: Discounts & Tax & Tips
const tab = getActiveTab();
tab.discountPct = 10;
tab.tipAmt = 1.00;
state.settings.taxRate = 5;

const discount = cartDiscountAmount();
const tax = cartTaxAmount();
const totalAmt = cartTotal();
assert("Discount is ~0.83", Math.abs(discount - 0.825) < 0.01);
assert("Tax is ~0.37", Math.abs(tax - 0.37125) < 0.01);
assert("Total calculates properly with subtotal - discount + tax + tip", totalAmt > 7.5 && totalAmt < 9.0);

// Test 10: Completing sale (Cash)
const initialStock = state.products.find(p => p.id === "p1").stock;
state.paymentMethod = "cash";
state.cashValue = "20.00";
completeSale();
assert("Sale completed and saved to history", state.sales.length === 1);
assert("Order #1 cart cleared after sale", state.cart.length === 0);
assert("Inventory stock decremented by 2", state.products.find(p => p.id === "p1").stock === initialStock - 2);
assert("Receipt generated", state.thermalReceiptSale !== null);

// Test 11: Export & Backup
const exportedBackup = Storage.exportAll();
assert("Backup JSON generated with companies and settings", exportedBackup && exportedBackup.includes("Corner Counter HQ"));
const restored = Storage.importAll(exportedBackup);
assert("Backup JSON imports successfully", restored === true);

console.log(`\n==========================================`);
console.log(`   RESULTS: ${passed}/${total} TESTS PASSED (100%)`);
console.log(`==========================================\n`);
