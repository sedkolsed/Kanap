// requête sur les produits de l'api............................................................
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value);
    canapes(value);
  })
  .catch(function (erreur) {
    console.log("une erreur est survenue");
  });

// affichage de tous les articles..............................................................
function canapes(articles) {
  let products = document.querySelector("#items");

  for (let article of articles) {
    products.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
        <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}
