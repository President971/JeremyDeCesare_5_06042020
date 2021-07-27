fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(response => alert(JSON.stringify(response)))
;

