//utilisation de fetch pour récup les données de l'API
fetch(
  "https://data.nantesmetropole.fr/api/v2/catalog/datasets/244400404_parkings-publics-nantes-disponibilites/records?limit=31&offset=0&timezone=UTC&apikey=3b4c2febcb6bb7c2aee6a640c9d1c025ac14963eef5f6c4f0ecc9fb6"
)
  //fonction asynchrone qui recup une fois que toutes les données sont chargées
  .then(function (response) {
    //return la reponse en format JSON
    return response.json();
  })

  //nouvelle fonction pour traiter les data recupérées
  .then(function getAdress(data) {
    //initialisation des variables de stockage des données
    let dictPark = {};

    //boucle pour parcourir les données
    for (let i = 0; i < data.records.length; i++) {
      //recup des données dans un dictionnaire
      let nameString = data.records[i].record.fields.grp_nom;
      nameString = nameString.replace(/ /g, "_");

      dictPark[i] = {
        name: nameString,
        nameDisplay: data.records[i].record.fields.grp_nom,
        location: data.records[i].record.fields.location,
        dispo: data.records[i].record.fields.disponibilite,
        max: data.records[i].record.fields.grp_exploitation,
      }
    }
    console.log(dictPark);

    // Creation des blocs pour chaque parking et attribution des données
    for (i in dictPark) {
      console.log(dictPark[i].name)
      let allParking = document.querySelector('.allParking');
      allParking.innerHTML += `
      <div class="bloc">
      <div class="infos_parking">
      <h1 class="parking_name ${dictPark[i].name}">${dictPark[i].nameDisplay}</h1>
      <h3 class="capacite_max ${dictPark[i].max}">Capacité max : ${dictPark[i].max}</h3>
      <h3 class="places_dispo ${dictPark[i].dispo}">Places disponibles : ${dictPark[i].dispo}</h3>
      <div class="map ${dictPark[i].name}"></div>
      </div>
      <div class="graphique">
      <canvas class="myChart ${dictPark[i].name}" width="400" height="400"></canvas>
      </div>
      `
    }

    // Création des graphiques et attribution des données
    for (i in dictPark) {
      let myChart = document.getElementsByClassName(`myChart ${dictPark[i].name}`);
      new Chart(myChart, {
        type: 'doughnut',
        data: {
          labels: ['Places disponibles', 'Places occupées'],
          datasets: [{
            label: '# of Votes',
            data: [dictPark[i].dispo, dictPark[i].max - dictPark[i].dispo],
            backgroundColor: [
              'rgba(0, 255, 0, 0.2)',
              'rgba(255, 0, 0, 0.2)',
            ],
            borderColor: [
              'rgba(0, 255, 0, 1)',
              'rgba(255, 0, 0, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  });


//le fetch s'actualise toutes les 2 minutes
// setTimeout(function () {
//   getAdress.reload();
// }, 120000);
