let productList;
let empty = document.querySelector("#cartAndFormContainer");
let productsArray = [];

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

// Boucle sur les éléments du locaStorage qui lance la requête API.................................
loopLocal();
function loopLocal() {
  productList.forEach((element) => displayproducts(element));

  function displayproducts(element) {
    fetch(`http://localhost:3000/api/products/${element.id}`)
      .then((response) => response.json())
      .then((res) => {
        createElement(res, element);
      })
      .catch(function () {
        console.log("une erreur est survenue");
      });
  }
}
// regroupe les constantes et fonctions d'affichage du panier....................................
function createElement(res, element) {
  console.log(element.id);
  const specialId1 = element.id + "_" + element.color;
  const specialId2 = element.id + "__" + element.color;
  const specialId3 = element.id + "___" + element.color;
  console.log(specialId2);
  const id = element.id;
  const image = res.imageUrl;
  const textAlt = res.altTxt;
  const color = element.color;
  const name = res.name;
  const price = res.price;
  const quantity = element.quantity;
  const article = makeArticle(res, element, specialId3);
  const divImage = displayDivImage(image, textAlt);
  displayArticle(article, divImage);
  const cartItemContent = makeCartItemContent(article);
  const cartDescription = makeCartDescription(cartItemContent);
  makeNameH2(name, cartDescription);
  makeColorDescription(color, cartDescription);
  makePriceDescription(price, cartDescription);
  const cartItemSettings = makeCartSettings(cartItemContent);
  const cartSettingsQuantity = makeSettingsQuantity(cartItemSettings);
  makePQuantity(cartSettingsQuantity);
  makeInputQuantity(cartSettingsQuantity, quantity, specialId1);
  quantityListener(id, specialId1, color);
  const divDelete = makeDivDelete(cartItemSettings);
  makeDelete(divDelete, specialId2);
  eraseListener(id, specialId2, color, specialId3);

  console.log(article);
}
// création de la balise <article> ...............................................
function makeArticle(res, element, specialId3) {
  const article = document.createElement("article");
  article.id = specialId3;
  article.classList.add("cart__item");
  article.dataset.id = res._id;
  article.dataset.color = element.color;
  return article;
}
// Insertion de la balise <article> dans le code HTML...................
function displayArticle(article, divImage) {
  document.querySelector("#cart__items").appendChild(article);
  article.appendChild(divImage);
}
// Création de <div class=cart__item__img>...........................................
function displayDivImage(image, textAlt) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");
  displayImage(image, textAlt, div);
  return div;
}
// Création et insertion de l'image du produit...........................................
function displayImage(image, textAlt, div) {
  const img = document.createElement("img");
  img.src = image;
  img.alt = textAlt;
  console.log(textAlt);
  div.appendChild(img);
  return img;
}
// Création et insertion de <div class=cart__item__content>.................................
function makeCartItemContent(article) {
  const divContent = document.createElement("div");
  divContent.classList.add("cart__item__content");
  article.appendChild(divContent);
  return divContent;
}
// Création et insertion de <div class = cart__item__content__description>......................
function makeCartDescription(cartItemContent) {
  const divDescription = document.createElement("div");
  divDescription.classList.add("cart__item__content__description");
  cartItemContent.appendChild(divDescription);
  return divDescription;
}
// Affichage du nom du produit..........................................................
function makeNameH2(name, cartDescription) {
  const articleName = document.createElement("h2");
  articleName.innerHTML = name;
  cartDescription.appendChild(articleName);
}
// Affichage de la couleur du produit..................................................
function makeColorDescription(color, cartDescription) {
  const colorDescription = document.createElement("p");
  colorDescription.innerHTML = color;
  cartDescription.appendChild(colorDescription);
}

// Affichage du prix du produit...................................................
function makePriceDescription(price, cartDescription) {
  const priceDescription = document.createElement("p");
  priceDescription.innerHTML = price + " €";
  cartDescription.appendChild(priceDescription);
}

//  Création et insertion de <div class= cart__item__content__settings>..............................
function makeCartSettings(cartItemContent) {
  const divSettings = document.createElement("div");
  divSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(divSettings);
  return divSettings;
}

// Création et insertion de <div class = cart__item__content__settings__quantity>....................
function makeSettingsQuantity(cartItemSettings) {
  const divQuantity = document.createElement("div");
  divQuantity.classList.add("cart__item__content__settings__quantity");
  cartItemSettings.appendChild(divQuantity);
  return divQuantity;
}
// Création et insertion de <pQuantity>..........................................
function makePQuantity(cartSettingsQuantity) {
  const pQuantity = document.createElement("p");
  pQuantity.innerHTML = "Qté : ";
  cartSettingsQuantity.appendChild(pQuantity);
}
// Création et insertion de l'<input> pour les changements de quantité.....................
function makeInputQuantity(cartSettingsQuantity, quantity, specialId1) {
  const inputQuantity = document.createElement("input");
  inputQuantity.id = specialId1;
  inputQuantity.type = "number";
  inputQuantity.classList.add("itemQuantity");
  inputQuantity.name = "itemQuantity";
  inputQuantity.min = "1";
  inputQuantity.max = "100";
  inputQuantity.value = quantity;
  cartSettingsQuantity.appendChild(inputQuantity);
}
//  Ecoute sur le changement de quantité.....................................................
function quantityListener(id, specialId1, color) {
  let quantityListener = document.getElementById(specialId1);
  quantityListener.addEventListener("click", () =>
    changeQuantity(id, specialId1, color)
  );
}
// Création et insertion de <div class=cart__item__content__settings__delete>..........................
function makeDivDelete(cartItemSettings) {
  const divDelete = document.createElement("div");
  divDelete.classList.add("cart__item__content__settings__delete");
  cartItemSettings.appendChild(divDelete);
  return divDelete;
}
// Création de la balise de suppression d'article...............................................
function makeDelete(divDelete, specialId2) {
  const deleteProduct = document.createElement("p");
  deleteProduct.id = specialId2;
  deleteProduct.classList.add("deleteItem");
  deleteProduct.innerHTML = "Supprimer";
  divDelete.appendChild(deleteProduct);
}

