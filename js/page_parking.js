//intialisation des variables de coordonnées
var latitude = 0;
var longitude = 0;
const ctx = document.getElementById("myChart");

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
    let parking = [];
    let dispo = [];
    let max = [];
    let location = []

    //boucle pour parcourir les données
    for (let i = 0; i < data.records.length; i++) {
      //recup des données
      parking.push(data.records[i].record.fields.grp_nom);
      dispo.push(data.records[i].record.fields.disponibilite);
      max.push(data.records[i].record.fields.grp_exploitation);
      location.push(data.records[i].record.fields.location);

    }

    //Feydeau
    for (let i = 0; i < parking.length; i++) {
      if (parking[i] == "Feydeau") {
        document.getElementById("capacite_max").innerHTML =
          "Capacité maximale : " + max[i];
        document.getElementById("places_dispo").innerHTML =
          "Places disponibles : " + dispo[i];
        parkingAdress = location
        console.log(parkingAdress[i])
        //je separe les valeurs du tableau en deux
        let latitude = parkingAdress[i].lat;
        let longitude = parkingAdress[i].lon
        var map = L.map("map").setView([latitude, longitude], 16);
        var marker = L.marker([latitude, longitude]).addTo(map);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Places vide", "Places occupées"],
            datasets: [
              {
                label: "",
                data: [max[i], dispo[i]],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
      console.log(parking[i])
      console.log(max[i])
      console.log(dispo[i])
    }
  });

//le fetch s'actualise toutes les 2 minutes
setTimeout(function () {
  getAdress.reload();
}, 120000);
