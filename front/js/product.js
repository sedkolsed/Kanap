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

// création de la fonction productData......................................................
function productData(kanap) {
  const imageUrl = kanap.imageUrl;
  const altTxt = kanap.altTxt;
  const colors = kanap.colors;
  const name = kanap.name;
  const price = kanap.price;
  const description = kanap.description;
  priceArticle = price;
  altenativeTxt = altTxt;
  imgUrl = imageUrl;
  nameArticle = name;
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

// Section bouton panier...................................................
const orderButton = document.querySelector("#addToCart");
const oldBasket = [];
let newBasket = [];
const finalBasket = [];

if (orderButton != null) {
  orderButton.addEventListener("click", (e) => atClick(e));
}

function atClick() {
  alreadyInBasket();

  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (noColorAndQuantity(color, quantity)) return;
  toNewBasket(color, quantity);

  // redirectToCart();
}

function toNewBasket(color, quantity) {
  let id = productId;
  newBasket = [id, color, Number(quantity)];
  id, color, quantity;

  localStorage.setItem(productId, JSON.stringify(newBasket));
}

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
function redirectToCart() {
  window.location.href = "cart.html";
}
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// boucle des objets de localStorage vers oldBasket..............................................
function alreadyInBasket() {
  const itemsInStorage = localStorage.length;
  console.log(itemsInStorage);
  for (let i = 0; i < itemsInStorage; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(item);
    oldBasket.push(itemObject);
    console.log(oldBasket);
  }
}
