let productList;
let empty = document.querySelector("#cartAndFormContainer");

// récupération de localStorage et gestion de panier vide.........................................

getBasket();
function getBasket() {
  let basket = localStorage.getItem("panierlocal");
  if (basket == null) {
    empty.innerHTML = `<h1>Votre panier est vide</h1>`;
    return [];
  } else {
    productList = JSON.parse(basket);
  }
}

console.log(productList);

// Affichage dynamique de chaque article de orderList..........................................

let products = document.querySelector("#cart__items");

for (let element of productList) {
  let productId = element.id;

  console.log(productId);

  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => response.json())
    .then((res) => {
      products.innerHTML += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
      <div class="cart__item__img">
      <img src="${res.imageUrl}" alt=${res.altTxt}>
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${res.name}</h2>
      <p>${element.color}</p>
      <p>${res.price} €</p>
      </div>
      <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${element.quantity}>
      </div>
      <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
      </div>
      </div>
      </div>
      </article> `;
      listenQuantity(productId);
      eraseItem(productId);
    });
}

// écoute sur les changements de quantités........................................

function listenQuantity(productId) {
  console.log(productId);
  let changeQuantity = document.querySelectorAll(".itemQuantity");
  console.log(changeQuantity);
  // changeQuantity.addEventListener("input", console.log(productId));

  changeQuantity.forEach((section) => {
    section.addEventListener("input", () => console.log(productId));

    console.log(productId);
  });
}

function updateQuantity(productId) {
  console.log(productId);
}

// suppression des articles....................................................

function eraseItem(productId) {
  const eraseItem = document.querySelectorAll(".deleteItem");
  console.log(eraseItem);
  eraseItem.forEach((section) => {
    section.addEventListener("click", () => eraseObject(productId));
  });
}
function eraseObject(productId) {
  console.log(productId);
}

// quantité totale des articles...............................................

displayTotalQuantity();

function displayTotalQuantity() {
  let total = 0;
  const totalQuantity = document.querySelector("#totalQuantity");

  productList.forEach((object) => {
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

  productList.forEach((object) => {
    fetch(`http://localhost:3000/api/products/${object.id}`)
      .then((response) => response.json())
      .then((res) => {
        const totalPriceByObject = res.price * object.quantity;
        // console.log(res.price);
        total += totalPriceByObject;
        console.log(total);
        totalPrice.textContent = total;
      });
  });
}

// //  formulaire.........................................

const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => storeForm(e));

function storeForm(e) {
  e.preventDefault();
  // if (productList.length === 0) alert("Votre panier est vide !");
  const form = document.querySelector(".cart__order__form");
  console.log(form.elements);
  const dataForm = dataFormArray();
  console.log(dataForm);

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(dataForm),
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function dataFormArray() {
  const dataOrder = {
    contact: {
      firstName: "a",
      lastName: "b",
      address: "c",
      city: "d",
      email: "e",
    },
    products: ["055743915a544fde83cfdfc904935ee7"],
  };
  return dataOrder;
}

// // validation du formulaire.....................................
