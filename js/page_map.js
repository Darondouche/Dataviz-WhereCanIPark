let htmlData = document.querySelector("#dataViz");
var redIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//Function that take an url, and return the data in json format
async function dataViz(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Function that place marker on a map with the data from the url
async function placeMarkerMap() {
    const data = await dataViz("https://data.nantesmetropole.fr/api/v2/catalog/datasets/244400404_parkings-publics-nantes-disponibilites/records?limit=31&offset=0&timezone=UTC&apikey=3b4c2febcb6bb7c2aee6a640c9d1c025ac14963eef5f6c4f0ecc9fb6");
    console.log(data);

    for (let i = 0; i < data.records.length; i++) {
      let placeDispo = data.records[i].record.fields.grp_disponible
      let placeTotal = data.records[i].record.fields.grp_exploitation
      let pourcentage = (placeDispo / placeTotal) * 100
      let location = data.records[i].record.fields.location

      if (location == null) {
        console.log("no location");
        i++;
      } else if (pourcentage >= 50) {
        let marker = L.marker([location.lat, location.lon], {icon: orangeIcon}).addTo(map);
        marker.bindPopup(`<a href = "/"><b>${data.records[i].record.fields.grp_nom}</b></a><br>Places disponibles : ${placeDispo}<br>Places totales : ${placeTotal}`)
      } else if (pourcentage >= 25) {
        let marker = L.marker([location.lat, location.lon], {icon: greenIcon}).addTo(map);
        marker.bindPopup(`<a href = "/"><b>${data.records[i].record.fields.grp_nom}</b></a><br>Places disponibles : ${placeDispo}<br>Places totales : ${placeTotal}`);
      } else {
        let marker = L.marker([location.lat, location.lon], {icon: redIcon}).addTo(map);
        marker.bindPopup(`<a href = "/"><b>${data.records[i].record.fields.grp_nom}</b></a><br>Places disponibles : ${placeDispo}<br>Places totales : ${placeTotal}`);
      }
    }
}

  //Init the map
var map = L.map('map').setView([47.218371, -1.553621], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
  
placeMarkerMap()
  