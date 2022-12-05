let htmlData = document.querySelector("#dataViz");

//Function that take an url, and return the data in json format
async function dataViz(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Function that place marker on a map with the data from the url
async function placeMarkerMap() {
    const data = await dataViz("https://data.nantesmetropole.fr/api/v2/catalog/datasets/244400404_parkings-publics-nantes-disponibilites/records?limit=16&offset=0&timezone=UTC&apikey=3b4c2febcb6bb7c2aee6a640c9d1c025ac14963eef5f6c4f0ecc9fb6");

    //Feydeau marker
    let markerFeydeau = L.marker([47.213742, -1.552136]).addTo(map);
    markerFeydeau.bindPopup("Feydeau");

    //Decré-Bouffay marker
    let markerDecreBouffay = L.marker([47.21666261299998, -1.5540046290000191]).addTo(map);
    markerDecreBouffay.bindPopup("Decré-Bouffay");

    //Tour Bretagne marker
    let markerTourBretagne = L.marker([47.21784288800001, -1.5582500169999776]).addTo(map);
    markerTourBretagne.bindPopup("Tour Bretagne");

    //Aristide Briand marker
    let markerAristideBriand = L.marker([47.21709359800002, -1.5629364160000137]).addTo(map);
    markerAristideBriand.bindPopup("Aristide Briand");

    //Cité des Congrès marker
    let markerCiteDesCongres = L.marker([47.212901665000004, -1.5439712740000004]).addTo(map);
    markerCiteDesCongres.bindPopup("Cité des Congrès");

    //Cathédrale marker
    let markerCathedrale = L.marker([47.22081334400002, -1.5510561649999772]).addTo(map);
    markerCathedrale.bindPopup("Cathédrale");

    //Hôtel Dieu marker
    let markerHotelDieu = L.marker([47.21105707999999, -1.5519831099999806]).addTo(map);
    markerHotelDieu.bindPopup("Hôtel Dieu");

    //Château des Ducs de Bretagne marker
    let markerChateauDesDucsDeBretagne = L.marker([47.216989954999974, -1.547850445999984]).addTo(map);
    markerChateauDesDucsDeBretagne.bindPopup("Château des Ducs de Bretagne");

    //Gare Nord marker
    let markerGareNord = L.marker([47.21668903400001, -1.5449843310000233]).addTo(map);
    markerGareNord.bindPopup("Gare Nord");

    //Gare Sud 4 marker
    let markerGareSud4 = L.marker([47.21510336, -1.5379338930000017]).addTo(map);
    markerGareSud4.bindPopup("Gare Sud 4");

    //Talensac marker
    let markerTalensac = L.marker([47.220255974, -1.5583572969999864]).addTo(map);
    markerTalensac.bindPopup("Talensac");

    //CHU 2 marker
    let markerCHU2 = L.marker([47.20889024799999, -1.55291388400002]).addTo(map);
    markerCHU2.bindPopup("CHU 2");

    //Chantiers Navals marker
    let markerChantiersNavals = L.marker([47.20828931400001, -1.5689156060000187]).addTo(map);
    markerChantiersNavals.bindPopup("Chantiers Navals");

    //Bellamy marker
    let markerBellamy = L.marker([47.222360408999975, -1.5576936900000078]).addTo(map);
    markerBellamy.bindPopup("Bellamy");
}

//Init the map
var map = L.map('map').setView([47.218371, -1.553621], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

placeMarkerMap()
