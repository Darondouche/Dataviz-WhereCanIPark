//utilisation de fetch pour récup les données de l'API
fetch(
  "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes-disponibilites&q=&facet=grp_nom&facet=grp_statut")
  //fonction asynchrone qui recup une fois que toutes les données sont chargées
  .then(function (response) {
    //return la reponse en format JSON
    return response.json();
  })
  //nouvelle fonction pour traiter les data recupérées 
  .then(function (data) {
    //initialisation de la variable où on affiche les données récupérées 
    var html = "";
    //pour tous les parkings 
    data.records.forEach(function (parking) {
      html += `<h2>${parking.fields.grp_nom}</h2>`;
      html += `<h3>Nombre de places totales : ${parking.fields.grp_exploitation}</h3>`;
      html += `<p>Nombre de places disponibles : ${parking.fields.disponibilite}</p>`;
    });
    //les données sont injectées dans le html 
    document.querySelector("#dataViz").innerHTML = html;
  });

//le fetch s'actualise toutes les 2 minutes 
setTimeout(function () {
  location.reload();
}, 120000);
