const itemsInStorage = localStorage.length;
console.log("il y en a :" ,itemsInStorage) ;
const orderList = [];





for (let i = 0; i < itemsInStorage ; i++ ){
  const item = localStorage.getItem(localStorage.key(i));
  const itemObject = JSON.parse(item);
  orderList.push(itemObject);
  
}
console.log(orderList);

let products = document.querySelector("#cart__items");

for (let article of orderList) {
  
  products.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
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
  </article> `
  
  
}

// écoute sur les changements de quantités

// listenQuantity();

// function listenQuantity (){
//   const changeQuantity = document.querySelector(".itemQuantity");
//   changeQuantity.addEventListener("input" ,  () => updateQuantity());
// }
// function updateQuantity() {
  
  
//   console.log(orderList);
// }

// quantité totale des articles

displayTotalQuantity();

function displayTotalQuantity (){
  let total = 0 ;
  const totalQuantity = document.querySelector ("#totalQuantity");

  orderList.forEach((object)=> {
    const totalQuantityObject = object.quantity  ;
    total += totalQuantityObject;
  })

    totalQuantity.textContent = total;
  
}

// calcul du prix total 
 
displayTotalPrice();

function displayTotalPrice(){
  let total = 0 ;
  const totalPrice = document.querySelector ("#totalPrice");
  
  orderList.forEach((object) => {  
    const totalPriceByObject = object.price * object.quantity;
    total += totalPriceByObject;
    });

    totalPrice.textContent = total ;   
  }

  
  
  