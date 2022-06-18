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
// :::::::::::::::::::::::::::::::::::::::::

// ::::::::::::::::::::::::::::::::::::::::

// Affichage dynamique de chaque article de orderList..........................................

let products = document.querySelector("#cart__items");
let productsArray = [];

productListLoop();
// boucle sur les éléments de productList................................................
function productListLoop() {
  for (let element of productList) {
    let specialIdQuantity = element.id + "_" + element.color;
    let specialIdDelete = element.id + element.color;

    console.log(specialIdQuantity);

    let productId = element.id;
    getIdLocaleStorage(productId);
    displayHtml(productId, element, specialIdQuantity, specialIdDelete);
  }
}

function displayHtml(productId, element, specialIdQuantity, specialIdDelete) {
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
    <input type="number" class="itemQuantity" id="${specialIdQuantity}" name="itemQuantity" min="1" max="100" value=${element.quantity}>
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem" id="${specialIdDelete}" >Supprimer</p>
    </div>
    </div>
    </div>
    </article> `;

      listenQuantity(productId, specialIdQuantity);
      eraseItem(productId);
    });
}

// écoute sur les changements de quantités........................................

function listenQuantity(productId, specialIdQuantity) {
  let changeOnQuantity = document.getElementById(specialIdQuantity);
  console.log(changeOnQuantity);

  changeOnQuantity.addEventListener("click", () => updateQuantity(productId));
  function updateQuantity(productId) {
    console.log(changeOnQuantity.value);
    console.log(productId);
  }
}
// let changeQuantity = document.querySelectorAll(".itemQuantity");

// console.log(changeQuantity);

// for (var i = 0; i < changeQuantity.length; i++) {
//   //Dans ton html, donne un id unique à ton élément liste, du genre productId_cpt où cpt est un compteur incrémenté à chaque ajout dans le panier
//   var elem = document.getElementById("productId" + "_" + i);
//   console.log(elem);

//   // elem.addEventListener(
//   //   "click",

//   //   traitement(productId)
//   // );
// }

// changeQuantity.addEventListener("input", console.log(productId));

// });

// function updateQuantity(productId) {
//   console.log(productId);
// }

// suppression des articles....................................................

function eraseItem(productId) {
  let eraseItem = document.querySelectorAll(".deleteItem");
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

// //  formulaire:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const orderButton = document.querySelector("#order");

orderButton.addEventListener("click", (e) => storeForm(e));

// requête fetch POST sur l'API....................................................
function storeForm(e) {
  const dataForm = dataFormArray();
  e.preventDefault();
  if (productList.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  if (wrongForm()) {
    return;
  }
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(dataForm),
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      redirectToConfirmation(data);
      // return console.log(data);
    });
}

// données à envoyer à l'API.............................................
function dataFormArray() {
  const form = document.querySelector(".cart__order__form");

  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  console.log(form.elements);

  const dataOrder = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: productsArray,
  };
  return dataOrder;
}

// recupère les Id dans uns seul array....................................
function getIdLocaleStorage(productId) {
  productsArray.push(productId);
}
console.log(productsArray);
// // validation du formulaire::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// déclarations des regex.........................................................

let regexLetters = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,40}$/i;

let regexNumbersLetters = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;

let regexEmail =
  /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;

// gestion des erreurs du formulaire..................................................

function wrongForm() {
  if (
    formFirstName() |
    formLastName() |
    formAddress() |
    formCity() |
    formEmail()
  ) {
    return true;
  }
  return;
}

// validation du prénom..........................................................................
let errorMessage = "Caractère(s) non valide(s)";

function formFirstName() {
  const firstName = document.querySelector("#firstName").value;
  if (regexLetters.test(firstName) === false) {
    document.querySelector("#firstNameErrorMsg").innerHTML = errorMessage;
    return true;
  } else {
    document.querySelector("#firstNameErrorMsg").innerHTML = "";
  }
}
// validation du nom................................................................
function formLastName() {
  const lastName = document.querySelector("#lastName").value;
  if (regexLetters.test(lastName) === false) {
    document.querySelector("#lastNameErrorMsg").innerHTML = errorMessage;
    return true;
  } else {
    document.querySelector("#lastNameErrorMsg").innerHTML = "";
  }
}
// validation de l'adresse...........................................................
function formAddress() {
  const address = document.querySelector("#address").value;
  if (regexNumbersLetters.test(address) === false) {
    document.querySelector("#addressErrorMsg").innerHTML = errorMessage;
    return true;
  } else {
    document.querySelector("#addressErrorMsg").innerHTML = "";
  }
}
// validation de la ville........................................................
function formCity() {
  const city = document.querySelector("#city").value;
  if (regexLetters.test(city) === false) {
    document.querySelector("#cityErrorMsg").innerHTML = errorMessage;
    return true;
  } else {
    document.querySelector("#cityErrorMsg").innerHTML = "";
  }
}
// validation de l'email.............................................................
function formEmail() {
  const email = document.querySelector("#email").value;
  if (regexEmail.test(email) === false) {
    document.querySelector("#emailErrorMsg").innerHTML = errorMessage;
    return true;
  } else {
    document.querySelector("#emailErrorMsg").innerHTML = "";
  }
}
// redirection vers la page de confirmation avec le nuréro de commande......................................
function redirectToConfirmation(data) {
  const orderId = data.orderId;
  window.location.href = "confirmation.html" + "?orderId=" + orderId;
}
