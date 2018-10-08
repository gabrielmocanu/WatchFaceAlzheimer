import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today } from "user-activity";
import * as util from "../common/utils";
import * as messaging from "messaging";
import { HeartRateSensor } from "heart-rate";
import { units } from "user-settings";
import { Accelerometer } from "accelerometer";
import { geolocation } from "geolocation";



var accel = new Accelerometer();



clock.granularity = "minutes";


const Clock = document.getElementById("Clock");
const DateTime = document.getElementById("DateTime");
const Name = document.getElementById("Name");
const DayName = document.getElementById("DayName");
const Emergency = document.getElementById("Emergency");
const Emergency2 = document.getElementById("Emergency2");
const myButton = document.getElementById("myButton");
const Pils_Alert = document.getElementById("Pils_Alert");
const Calling_Alert = document.getElementById("Calling_Alert");
const Box_Alert = document.getElementById("Box_Alert");

    Box_Alert.style.display = "none";

var todayy;
var hours;
var mins;
let hrm = new HeartRateSensor();

console.log("qwe")
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

clock.ontick = (evt) => {
      todayy = evt.date;
      hours = todayy.getHours();
      if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
      } else {
        // 24h format
        hours = util.zeroPad(hours);
      }
      mins = util.zeroPad(todayy.getMinutes());
   
      Clock.text = `${hours}:${mins}`;
  
     let dayName = days[evt.date.getDay()];
  
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
  
  
      //let yearDate = evt.date.getFullYear();
      DateTime.text = `${day}/${month}/${year}`;
      DayName.text = `${dayName}`;
      
      Pils_Alert.style.display = "none";
      if(Number(mins) == 7)
      {
        Pils_Alert.style.display = "inline";
        document.getElementById("faceClock").style.display = "none";
        
          setTimeout(function () {
    document.getElementById("faceClock").style.display = "inline";
    Pils_Alert.style.display = "none";
    }, 10000);
      }
  
  }

Name.text = `I am Michael Harrington`;

Emergency.text = `Emergency - Touch the`;
Emergency2.text = `screen for 5 seconds`;


accel.start();

accel.onreading = function() {

  let x = accel.x;
  let y = accel.y;
  let z = accel.z;
  
  setTimeout(function () {
  
    let x_new = accel.x;
    let y_new = accel.y;
    let z_new = accel.z;

    if(Math.abs(Number(x)) > Math.abs(Number(x_new)) + 14 || Math.abs(Number(y)) > Math.abs(Number(y_new)) + 14 || Math.abs(Number(z)) > Math.abs(Number(z_new)) + 14)
     {
          document.getElementById("faceClock").style.display = "none";
         document.getElementById("callingAlert").style.display = "inline";
          setTimeout(function () {
    document.getElementById("faceClock").style.display = "inline";
    document.getElementById("callingAlert").style.display = "none";
    }, 5000);

     }
    }, 500);
};

Calling_Alert.text = "Calling ...";
  document.getElementById("callingAlert").style.display = "none";


myButton.onclick = function(e)
{
  document.getElementById("callingAlert").style.display = "inline";
  document.getElementById("faceClock").style.display = "none";

  setTimeout(function () {
    document.getElementById("faceClock").style.display = "inline";
    document.getElementById("callingAlert").style.display = "none";
    }, 5000);
}

messaging.peerSocket.onmessage = function(evt) {
  if(evt.data == 1)
  {
    document.getElementById("faceClock").style.display = "none";
    document.getElementById("Box_Alert").style.display = "inline";
          setTimeout(function () {
    document.getElementById("faceClock").style.display = "inline";
    document.getElementById("Box_Alert").style.display = "none";
                }, 5000);
  
    console.log("E prea departe");
  }
                     
  else
  {
    console.log("Nu e prea departe");
  }
}
