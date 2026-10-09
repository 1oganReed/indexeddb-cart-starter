// cart.js: draws the page and calls the database functions you write in db.js.
// You do NOT need to change this file. Read it to see WHEN each db.js function runs.

const productList = document.querySelector("#product-list");
const cartList = document.querySelector("#cart-list");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const clearButton = document.querySelector("#clear-cart");
const wishlistList = document.querySelector("#wishlist-list");
const dbStatus = document.querySelector("#db-status");
const message = document.querySelector("#message");
const messageText = document.querySelector("#message-text");

function money(amount) {
  return "$" + amount.toFixed(2);
}

// Shows errors in the red box at the top (and in the console).
function showMessage(error) {
  console.error(error);
  messageText.textContent = `${error.name}: ${error.message}`;
  message.classList.remove("hidden");
}

document.querySelector("#message-close").addEventListener("click", () => {
  message.classList.add("hidden");
});

// ---------- Products (from products.js) ----------
function renderProducts() {
  productList.innerHTML = PRODUCTS.map((product) => `
    <article class="flex flex-col rounded-xl bg-white p-5 shadow-sm">
      <div class="mb-3 text-5xl">${product.emoji}</div>
      <h3 class="font-bold">${product.name}</h3>
      <p class="mb-4 text-navy/70">${money(product.price)}</p>
      <div class="mt-auto flex gap-2">
        <button data-action="add" data-id="${product.id}"
          class="flex-1 rounded-lg bg-navy px-3 py-2 font-semibold text-white hover:bg-orange hover:text-navy">
          Add to cart
        </button>
        <button data-action="save" data-id="${product.id}" aria-label="Save ${product.name} for later"
          class="rounded-lg border border-navy/20 px-3 py-2 hover:border-orange">
          ♡
        </button>
      </div>
    </article>
  `).join("");
}

// ---------- Database status (Part 2: openDB) ----------
async function renderStatus() {
  try {
    const db = await openDB();
    const stores = Array.from(db.objectStoreNames).join(", ");
    dbStatus.innerHTML = `<span class="text-green-700">● Connected to <b>${db.name}</b>, version <b>${db.version}</b>. Stores: <b>${stores}</b></span>`;
  } catch (error) {
    dbStatus.innerHTML = `<span class="text-navy/60">○ Database not connected: ${error.message}</span>`;
  }
}

// ---------- Cart (Part 4: getCart) ----------
async function renderCart() {
  try {
    const items = await getCart();

    if (items.length === 0) {
      cartList.innerHTML = `<li class="text-navy/60">Your cart is empty.</li>`;
    } else {
      cartList.innerHTML = items.map((item) => `
        <li class="flex items-center gap-3">
          <span class="text-2xl">${item.emoji}</span>
          <div class="flex-1">
            <p class="font-semibold leading-tight">${item.name}</p>
            <p class="text-sm text-navy/70">${money(item.price)} each</p>
          </div>
          <div class="flex items-center gap-1">
            <button data-action="minus" data-id="${item.id}" aria-label="One less" class="h-8 w-8 rounded-lg border border-navy/20 hover:border-orange">−</button>
            <span class="w-6 text-center font-bold">${item.qty}</span>
            <button data-action="plus" data-id="${item.id}" aria-label="One more" class="h-8 w-8 rounded-lg border border-navy/20 hover:border-orange">+</button>
          </div>
          <button data-action="remove" data-id="${item.id}" aria-label="Remove ${item.name}" class="px-1 text-red-700 hover:text-red-900">✕</button>
        </li>
      `).join("");
    }

    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (cartCount.textContent !== String(count)) {
      cartCount.classList.remove("bump");
      void cartCount.offsetWidth; // restart the animation
      cartCount.classList.add("bump");
    }
    cartCount.textContent = count;
    cartTotal.textContent = money(total);
  } catch (error) {
    cartList.innerHTML = `<li class="text-sm text-navy/60">${error.message}</li>`;
  }
}

// ---------- Saved for later (Part 7: getWishlist) ----------
async function renderWishlist() {
  try {
    const items = await getWishlist();

    if (items.length === 0) {
      wishlistList.innerHTML = `<li class="text-navy/60">Nothing saved yet. Tap ♡ on a product.</li>`;
      return;
    }

    wishlistList.innerHTML = items.map((item) => `
      <li class="flex items-center gap-3">
        <span class="text-2xl">${item.emoji}</span>
        <div class="flex-1">
          <p class="font-semibold leading-tight">${item.name}</p>
          <p class="text-sm text-navy/70">${money(item.price)}</p>
        </div>
        <button data-action="move" data-id="${item.id}" class="rounded-lg bg-navy px-2 py-1 text-sm text-white hover:bg-orange hover:text-navy">Move to cart</button>
        <button data-action="unsave" data-id="${item.id}" aria-label="Remove ${item.name} from saved" class="px-1 text-red-700 hover:text-red-900">✕</button>
      </li>
    `).join("");
  } catch (error) {
    wishlistList.innerHTML = `<li class="text-sm text-navy/60">${error.message}</li>`;
  }
}

async function renderAll() {
  await renderStatus();
  await renderCart();
  await renderWishlist();
}

// ---------- Buttons ----------
// One click listener for the whole page. data-action says which button it was.
document.body.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = button.dataset.id;
  const product = PRODUCTS.find((p) => p.id === id);

  try {
    if (button.dataset.action === "add") await addToCart(product);         // Part 3
    if (button.dataset.action === "plus") await changeQuantity(id, 1);      // Part 5
    if (button.dataset.action === "minus") await changeQuantity(id, -1);    // Part 5
    if (button.dataset.action === "remove") await removeFromCart(id);       // Part 6
    if (button.dataset.action === "save") await addToWishlist(product);     // Part 7
    if (button.dataset.action === "unsave") await removeFromWishlist(id);   // Part 7
    if (button.dataset.action === "move") await moveToCart(id);             // Challenge
    message.classList.add("hidden");
  } catch (error) {
    showMessage(error);
  }

  await renderAll();
});

clearButton.addEventListener("click", async () => {
  try {
    await clearCart(); // Part 6
    message.classList.add("hidden");
  } catch (error) {
    showMessage(error);
  }
  await renderAll();
});

// ---------- Start ----------
renderProducts();
renderAll();
