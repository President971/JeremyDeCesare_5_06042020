main()

    async function main() {
      const articles = await getArticles()
      for (article of articles) {
      displayArticles(article)
     }
    }

    function getArticles() {
      return fetch("http://localhost:3000/api/teddies")
      .then(function (res) {
      return res.json()
      })
      .then(function(articles){
        return articles
      })
      .catch(function(error){
        alert(error)
      })
    }
    function displayArticles(article) {
      const templateElt = document.getElementById("templateArticles")
      const cloneElt = document.importNode(templateElt.content, true)
      cloneElt.getElementById("cardImg").document = article.imageUrl;
      cloneElt.getElementById("cardTitle").textContent = article.name
      cloneElt.getElementById("cardBody").textContent = article.description
      cloneElt.getElementById("cardPanier").href += "?id=" + article._id
    
      document.getElementById("card").appendChild(cloneElt)
    }