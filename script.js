"use strict";

// Menu items available when the page loads.
const menu = [
  { name: "Espresso", price: 3.0 },
  { name: "Latte", price: 4.5 },
  { name: "Mocha", price: 5.0 },
  { name: "Muffin", price: 2.5 },
  {name: "tea", price:1.00},
];

// Items currently in the cart. Each entry is { name, price }.
let cart = [];

// --- DOM references ---
const menuList = document.getElementById("menu-list");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const rewardMsg = document.getElementById("reward-msg");
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const errorMsg = document.getElementById("error-msg");
const addCustomBtn = document.getElementById("add-custom-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Clears #menu-list and rebuilds one <li> per item in the `menu` array.
function renderMenu() {
  menuList.textContent = "";

  menu.forEach((item, index) => {
    const li = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = `${item.name} — $${item.price.toFixed(2)}`;

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.classList.add("add-btn");
    addBtn.dataset.index = index; // which menu item this button adds

    li.appendChild(label);
    li.appendChild(addBtn);
    menuList.appendChild(li);
  });
}

// Clears #cart-list and rebuilds one <li> per entry in the `cart` array.
function renderCart() {
  cartList.textContent = "";

  if (cart.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Your cart is empty.";
    cartList.appendChild(li);
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement("li");

      const label = document.createElement("span");
      label.textContent = `${item.name} — $${item.price.toFixed(2)}`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      removeBtn.dataset.index = index; // which cart entry this button removes

      li.appendChild(label);
      li.appendChild(removeBtn);
      cartList.appendChild(li);
    });
  }

  cartCount.textContent = cart.length;
  updateTotal();
}

// Recomputes the cart total with reduce, displays it, and toggles the
// "reward unlocked" styling once the total passes $15.
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total.toFixed(2);

  if (total > 15) {
    cartTotal.style.color = "red";
    rewardMsg.classList.remove("hidden");
  } else {
    cartTotal.style.color = "";
    rewardMsg.classList.add("hidden");
  }
}

// Reads and validates the custom item form, then adds the item to the menu.
function addCustomItem() {
  const name = itemNameInput.value.trim();
  const priceText = itemPriceInput.value.trim();
  const price = Number(priceText);

  if (name === "") {
    errorMsg.textContent = "Name is required.";
    return;
  }

  if (Number.isNaN(price) || price <= 0) {
    errorMsg.textContent = "Price must be a positive number.";
    return;
  }

  const alreadyExists = menu.some(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (alreadyExists) {
    errorMsg.textContent = "This item is already on the menu.";
    return;
  }

  menu.push({ name, price });
  renderMenu();

  itemNameInput.value = "";
  itemPriceInput.value = "";
  errorMsg.textContent = "";
}

// Empties the cart and re-renders it (total resets to 0.00, count to 0).
function clearCart() {
  cart = [];
  renderCart();
}

// --- Event listeners ---

// Event delegation: one listener on #menu-list handles every "Add" button,
// even ones created later for custom items.
menuList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-btn")) {
    const index = Number(event.target.dataset.index);
    const item = menu[index];
    cart.push({ name: item.name, price: item.price });
    renderCart();
  }
});

// Event delegation: one listener on #cart-list handles every "Remove" button.
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const index = Number(event.target.dataset.index);
    cart.splice(index, 1); // removes only that one entry
    renderCart();
  }
});

addCustomBtn.addEventListener("click", addCustomItem);
clearCartBtn.addEventListener("click", clearCart);

// --- Initial render when the page loads ---
renderMenu();
renderCart();
