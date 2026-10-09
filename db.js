// db.js: everything that talks to IndexedDB lives in this file.
// cart.js calls these functions. YOU write them, one day at a time.
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

// ---------- Day 1: Open the database ----------
// Opens shopDB. Makes the "cart" store the first time.
// Gives back (a promise for) the open database.
function openDB() {
  throw new Error("openDB() is not built yet (Day 1)");
}

// ---------- Day 2: CREATE ----------
// product: one object from PRODUCTS.
// Puts it in the cart with qty 1, or adds 1 to qty if it's already there.
async function addToCart(product) {
  throw new Error("addToCart() is not built yet (Day 2)");
}

// ---------- Day 2: READ ----------
// Gives back an array of every item in the cart.
async function getCart() {
  throw new Error("getCart() is not built yet (Day 2)");
}

// ---------- Day 2: UPDATE ----------
// id: which item. amount: 1 or -1.
// Changes that item's qty by amount.
async function changeQuantity(id, amount) {
  throw new Error("changeQuantity() is not built yet (Day 2)");
}

// ---------- Day 3: DELETE ----------
// id: which item. Takes it out of the cart.
async function removeFromCart(id) {
  throw new Error("removeFromCart() is not built yet (Day 3)");
}

// Empties the whole cart.
async function clearCart() {
  throw new Error("clearCart() is not built yet (Day 3)");
}

// ---------- Day 3: Saved for later (you design this one) ----------
async function addToWishlist(product) {
  throw new Error("addToWishlist() is not built yet (Day 3)");
}

async function getWishlist() {
  throw new Error("Saved for later is not built yet (Day 3)");
}

async function removeFromWishlist(id) {
  throw new Error("removeFromWishlist() is not built yet (Day 3)");
}

// ---------- Challenge (optional) ----------
async function moveToCart(id) {
  throw new Error("moveToCart() is the optional challenge");
}