// Ecoute sur la suppression d'article..............................................

function eraseListener(id, specialId2, color, specialId3) {
  let eraseListener = document.getElementById(specialId2);
  console.log(eraseListener);
  eraseListener.addEventListener("click", () =>
    eraseObject(id, specialId2, color, specialId3)
  );
}
// ::::::::::::::::::::::::Changement de quantité::::::::::::::::::::::::::::::::
function changeQuantity(id, specialId1, color) {
  const value = document.getElementById(specialId1).value;
  console.log(id, value, color);

  let foundProduct = productList.find((p) => p.id == id && p.color == color);
  if (foundProduct != undefined) {
    foundProduct.quantity = Number(value);
    console.log(foundProduct);

    saveBasket(productList);
    displayTotalQuantity();
    displayTotalPrice();
  }
}
// sauvegarde dans locaStorage.........................................
function saveBasket(newBasket) {
  localStorage.setItem("panierlocal", JSON.stringify(newBasket));
}

// :::::::::::::::::::::::Fonction de suppression d'articles:::::::::::::::::::::::::::::::
function eraseObject(id, specialId2, color, specialId3) {
  let foundProduct = productList.findIndex(
    (p) => p.id == id && p.color == color
  );
  productList.splice(foundProduct, 1);
  console.log(productList);
  deleteArticle(id, color, specialId3);
  checkEmptyList();

  saveBasket(productList);

  displayTotalQuantity();
  displayTotalPrice();
}
// Suppression de l'article de la page..................................................
function deleteArticle(id, color, specialId3) {
  const article = document.getElementById(specialId3);
  console.log(article);
  article.remove();
}
//  Fonction de vérification de l'absence d'article........................................
function checkEmptyList() {
  const listLength = productList.length;
  console.log(listLength);
  if (listLength == 0) {
    clearLocalStorage();
    getBasket();
  }
}
// Fonction de suppression des données du localStorage................................
function clearLocalStorage() {
  const local = window.localStorage;
  local.clear();
}

// boucle sur les éléments de productList................................................
productListLoop();
function productListLoop() {
  for (let element of productList) {
    let productId = element.id;
    getIdLocaleStorage(productId);
  }
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
      })
      .catch(function (erreur) {
        console.log("une erreur est survenue");
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
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      redirectToConfirmation(data);
    })
    .catch(function () {
      console.log("une erreur est survenue");
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
    (formFirstName(), formLastName(), formAddress(), formCity(), formEmail())
  ) {
    return true;
  }
  return;
}

// validation du prénom..........................................................................
let errorMessage = "Caractère(s) non valide(s)";
let errorEmpty = "Ce champ est obligatoire";

function formFirstName() {
  const firstName = document.querySelector("#firstName").value;
  console.log(firstName);
  if (firstName == "") {
    document.querySelector("#firstNameErrorMsg").innerHTML = errorEmpty;
    return true;
  } else if (regexLetters.test(firstName) === false) {
    document.querySelector("#firstNameErrorMsg").innerHTML = errorMessage;
    return true;
  } else {
    document.querySelector("#firstNameErrorMsg").innerHTML = "";
    return false;
  }
}
// validation du nom................................................................
function formLastName() {
  const lastName = document.querySelector("#lastName").value;
  if (lastName == "") {
    document.querySelector("#lastNameErrorMsg").innerHTML = errorEmpty;
    return true;
  } else if (regexLetters.test(lastName) === false) {
    document.querySelector("#lastNameErrorMsg").innerHTML = errorMessage;
    return true;
  } else {
    document.querySelector("#lastNameErrorMsg").innerHTML = "";
    return false;
  }
}
// validation de l'adresse...........................................................
function formAddress() {
  const address = document.querySelector("#address").value;
  if (address == "") {
    document.querySelector("#addressErrorMsg").innerHTML = errorEmpty;
    return true;
  } else if (regexNumbersLetters.test(address) === false) {
    document.querySelector("#addressErrorMsg").innerHTML = errorMessage;
    return true;
  } else {
    document.querySelector("#addressErrorMsg").innerHTML = "";
    return false;
  }
}
// validation de la ville........................................................
function formCity() {
  const city = document.querySelector("#city").value;
  if (city == "") {
    document.querySelector("#cityErrorMsg").innerHTML = errorEmpty;
    return true;
  } else if (regexLetters.test(city) === false) {
    document.querySelector("#cityErrorMsg").innerHTML = errorMessage;
    return true;
  } else {
    document.querySelector("#cityErrorMsg").innerHTML = "";
    return false;
  }
}
// validation de l'email.............................................................
function formEmail() {
  const email = document.querySelector("#email").value;
  if (email == "") {
    document.querySelector("#emailErrorMsg").innerHTML = errorEmpty;
    return true;
  } else if (regexEmail.test(email) === false) {
    document.querySelector("#emailErrorMsg").innerHTML = errorMessage;
    return true;
  } else {
    document.querySelector("#emailErrorMsg").innerHTML = "";
    return false;
  }
}
// redirection vers la page de confirmation avec le nuréro de commande......................................
function redirectToConfirmation(data) {
  const orderId = data.orderId;
  window.location.href = "confirmation.html" + "?orderId=" + orderId;
}
