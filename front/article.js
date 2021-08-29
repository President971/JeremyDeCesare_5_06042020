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
 document.getElementById("cardPrice").textContent = article.price /100 + " €"
 document.getElementById('productColor').style.gridTemplateRows = `repeat(${article.colors.length}, 1fr)`

 let colorSelect = document.getElementById("productColor");
 for (let i = 0; i < article.colors.length; i++) {
   let option = document.createElement("option");
   option.innerText = article.colors[i];
   colorSelect.appendChild(option);
}
}

  // Add event listeners on button
  document.getElementById('addToCart').onclick = (event) => {
    event.preventDefault()
    Cart.addProduct(article)
    redirectToShoppingCart(article.name)
  }

  // Get parent element
  const colorsElt = document.getElementById('productColor')

  // Display all colors
  product.colors.forEach((color) => {
    // Get & clone template for one color
    const templateElt = document.getElementById('productColor')
    const cloneElt = document.importNode(templateElt.content, true)

    // Hydrate color clone
    cloneElt.querySelector('div').style.backgroundColor = color

    // Display a new color
    colorsElt.appendChild(cloneElt)
  })

function redirectToShoppingCart(articleName) {
  window.location.href = `${window.location.origin}/cart.html?lastAddedProductName=${articleName}`
}