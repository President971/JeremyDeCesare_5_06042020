let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitLocalStorage);

//-------Affichage des produits du Panier----
//------Endroit ou j'inject le HTML
const positionProduit = document.querySelector("#tableProduit")
// Si Panier est vide 
if(produitLocalStorage === null) {
    const panierVide =`<h2>Votre panier est vide. <a href="index.html">Remplissez le d'abord !</a></h2>`;
    positionProduit.innerHTML = panierVide;
} else {
    ///si le panier est pas vide
    let produitPanier =[];

    for (j = 0; j < produitLocalStorage.length; j++) {
        produitPanier = produitPanier + `          
        <tr>
        <td>${produitLocalStorage[j].name}</td>
        <td>${produitLocalStorage[j].price}</td>
      </tr>
      `;
      if(j == produitLocalStorage.length)
      positionProduit.innerHTML = produitPanier;
    }

}