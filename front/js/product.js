const queryString = window.location.search;
console.log (queryString);
const url = new URLSearchParams(queryString);
const productId = url.get("_id");
console.log ({productId});

fetch(`http://localhost:3000/api/products/${productId}`)
.then((response) => response.json() )
.then((res) => {
                console.table(res);
                productData(res);
            }
)



function productData (kanap){
    // const {altTxt, imageUrl, colors, _id, name, price, description} = kanap
    const imageUrl =  kanap.imageUrl;
    const altTxt = kanap.altTxt;
    const colors = kanap.colors; 
    const name = kanap.name;
    const price = kanap.price;
    const description = kanap.description;
    imageKanap ( imageUrl, altTxt);
    nameKanap(name);
    priceKanap(price);
    descriptionKanap(description);
    colorsKanap(colors);

}

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


