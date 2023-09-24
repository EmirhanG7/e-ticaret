function goToIndex() {
  window.location.href = "index.html";
}

const data = {
  products: [
    { id: 1, name: "Pantolon", price: 30, category: "Giyim", stock: 10 },
    { id: 2, name: "Kazak", price: 40, category: "Giyim", stock: 15 },
  ],
};

function renderAdminProducts() {
  const productTable = document.querySelector("#productTable");
  productTable.innerHTML = "";

  for (const product of data.products) {
    const row = productTable.insertRow();
    row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.category}</td>
            <td><span id="stock${product.id}">${product.stock}</span></td>
            <td>
                <button class="btn btn-warning editButton" data-product-id="${product.id}">Düzenle</button>
                <button class="btn btn-danger deleteButton" data-product-id="${product.id}">Sil</button>
            </td>
        `;
  }

  addEventListeners();
}

function addEventListeners() {
  const editButtons = document.querySelectorAll(".editButton");
  const deleteButtons = document.querySelectorAll(".deleteButton");

  for (const button of editButtons) {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      editProduct(productId);
    });
  }

  for (const button of deleteButtons) {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      deleteProduct(productId);
    });
  }
}

function editProduct(productId) {
  const product = data.products.find((item) => item.id === Number(productId));

  if (product) {
    const updatedName = prompt("Yeni ürün adını girin:", product.name);
    const updatedPrice = prompt("Yeni fiyatı girin:", product.price);
    const updatedCategory = prompt("Yeni kategoriyi girin:", product.category);
    const updatedStock = prompt("Yeni stok sayısını girin:", product.stock);

    if (updatedName && updatedPrice && updatedCategory && updatedStock) {
      product.name = updatedName;
      product.price = updatedPrice;
      product.category = updatedCategory;
      product.stock = updatedStock;

      renderAdminProducts();
    }
  }
}

function deleteProduct(productId) {
  const productIndex = data.products.findIndex(
    (item) => item.id === Number(productId)
  );

  if (productIndex !== -1) {
    const confirmation = confirm("Bu ürünü silmek istediğinize emin misiniz?");

    if (confirmation) {
      data.products.splice(productIndex, 1);

      renderAdminProducts();
    }
  }
}

renderAdminProducts();
