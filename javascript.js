const products = [
  { id: 1, name: "Pantolon", price: 30 },
  { id: 2, name: "Kazak", price: 40 },
  { id: 3, name: "Tişört", price: 20 },
];

let cart = [];
let totalPrice = 0;

// sepete eklemek için idlerine göre tıklama çağırma kısmı
document.querySelector("#addToCart1").addEventListener("click", () => {
  addToCart(1);
});

document.querySelector("#addToCart2").addEventListener("click", () => {
  addToCart(2);
});

document.querySelector("#addToCart3").addEventListener("click", () => {
  addToCart(3);
});

// ürün ekleme
function addToCart(productId) {
  // ürünü bulması
  const product = products.find((item) => item.id === productId);

  if (product) {
    // ürünün stokları
    const stockElement = document.querySelector(`#stock${productId}`);
    const stock = parseInt(stockElement.textContent);

    if (stock > 0) {
      // sepete pushla eklemesi için
      cart.push(product);
      updateCartBasket();

      // stoktan düşürmek içib
      stockElement.textContent = stock - 1;

      // sepette fiatı güncel tutmak için
      totalPrice += product.price;
      updateTotalPrice();
    } else {
      // olurda stok kalmazsa diye
      alert("Stokta yeterli ürün yok.");
    }
  }
}

// sepet kısmı
function updateCartBasket() {
  const cartList = document.querySelector("#cart");
  cartList.innerHTML = "";

  let cartHTML = "";

  for (const product of cart) {
    cartHTML += `<li>${product.name}</li>`;
  }

  cartList.innerHTML = cartHTML;
}

// map kullanarakta yapılırmış fakat çok zorlandım o yüzden çokta map üzerinde duramadım.
// function updateCartBasket() {
//     const cartList = document.querySelector("#cart");
//     cartList.innerHTML = cart
//       .map((product) => `<li>${product.name}</li>`)
//       .join("");
//   }

// toplam fiyatımız
function updateTotalPrice() {
  const totalPriceElement = document.querySelector("#totalPrice");
  totalPriceElement.textContent = totalPrice;
}
