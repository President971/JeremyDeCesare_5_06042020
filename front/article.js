(async function () {
    const articleId = getArticleId()
    const article = await getArticle(articleId)
    console.log(article)
    hydrateArticle(article)
})()

function getArticleId() {
    return new URL(location.href).searchParams.get("id")
}

function getArticle(articleId) {
    return fetch(`http://localhost:3000/api/teddies/${articleId}`)
    .then(function (res) {
    return res.json()
    })
    .catch(function(error){
      alert(error)
    })
}

function hydrateArticle(article){
 document.getElementById("cardImg").src = article.imageUrl;
 document.getElementById("cardTitle").textContent = article.name
 document.getElementById("cardBody").textContent = article.description
 document.getElementById("cardPrice").textContent = `${article.price / 100} €`
 document.getElementById('productColor').style.gridTemplateRows = `repeat(${article.colors.length}, 1fr)`

 let colorSelect = document.getElementById("productColor");
 for (let i = 0; i < article.colors.length; i++) {
   let option = document.createElement("option");
   option.innerText = article.colors[i];
   colorSelect.appendChild(option);
}
}
//selection du bouton ajouter au panier et l'ecouter

const btn_envoyerPanier = document.querySelector("#addToCart");

btn_envoyerPanier.addEventListener("click", (event)=>{
  event.preventDefault();
  let produit = {
    productId : new URL(location.href).searchParams.get("id"),
    name: cardTitle.textContent,
    price: cardPrice.textContent,
  }
  ///-----local storage
  ///-- declaration variable ou je met les key et verification si présence de clé dans le local
 let produitLocalStorage = JSON.parse(localStorage.getItem("produitLocalStorage"));
 //---Fenete de confirmation 
 const popupConfirmation = () =>{
   if(window.confirm( `${cardTitle.textContent} à bien été ajouté au panier 
   Aller au Panier OK ou revenir a l'acceuil ANNULER`)){
window.location.href = "cart.html";
   }else{
    window.location.href = "index.html";
   }
 }
 //--- si local pas vide
 if(produitLocalStorage){
  produitLocalStorage.push(produit);
  localStorage.setItem("produitLocalStorage", JSON.stringify(produitLocalStorage))
  popupConfirmation()
 } //---si il n'y pas pas de key dans le local
 else{
  produitLocalStorage = [];
  produitLocalStorage.push(produit);
  localStorage.setItem("produitLocalStorage", JSON.stringify(produitLocalStorage))
  popupConfirmation()
 }
});
