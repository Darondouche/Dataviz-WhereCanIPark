let htmlData = document.querySelector("#dataViz");

//Initialisation of the map
function initializeMap() {
    map = L.map('map').setView([47.218371, -1.553621], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

//Function that take an url, and return the data in json format
async function dataViz(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Function that place marker on a map with the data from the url
async function placeMarkerMap() {
    const data = await dataViz("https://data.nantesmetropole.fr/api/v2/catalog/datasets/244400404_parkings-publics-nantes-disponibilites/records?limit=16&offset=0&timezone=UTC&apikey=3b4c2febcb6bb7c2aee6a640c9d1c025ac14963eef5f6c4f0ecc9fb6");
    console.log(data.records)
    data.records.forEach(element => {
        console.log(element.record.fields.grp_nom);
        var marker = L.marker([element.record.fields.location.lat, element.record.fields.location.lon,]).addTo(map);
        marker.bindPopup(element.record.fields.grp_nom);
    });
    return data;
}

initializeMap()
placeMarkerMap()

// setInterval(function(){
//     map.off();
//     map.remove();
//     initializeMap();
//     placeMarkerMap();
// }, 10000);