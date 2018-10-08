
import { geolocation } from "geolocation";
import * as messaging from "messaging";




console.log("companion executed!")
var ok = true;
var lat;
var long;
var lat_new;
var long_new;
var data = 0;

geolocation.watchPosition(locationSuccess, locationError);

function locationSuccess(position) {
   
  if(ok == true)
  {
   lat = position.coords.latitude;
   long = position.coords.longitude;
   ok = false;
  }
  
  setTimeout(function () {
   if(ok == false)
   {
      lat_new = position.coords.latitude;
      long_new = position.coords.longitude;
     
      var a = Number(lat) - Number(lat_new);
      var b = Number(long) - Number(long_new);
     data = 0;
      if(Math.abs(Number(lat) - Number(lat_new)) > 0.000001 && Math.abs(Number(long) - Number(long_new)) > 0.000001)
      {
        data = 1;
      }
      ok = true;
         sendMessage();

   }
    }, 25000);
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}


messaging.peerSocket.onopen = function() {
  // Ready to send messages
  sendMessage();
}

function sendMessage() {

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}



var url = "http://192.168.30.23:5000/catePastile";

var promise = fetch(url);
console.log("hey!")
promise.then(function(response)
 {
    console.log("Ab");
  
  return response.text();
})


.then(function(response) {
  console.log("A");
  console.log(response.nrPastile);
})


.catch(err => {
  console.log(err);
  console.log("Eroare !");
});

messaging.peerSocket.onopen = function(response) {
  sendMessage(response);
}

function sendMessage(response) {
  
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(response);
  }
}

// [1:22:35 PM]Latitude: 46.52280584796078 Longitude: 24.598576274967165
// [1:25:08 PM]Latitude: 46.522806171821514 Longitude:24.598567929002723