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

//--------Montant total du Panier------

let prixTotalCalcul = [];

for (k = 0; k < produitLocalStorage.length; k++){
  let prixProduitPanier = produitLocalStorage[k].price
  //--Mise en place des prix dans un tableau pour le total
  prixTotalCalcul.push(prixProduitPanier)
}
//----Addition des prix du tableau avec .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer);
console.log(prixTotal);

//----Html du Total
const affichagePrixTotal = ` <div> Le prix total est de : ${prixTotal} € </div>
`
positionProduit.insertAdjacentHTML("afterend", affichagePrixTotal);


//----------------- Recupération du Formulaire pour mettre dans le local storage-----------------
const btnEnvoiFormulaire = document.querySelector("#btnformulaire");

btnEnvoiFormulaire.addEventListener("click", (e) => {
  e.preventDefault();
  const formulaireValues = {
    Nom : document.querySelector("#validationCustom01").value,
    Prenom: document.querySelector("#validationCustom02").value,
    Adresse: document.querySelector("#validationCustom03").value,
    Ville: document.querySelector("#validationCustom04").value,
    Email: document.querySelector("#validationCustom05").value
  }

  localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues))
  //------ Commande + Formulaire à envoyer
const envoiCommandeServeur = {
  produitLocalStorage,
  formulaireValues
}











