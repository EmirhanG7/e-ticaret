const products = [
  {
    id: '1',
    name: 'ayakkabı',
    price: 1500,
    brand: 'nike',
    stock: 4
  },
  {
    id: '2',
    name: 'ayakkabı',
    price: 2000,
    brand: 'adidas',
    stock: 3
  },
  {
    id: '3',
    name: 't-shirt',
    price: 400,
    brand: 'mavi',
    stock: 2
  },
  {
    id: '4',
    name: 't-shirt',
    price: 500,
    brand: 'zara',
    stock: 5
  },
  {
    id: '5',
    name: 'gömlek',
    price: 900,
    brand: 'zara',
    stock: 4
  },
  {
    id: '6',
    name: 'gömlek',
    price: 700,
    brand: 'mavi',
    stock: 2
  },
  {
    id: '7',
    name: 'gömlek',
    price: 850,
    brand: 'mudo',
    stock: 1
  },
  {
    id: '8',
    name: 'pantolon',
    price: 900,
    brand: 'mavi',
    stock: 3
  },
  {
    id: '9',
    name: 'pantolon',
    price: 1000,
    brand: 'zara',
    stock: 2
  }
];


const basket = [];
const myProducts = document.querySelector('#myProducts');
const productFilter = document.querySelector('#studentFilter');
const basketContainer = document.querySelector('#basket');
const clearBasketButton = document.querySelector("#clear-basket");
clearBasketButton.addEventListener("click", clearBasket);
const filterTable = document.querySelector('#filterTable');

let filteredProduct = '';

function filterProduct(){
    filteredProduct = this.value;
    renderProducts();
}
productFilter.addEventListener('keyup', filterProduct);

// function render() {
//   filterTable.innerHTML = '';
//     for(const product of products) {
//         if(filteredProduct !== ''){
//             if(product.name.indexOf(filteredProduct) === -1 && product.brand.indexOf(filteredProduct) === -1){
//               continue;
//             }
//         }
        
//         filterTable.innerHTML += `<tr><li>${product.name} ${product.brand}</li></tr>`;

//     }
// }



function renderProducts() {
  myProducts.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
      if(filteredProduct !=='') {
        if(product.name.indexOf(filteredProduct) === -1 && product.brand.indexOf(filteredProduct) === -1){
          continue;
        }
      }
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price} TL</td>
      <td>${product.brand}</td>
      <td>${product.stock}</td>
      <td><button class="add-to-basket" data-id="${product.id}">Sepete Ekle</button></td>
    `;
    myProducts.appendChild(tableRow);
  }
}



function renderBasket() {
  basketContainer.innerHTML = "";
  if (basket.length === 0) {
      basketContainer.innerHTML = "<p>Sepetiniz boş.</p>";
  } else {
      for (let item of basket) {
          let basketItem = document.createElement('li');
          basketItem.innerHTML = `
          <td>${item.name}</td>
          <td>Adet: ${item.stock}</td>
          <td>Toplam: ${item.price * item.stock} TL</td>
          <button class="remove-from-basket" data-id="${item.id}">Sepetten Çıkar</button>
          `;
          basketContainer.appendChild(basketItem);
      }
  }
  updateTotal();
}



function updateTotal() {
  let total = 0;
  for (let item of basket) {
      total += item.price * item.stock;
  }
  const totalElement = document.getElementById("total");
  totalElement.textContent = `Toplam Tutar: ${total} TL`;
}


function addToBasket(productId) {
  let productIndex = -1;
  for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
          productIndex = i;
          break;
      }
  }

  if (productIndex !== -1 && products[productIndex].stock > 0) {
      let inBasketItemIndex = -1;
      for (let i = 0; i < basket.length; i++) {
          if (basket[i].id === productId) {
              inBasketItemIndex = i;
              break;
          }
      }

      if (inBasketItemIndex !== -1) {
          basket[inBasketItemIndex].stock++;
      } else {
          basket.push({
              id: products[productIndex].id,
              name: products[productIndex].name,
              price: products[productIndex].price,
              stock: 1
          });
      }

      products[productIndex].stock--;
      renderProducts();
      renderBasket();
  }
}



function removeFromBasket(productId) {
  let basketItemIndex = -1;
  for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === productId) {
          basketItemIndex = i;
          break;
      }
  }

  if (basketItemIndex !== -1) {
      let productIndex = -1;
      for (let i = 0; i < products.length; i++) {
          if (products[i].id === productId) {
              productIndex = i;
              break;
          }
      }

      if (productIndex !== -1) {
          products[productIndex].stock += basket[basketItemIndex].stock;
      }

      basket.splice(basketItemIndex, 1);
      renderProducts();
      renderBasket();
  }
}



function clearBasket() {
    for (let i = 0; i < basket.length; i++) {
        const basketItem = basket[i];
        for (let j = 0; j < products.length; j++) {
            const product = products[j];
            if (product.id === basketItem.id) {
                product.stock += basketItem.stock;
                break;
            }
        }
    }
    basket.length = 0;
    renderProducts();
    renderBasket();
}



myProducts.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("add-to-basket")) {
    const productId = event.target.getAttribute("data-id");
    addToBasket(productId);
  }
});


basketContainer.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("remove-from-basket")) {
    const productId = event.target.getAttribute("data-id");
    removeFromBasket(productId);
  }
});


renderProducts();
