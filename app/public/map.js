

let map, heatmap,landMineData,pointArray;

function dataFiller(coord){
  pointArray.push(new google.maps.LatLng(coord.lat,coord.lng));
}

function onResponse(response){
  return response.text();
}

function processSubmit(){
  console.log("woof");
  const fetchOptions = {
    method: "POST",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newPoint)
  }
  fetch("http://localhost:3000/newpoint",fetchOptions)
  .then(onResponse);
}

function pointLoader(){

  fetch("../JSON/landMineData.json")
  .then(function(response){
        return response.json()
  })
  .then(function(coords){
    for(let coord of coords)
    dataFiller(coord);
  })
  pointArray = new google.maps.MVCArray();
}


async function initMap() {
  pointLoader();
  const submitButton = document.getElementById("submit");
  const infoWindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("heatmap"), {
    zoom: 7,
    center: { lat: 12.5657, lng: 104.9910 },
    mapId : "addMap"
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    radius: 40,
    data: pointArray,
    map: map,
  });
}

window.initMap = initMap;