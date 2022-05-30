// taille du localStorage & création de orderList.....................................................
const itemsInStorage = localStorage.length;
console.log(itemsInStorage);
const orderList = [];

// let priceHidden = 0;

// boucle des objets de localStorage vers orderList..............................................
for (let i = 0; i < itemsInStorage; i++) {
  const item = localStorage.getItem(localStorage.key(i));
  const itemObject = JSON.parse(item);
  orderList.push(itemObject);
}
console.log(orderList);

// Affichage dynamique de chaque article de orderList..........................................
let products = document.querySelector("#cart__items");

for (let article of orderList) {
  console.log(article.productId);
  let productId = article.productId;

  // priceHidden = priceApi(productId);
  // function priceH(priceHidden) {
  //   console.log(priceHidden);
  //   return priceHidden;
  // }
  products.innerHTML += `<article class="cart__item" data-id="${article.productId}" data-color="${article.color}">
  <div class="cart__item__img">
  <img src="${article.imageUrl}" alt=${article.altTxt}>
  </div>
  <div class="cart__item__content">
  <div class="cart__item__content__description">
  <h2>${article.name}</h2>
  <p>${article.color}</p>
  <p>${article.price} €</p>
  </div>
  <div class="cart__item__content__settings">
  <div class="cart__item__content__settings__quantity">
  <p>Qté : </p>
  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${article.quantity}>
  </div>
  <div class="cart__item__content__settings__delete">
  <p class="deleteItem">Supprimer</p>
  </div>
  </div>
  </div>
  </article> `;
}

// fonction de récupération du prix de l'article sur l'API.......................................
// async function priceApi(productId) {
//   fetch(`http://localhost:3000/api/products/${productId}`)
//     .then((response) => response.json())
//     .then((res) => {
//       priceHidden = priceH(res.price);

//       // console.log(res);
//       console.log(priceHidden);
//       return priceHidden;
//     });
//   // console.log(priceHidden);
//   // return price;

//   // console.log(productId);
// }

// écoute sur les changements de quantités........................................

listenQuantity();

function listenQuantity() {
  const changeQuantity = document.querySelectorAll(".itemQuantity");
  console.log(changeQuantity);
  changeQuantity.forEach((section) => {
    section.addEventListener("input", () => updateQuantity());
  });
}
function updateQuantity() {
  console.log(orderList);
}

// suppression des articles....................................................

eraseItem();

function eraseItem() {
  const eraseItem = document.querySelectorAll(".deleteItem");
  console.log(eraseItem);
  eraseItem.forEach((section) => {
    section.addEventListener("click", () => eraseObject());
  });
}
function eraseObject() {
  console.log(orderList);
}

// quantité totale des articles...............................................

displayTotalQuantity();

function displayTotalQuantity() {
  let total = 0;
  const totalQuantity = document.querySelector("#totalQuantity");

  orderList.forEach((object) => {
    const totalQuantityObject = object.quantity;
    total += totalQuantityObject;
  });

  totalQuantity.textContent = total;
}

// calcul du prix total........................................

displayTotalPrice();

function displayTotalPrice() {
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");

  orderList.forEach((object) => {
    const totalPriceByObject = object.price * object.quantity;
    total += totalPriceByObject;
  });

  totalPrice.textContent = total;
}

//  formulaire.........................................

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => storeForm(e));

function storeForm(e) {
  e.preventDefault();
  if (orderList.length === 0) alert("Votre panier est vide !");
  const form = document.querySelector(".cart__order__form");
  console.log(form.elements);
  const dataForm = dataFormArray();
  //   fetch ("http://localhost:3000/api/products/order",{
  //   method : "POST",
  //      headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  //   },
  //     body: JSON.stringify(dataForm)

  // })
  //     .then((res)=>res.json())
  //     .then((data) => console.log(data))
}

function dataFormArray() {
  const dataOrder = {
    contact: {
      firstName: "a",
      lastName: "b",
      adress: "c",
      city: "d",
      email: "e",
    },
    products: ["998787879809808"],
  };
  return dataOrder;
}

// validation du formulaire.....................................
