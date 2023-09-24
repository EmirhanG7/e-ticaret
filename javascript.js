const products = [
  { id: 1, name: "Pantolon", price: 30, category: "Giyim", stock: 10 },
  { id: 2, name: "Kazak", price: 40, category: "Giyim", stock: 15 },
  { id: 3, name: "Tişört", price: 20, category: "Giyim", stock: 20 },
];

let cart = [];
let totalPrice = 0;

function renderProducts() {
  const productContainer = document.querySelector("#productContainer");

  for (const product of products) {
    const productHtml = `
          <div class="col-md-4">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">Fiyat: $${product.price}</p>
                      <p class="card-text">Kategori: ${product.category}</p>
                      <p class="card-text">Stok: <span id="stock${product.id}">${product.stock}</span></p>
                      <button class="btn btn-primary addToCart" data-product-id="${product.id}">
                          Sepete Ekle
                      </button>
                  </div>
              </div>
          </div>
      `;

    productContainer.innerHTML += productHtml;
  }

  //butonların tıklama eylemi için sepet işlevi gerçekleştirir.
  const addToCartButtons = document.querySelectorAll(".addToCart");

  for (const button of addToCartButtons) {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      // ürünü bulması
      const product = products.find((item) => item.id === Number(productId));

      if (product) {
        addToCart(product);
      }
    });
  }
}

// ürün  ekleme sepete.
function addToCart(product) {
  // ürünün stokları
  const stockElement = document.querySelector(`#stock${product.id}`);

  if (product.stock > 0) {
    // sepete pushla eklemesi için
    cart.push(product);
    updateCartBasket();
    // stoktan düşürmek için -1 ile -- de aynıymış..
    product.stock--;
    totalPrice += product.price;
    updateTotalOPrice();
    stockElement.textContent = product.stock;
    // chatgptden yardım aldım.. yeni urun ekleyince stock dusmuyordu..
  } else {
    // olurda stok kalmazsa diye
    alert("Stokta yeterli ürün yok.");
  }
}

// sepet kısmı
function updateCartBasket() {
  const cartList = document.querySelector("#cart");
  cartList.innerHTML = "";

  for (const product of cart) {
    cartList.innerHTML += `<li>${product.name}</li>`;
  }
}

// toplam fiyatımız
function updateTotalOPrice() {
  const totalPriceElement = document.querySelector("#totalPrice");
  totalPriceElement.textContent = totalPrice;
}

products.push({
  id: 4,
  name: "Yeni Ürün",
  price: 50,
  category: "Teknoloji",
  stock: 5,
});

renderProducts();
