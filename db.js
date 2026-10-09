// db.js: everything that talks to IndexedDB lives in this file.
// cart.js calls these functions. YOU write them, one part at a time.
// Each one throws "not built yet" until you replace that line with your code.

const DB_NAME = "shopDB";
const DB_VERSION = 1;

// ALREADY DONE: IndexedDB answers with events (onsuccess / onerror), not promises.
// promisify() wraps a request in a promise so you can use await, like you did with fetch.
function promisify(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ---------- Part 2: Open the database ----------
function openDB() {
  throw new Error("openDB() is not built yet (Part 2)");
}

// ---------- Part 3: CREATE ----------
async function addToCart(product) {
  throw new Error("addToCart() is not built yet (Part 3)");
}

// ---------- Part 4: READ ----------
async function getCart() {
  throw new Error("getCart() is not built yet (Part 4)");
}

// ---------- Part 5: UPDATE ----------
async function changeQuantity(id, amount) {
  throw new Error("changeQuantity() is not built yet (Part 5)");
}

// ---------- Part 6: DELETE ----------
async function removeFromCart(id) {
  throw new Error("removeFromCart() is not built yet (Part 6)");
}

async function clearCart() {
  throw new Error("clearCart() is not built yet (Part 6)");
}

// ---------- Part 7: Saved for later (you design this one) ----------
async function addToWishlist(product) {
  throw new Error("addToWishlist() is not built yet (Part 7)");
}

async function getWishlist() {
  throw new Error("Saved for later is not built yet (Part 7)");
}

async function removeFromWishlist(id) {
  throw new Error("removeFromWishlist() is not built yet (Part 7)");
}

// ---------- Challenge (optional) ----------
async function moveToCart(id) {
  throw new Error("moveToCart() is the optional challenge");
}
