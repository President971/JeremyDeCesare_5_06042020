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

