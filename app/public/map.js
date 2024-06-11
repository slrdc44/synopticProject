

let map, heatmap,landMineData,pointArray,marker;

const country = "Cambodia"

function dataFiller(coord){
  pointArray.push(new google.maps.LatLng(coord.lat,coord.lng));
}

function onResponse(response){
  return response.text();
}


const newPoint ={
  lat : null,
  lng : null
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

async function checkCountry(){
  var check = false;
  geocoder = new google.maps.Geocoder();
  await geocoder.geocode({location: newPoint})
  .then((response) =>{
    for(i = 0; response.results.length > i; i++){
      console.log(response.results[i]);
      result = response.results[i];
      if (result.formatted_address.includes(country)){
        check = true;
        break;
      }
      else{
        i++;
      }
    }
  })
  return check;
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

  submitButton.addEventListener("click", async =>{
    const email = document.getElementById("email").value;
    console.log(email);
    if(email.includes("@")){
      if(newPoint.lat != null){
        if(marker.getMap() != null){
          processSubmit();
          marker.setMap(null);
        }
        else{
          window.alert("You have already placed a marker!")
        }
      }
      else{
        window.alert("You haven't given a location!")
      }
    }
    else{
      window.alert("Not a valid email format!");
    }
  });

  map.addListener("click", async (e) => {
    addedPosition = e.latLng.toString();
    addedPosition = addedPosition.replace(/[()]/g,"");
    separatedPositions = addedPosition.split(",");
    console.log(separatedPositions);
    newPoint.lat = eval(separatedPositions[0]);
    newPoint.lng = eval(separatedPositions[1]);
    isCountry =  await checkCountry();
    console.log(isCountry);
    if (isCountry == true){
      placeMarkerAndPanTo(e.latLng, map);
    }
    else{
      console.log("neenurr");
      window.alert("Not in Cambodia!");
    }
  });


}

function placeMarkerAndPanTo(latLng, map) {
  if ( marker ) {
    marker.setPosition(latLng);
  } else {
    marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
  map.panTo(latLng);
}






  




window.initMap = initMap;