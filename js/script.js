fetch(
  "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parkings-publics-nantes-disponibilites&q=&facet=grp_nom&facet=grp_statut")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var html = "";
    data.records.forEach(function (parking) {
      html += `<h2>${parking.fields.grp_nom}</h2>`;
      html += `<h3>Nombre de places totales : ${parking.fields.grp_exploitation}</h3>`;
      html += `<p>Nombre de places disponibles : ${parking.fields.disponibilite}</p>`;
    });
    document.querySelector("#dataViz").innerHTML = html;
  });

setTimeout(function () {
  location.reload();
}, 120000);
