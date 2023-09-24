const data = {
  products: [
    { id: 1, name: "Pantolon", price: 30, category: "Giyim", stock: 10 },
    { id: 2, name: "Kazak", price: 40, category: "Giyim", stock: 15 },
  ],
};

let cart = [];
let totalPrice = 0;

function renderProducts() {
  const productTable = document.querySelector("#productTable");

  for (const product of data.products) {
    const row = productTable.insertRow();
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.category}</td>
      <td><span id="stock${product.id}">${product.stock}</span></td>
      <td>
        <button class="btn btn-primary addToCart" data-product-id="${product.id}">Sepete Ekle</button>
      </td>
    `;
  }

  const addToCartButtons = document.querySelectorAll(".addToCart");

  for (const button of addToCartButtons) {
    button.addEventListener("click", addToCartClicked);
  }
}

function addToCartClicked(event) {
  const button = event.target;
  const productId = button.dataset.productId;
  const product = data.products.find((item) => item.id === Number(productId));

  if (product && product.stock > 0) {
    addToCart(product);
    const stockElement = document.querySelector(`#stock${product.id}`);
    stockElement.textContent = product.stock;
  } else {
    alert("Stokta yeterli ürün yok.");
  }
}

function addToCart(product) {
  cart.push(product);
  updateCartBasket();
  product.stock--;
  totalPrice += product.price;
  updateTotalPrice();
}

function updateCartBasket() {
  const cartList = document.querySelector("#cart");
  cartList.innerHTML = "";

  for (const product of cart) {
    cartList.innerHTML += `<li>${product.name}</li>`;
  }
}

function updateTotalPrice() {
  const totalPriceElement = document.querySelector("#totalPrice");
  totalPriceElement.textContent = totalPrice;
}

function goToAdmin() {
  window.location.href = "admin.html";
}

renderProducts();
