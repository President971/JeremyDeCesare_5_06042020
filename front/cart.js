let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitLocalStorage);


//------Endroit ou j'inject le HTML
const positionProduit = document.querySelector("#tableProduit");
const positionTable = document.querySelector("#tableau");
//-------Affichage des produits du Panier----

// Si Panier est vide 
if(produitLocalStorage === null) {
    const panierVide =`<h2>Votre panier est vide. <a href="index.html">Remplissez le d'abord !</a></h2>`;
    positionProduit.innerHTML = panierVide;
    let Table = document.getElementById("tableau");
    Table.remove()
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
    }
      if(j == produitLocalStorage.length)
      positionProduit.innerHTML = produitPanier;

  //---Creation Button vider le Panier si non null  
  const btnClearLocal =`<button type="button" class="btn btn-danger btnclear mt-3">Vider le Panier</button>`;
  positionProduit.insertAdjacentHTML("afterend", btnClearLocal );
  const btnclear = document.querySelector(".btnclear");

  //----Suppression de la Key du local Storage

  btnclear.addEventListener("click", ()=>{
    localStorage.removeItem("produit");
    window.location.href = "cart.html";
  }
  )
}
