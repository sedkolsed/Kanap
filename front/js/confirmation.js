const orderId = getOrderId();
diplayOrderId();
clearLocalStorage();

// Récupération de l'id de la commande avec urlsearchparams............................................
function getOrderId() {
  const queryString = window.location.search;
  const url = new URLSearchParams(queryString);
  const orderId = url.get("orderId");
  console.log(orderId);
  return orderId;
}

// affichage du numéro de commande.................................................................
function diplayOrderId() {
  document.querySelector("#orderId").innerHTML = orderId;
}

// suppression des éléments de localStorage...................................................
function clearLocalStorage() {
  const local = window.localStorage;
  local.clear();
}
