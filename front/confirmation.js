//------Affichage de l'ID et du prix total
//fonction en ES6
(() => {
  const orderId =
    new URL(location.href).searchParams.get("orderId") || "ERREUR";
  document.getElementById("commandId").textContent = orderId;
  document.getElementById("prixtotal").textContent =
    localStorage.getItem("prixTotal");
})();

//---Vidage du Local Storage automatique et retour à l'acceuil

const retouracceuil = document.querySelector("#cardAccueil");
retouracceuil.addEventListener("click", () => {
  localStorage.clear();
});
