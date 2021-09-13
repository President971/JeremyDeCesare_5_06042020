let produitLocalStorage = JSON.parse(
  localStorage.getItem("produitLocalStorage")
);

//------Endroit ou j'inject le HTML
const positionProduit = document.querySelector("#tableProduit");
const positionTable = document.querySelector("#tableau");
//-------Affichage des produits du Panier----

// Si Panier est vide

if (produitLocalStorage === null) {
  const panierVide = `<h2>Votre panier est vide. <a href="index.html">Remplissez le d'abord !</a></h2>`;
  positionProduit.innerHTML = panierVide;
  let Table = document.getElementById("tableau");
  Table.remove();
} else {
  ///si le panier est pas vide
  let produitPanier = [];

  for (j = 0; j < produitLocalStorage.length; j++) {
    produitPanier =
      produitPanier +
      `          
        <tr>
        <td>${produitLocalStorage[j].name} </td>
        <td>${produitLocalStorage[j].price}</td>
        </tr>
      `;
  }
  if (j == produitLocalStorage.length)
    positionProduit.innerHTML = produitPanier;

  //---Creation Button vider le Panier si non null
  const btnClearLocal = `<button type="button" class="btn btn-danger btnclear mt-3">Vider le Panier</button>`;
  positionProduit.insertAdjacentHTML("afterend", btnClearLocal);
  const btnclear = document.querySelector(".btnclear");

  //----Suppression de la Key du local Storage

  btnclear.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "cart.html";
  });
}

//--------Montant total du Panier------
let prixTotalCalcul = [];
for (k = 0; k < produitLocalStorage.length; k++) {
  let prixProduitPanier = parseFloat(produitLocalStorage[k].price);
  //--Mise en place des prix dans un tableau pour le total
  prixTotalCalcul.push(prixProduitPanier);
}

//----Addition des prix du tableau avec .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer);

localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

//----Html du Total
const affichagePrixTotal = ` <div> Le prix total est de : ${prixTotal} € </div>
`;
positionProduit.insertAdjacentHTML("afterend", affichagePrixTotal);

  //----------------- Recupération du Formulaire pour mettre dans le local storage-----------------
const btnEnvoiFormulaire = document.querySelector("#btnformulaire");
btnEnvoiFormulaire.addEventListener("click", (e) => {
  e.preventDefault();
  const contact = {
    firstName: document.querySelector("#validationCustom01").value,
    lastName: document.querySelector("#validationCustom02").value,
    address: document.querySelector("#validationCustom03").value,
    city: document.querySelector("#validationCustom04").value,
    email: document.querySelector("#validationCustom05").value,
  };

  const textAlert = (value) => {
    return `${value} \n Chiffre et symbole ne sont pas autorisé \n Minimum 3 caractères et maximum 20 caractères`;
  };
  const regexNomPrenomVille = (value) => {
    return /^[A-Z a-z]{3,20}$/.test(value);
  };
  const regexAdresse = (value) => {
    return /^[0-9 A-Z  a-z]{1,100}$/.test(value);
  };
  const regexEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,20}$/.test(value);
  };
  //---------------Controle Validation du Formulaire
  function nomControle() {
    const leNom = contact.firstName;
    if (regexNomPrenomVille(leNom)) {
      return true;
    } else {
      alert(textAlert(" Problème avec votre Nom"));
      return false;
    }
  }

  function prenomControle() {
    const lePrenom = contact.lastName;
    if (regexNomPrenomVille(lePrenom)) {
      return true;
    } else {
      alert(textAlert(" Problème avec votre Prenom"));
      return false;
    }
  }

  function villeControle() {
    const laVille = contact.city;
    if (regexNomPrenomVille(laVille)) {
      return true;
    } else {
      alert(textAlert(" Problème avec votre Ville"));
      return false;
    }
  }

  function adresseControle() {
    const lAdresse = contact.address;
    if (regexAdresse(lAdresse)) {
      return true;
    } else {
      alert(
        " Problème avec votre Adresse \n Ne pas mettre de caractère spéciaux"
      );
      return false;
    }
  }

  function emailControle() {
    const lEmail = contact.email;
    if (regexEmail(lEmail)) {
      return true;
    } else {
      alert(" Problème avec votre Email");
      return false;
    }
  }

  //-----Verification globale avant envoie
  if (
    nomControle() &&
    prenomControle() &&
    villeControle() &&
    adresseControle() &&
    emailControle()
  ) {
    localStorage.setItem("contact", JSON.stringify(contact));

    //------ Commande + Formulaire à envoyer
    let products = [];

    for (l = 0; l < produitLocalStorage.length; l++) {
      products.push(produitLocalStorage[l].productId);
    }
    const envoiCommandeServeur = {
      contact,
      products,
    };
    const envoieServeur = {
      method: "POST",
      body: JSON.stringify(envoiCommandeServeur),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    fetch(`http://localhost:3000/api/teddies/order`, envoieServeur)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        window.location.href = `${window.location.origin}/front/confirmation.html?orderId=${json.orderId}`;
      })
      .catch(() => {
        alert(error);
      });
  } else {
    alert("Veuillez bien remplir le formulaire");
  }
});
