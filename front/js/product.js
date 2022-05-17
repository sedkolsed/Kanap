const queryString = window.location.search
console.log (queryString)
const url = new URLSearchParams(queryString)
const productId = url.get("_id")
console.log ({productId})

fetch(`http://localhost:3000/api/products/${productId}`)
.then((response) => response.json() )
.then((res) =>console.table(res))