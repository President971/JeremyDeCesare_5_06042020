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
}