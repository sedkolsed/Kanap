// Récupération de l'id avec urlsearchparams
const queryString = window.location.search;
console.log (queryString);
const url = new URLSearchParams(queryString);
const productId = url.get("_id");
console.log ({productId});

// variables pour localStorage
let priceArticle = 0;
let altenativeTxt = "";
let imgUrl = "";
let nameArticle = "";

// requête sur l'id du produit et appel de la fonction productData
fetch(`http://localhost:3000/api/products/${productId}`)
.then((response) => response.json() )
.then((res) => {
                console.table(res);
                productData(res);
            }
)

// création de la fonction productData
function productData (kanap){
    // const {altTxt, imageUrl, colors, _id, name, price, description} = kanap
    const imageUrl =  kanap.imageUrl;
    const altTxt = kanap.altTxt;
    const colors = kanap.colors; 
    const name = kanap.name;
    const price = kanap.price;
    const description = kanap.description;
    priceArticle = price;
    altenativeTxt = altTxt;
    imgUrl = imageUrl ;
    nameArticle = name ;
    imageKanap ( imageUrl, altTxt);
    nameKanap(name);
    priceKanap(price);
    descriptionKanap(description);
    colorsKanap(colors);
    
}

// fonctions d'affichage du produit
function imageKanap (imageUrl, altTxt){
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altTxt;
    const item__img = document.querySelector(".item__img");
    item__img.appendChild(img);
}

function nameKanap(name){
    document.querySelector ("#title").innerHTML= name;
}
function priceKanap(price){
    document.querySelector ("#price").innerHTML=price;
}
function descriptionKanap(description){
    document.querySelector ("#description").innerHTML=description;

}
function colorsKanap(colors){
    const select = document.querySelector ("#colors");
     colors.forEach(element => {
         const option = document.createElement ("option");
         option.value = element;
         option.innerHTML =element;
         select.appendChild(option);       
    });
} 

// Section bouton panier

// Validation couleur et quantité
const addBasket = document.querySelector("#addToCart");
if (addBasket != null) {
addBasket.addEventListener("click", (e)=> {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    if(color == null || color === "" ){
        alert("Selectionnez une couleur !");
        return;
    }
    if(quantity == null || quantity == 0 ){
        alert("Selectionnez une quantité !");
        return;
    }
    // Valeurs à stocker sur localStorage
    const key = `${productId}-${color}`;
    const localData = {
        productId : productId ,
        quantity : Number(quantity),
        color :color ,  
        price : priceArticle ,
        altTxt : altenativeTxt,
        imageUrl : imgUrl,
        name : nameArticle ,

    }
    // commande stockage local
    localStorage.setItem(key, JSON.stringify(localData));
    window.location.href="cart.html";
} )
}


