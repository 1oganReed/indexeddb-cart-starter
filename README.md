# IndexedDB Shopping Cart Starter

West-MEC Coding Year 2. Your first real database: **IndexedDB**, the database built into every browser.

You build the cart for a merch shop. Add something, close the browser, come back tomorrow: it's still in the cart. No server, no account, no install.

## Setup

1. In VS Code: **File > Open Folder**, pick your class folder. **Terminal > New Terminal**, then:

   ```
   git clone https://github.com/Xerrath/indexeddb-cart-starter.git
   ```

2. **File > Open Folder** and open `indexeddb-cart-starter`.
3. Install the **Live Server** extension if you don't have it (VS Code will suggest it).
4. Right-click `index.html` > **Open with Live Server**. Use **Chrome**.

You should see the shop with six products, and messages that say things are **not built yet**. That's right: you build them.

## The files

| File | What it is | Do you change it? |
| --- | --- | --- |
| `index.html` | The page. Styled with **Tailwind CSS** classes. | No (you can play with classes) |
| `global.css` | A little plain CSS for the whole site. | No |
| `products.js` | The six products, as an array of objects. | No |
| `db.js` | **Every** IndexedDB function. | **Yes: this is your file** |
| `cart.js` | Draws the page and calls the functions in `db.js`. | No (read it!) |

## See your database

Chrome DevTools (F12) > **Application** tab > **Storage** > **IndexedDB** > `shopDB`.
Click the refresh icon above the table after you change data.

## Start over

DevTools > **Application** > **Storage** > **Clear site data**, then refresh the page.

## Stuck?

- **Nothing changes after I edit db.js**: save the file (Ctrl+S). Live Server reloads by itself.
- **The page hangs after I change DB_VERSION**: close every other tab that has the shop open, then refresh.
- **Styles are missing**: Tailwind loads from the internet. Check your connection and refresh.
