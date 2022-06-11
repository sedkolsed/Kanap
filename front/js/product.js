// Récupération de l'id avec urlsearchparams............................................
const queryString = window.location.search;
console.log(queryString);
const url = new URLSearchParams(queryString);
const productId = url.get("_id");
console.log({ productId });

// requête sur l'id du produit et appel de la fonction productData..........................
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    productData(res);
  });

// création de la fonction productData et appel des fonctions d'affichage......................................................
function productData(kanap) {
  const imageUrl = kanap.imageUrl;
  const altTxt = kanap.altTxt;
  const colors = kanap.colors;
  const name = kanap.name;
  const price = kanap.price;
  const description = kanap.description;

  imageKanap(imageUrl, altTxt);
  nameKanap(name);
  priceKanap(price);
  descriptionKanap(description);
  colorsKanap(colors);
}

// fonctions d'affichage du produit.........................................................

function imageKanap(imageUrl, altTxt) {
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = altTxt;
  const item__img = document.querySelector(".item__img");
  item__img.appendChild(img);
}

function nameKanap(name) {
  document.querySelector("#title").innerHTML = name;
}
function priceKanap(price) {
  document.querySelector("#price").innerHTML = price;
}
function descriptionKanap(description) {
  document.querySelector("#description").innerHTML = description;
}
function colorsKanap(colors) {
  const select = document.querySelector("#colors");
  colors.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.innerHTML = element;
    select.appendChild(option);
  });
}
// pointe le bouton "Ajouter au panier" et création de l'event AtClick...............................

const orderButton = document.querySelector("#addToCart");
if (orderButton != null) {
  orderButton.addEventListener("click", (e) => atClick(e));
}

// Section panier::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

let product = {};

// recupère les valeurs de la couleur et de la quantité et gère leur absence avec noColorAndQuantity........................
function atClick() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (noColorAndQuantity(color, quantity)) return;
  newProduct(color, quantity);
  addBasket(product);

  redirectToCart();
}
//  génère un message d'erreur en l'absence de la couleur ou de la quantité et empêche l'ajout au panier.................
function noColorAndQuantity(color, quantity) {
  if (color === "" || color == null) {
    alert("Selectionnez une couleur");
    return true;
  }
  if (quantity == 0 || quantity == null) {
    alert(" Selectionnez une quantité");
    return true;
  }
}
// création du nouvel objet product.............................................................................
function newProduct(color, quantity) {
  product = {
    id: productId,
    color: color,
    quantity: Number(quantity),
  };
}
// redirection vers la page panier.......................................................................
function redirectToCart() {
  window.location.href = "cart.html";
}

// sauvegarde du nouveau panier trié dans le localStorage................................................
function saveBasket(newBasket) {
  newBasket.sort(function compare(a, b) {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    if (a.color < b.color) return -1;
    if (a.color > b.color) return 1;
    return 0;
  });
  localStorage.setItem("panierlocal", JSON.stringify(newBasket));
}
// récupération du panier existant....................................................................
function getBasket() {
  let basket = localStorage.getItem("panierlocal");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}
// ajoute le produit au panier en interrogeant le panier existant......................................
function addBasket(product) {
  let basket = getBasket();
  let foundProduct = basket.find(
    (p) => p.id == product.id && p.color == product.color
  );
  if (foundProduct != undefined) {
    foundProduct.quantity += product.quantity;
  } else {
    basket.push(product);
  }
  saveBasket(basket);
}
