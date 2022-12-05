//intialisation des variables de coordonnées
var latitude = 0;
var longitude = 0;
const ctx = document.getElementById('myChart');

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
    var parkingName = "";
    var capaciteMax = "";
    var placeDispo = "";

    let parking = [];
    let dispo = [];
    let max = [];

    //boucle pour parcourir les données
    for (let i = 0; i < data.records.length; i++) {
      //recup des données
      parking.push(data.records[i].record.fields.grp_nom);
      dispo.push(data.records[i].record.fields.disponibilite);
      max.push(data.records[i].record.fields.grp_exploitation);
    }

    console.log(parking);
    console.log(dispo);
    console.log(max);

    //pour le nom du parking
    parkingName = data.records[0].record.fields.grp_nom;

    //recup la capacité maximale
    capaciteMax = data.records[0].record.fields.grp_exploitation;
    //recup le nombre de places dispo
    placeDispo = data.records[0].record.fields.disponibilite;

    placeOccuped = capaciteMax - placeDispo

    //les données sont injectées dans le html
    document.getElementById("nom_parking").innerHTML = parkingName;
    document.getElementById("capacite_max").innerHTML =
      "Capacité maximale : " + capaciteMax;
    document.getElementById("places_dispo").innerHTML =
      "Places disponibles : " + placeDispo;
    
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Places vide', 'Places occupées'],
          datasets: [{
            label: '',
            data: [placeDispo, placeOccuped],
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

    
  //recup les coordonnées GPS du parking
    var parkingAdress = "";
    parkingAdress = data.records[0].record.fields.location;
    //je separe les valeurs du tableau en deux 
    latitude = parkingAdress.lat;
    longitude = parkingAdress.lon;
    //paramètres de la petite map pour l'adresse du parking
    var map = L.map("map").setView([latitude, longitude], 16);
    var marker = L.marker([latitude, longitude]).addTo(map) ;
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

  
    console.log(parkingName);
    console.log(parkingAdress);
    console.log(capaciteMax);
    console.log(placeOccuped);
    console.log(placeDispo);
  });

//le fetch s'actualise toutes les 2 minutes
setTimeout(function () {
  getAdress.reload();
}, 120000);
