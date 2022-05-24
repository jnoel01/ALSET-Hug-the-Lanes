// global variables:
var speed = 0;
var rpm = 0;
var longitude = 0;
var latitude = 0;
var btemp = 0;
var otemp = 0;
var clicked = false;
var itemp = 0;
var etemp = 0;
var wspeed = 0;
var humid = 0;
var visib = 0;
var frontProx = 0;
var rearProx = 0;
var blindS = false;
var cruiseStart = 0;
var cruiseSpeed = 0;
var cruiseOn = false;
var leftLineDist = 0;
var rightLineDist = 0;
var whatSignal = "";


function check(form) {
  if (form.userid.value == "mechanic" && form.password.value == "password") {
    window.location.href = "main.html";
  } else {
    alert("Invalid Username or Password.");
  }
}

/*
 * getRandInput: Generates random numbers since we do
 *               not have the sensor input. You may change
 *               the global vairables if you want to test
 *               your own input.
 */

function getRandInput() {
  // Speed: GPS generated speed.
  speed = Math.floor(Math.random() * 100); // speed = <number>
  document.getElementById("carSpeed").innerHTML = speed; // do not change.

  // RPM: Rotations Per Minute on the car wheels
  rpm = Math.floor(Math.random() * 1000); // rpm = <number>
  document.getElementById("rpm").innerHTML = rpm; // do not change.

  // Battery Temp: Battery Temperature of the car.
  btemp = Math.floor(Math.random() * 190); // etemp = <number>
  document.getElementById("batteryTemp").innerHTML = btemp; // do not change.

  // Otemp: Battery Level of the car.
  otemp = Math.floor(Math.random() * 100); // otemp = <number>
  document.getElementById("batteryLevel").innerHTML = otemp; // do not change.

  // ActualSpeed: Calculates the speed from RPM.
  actualSpeed = Math.floor(((2.89 * rpm) / 1609) * 60); // actualSpeed = <number>
  document.getElementById("calcSpeed").innerHTML = actualSpeed; // do not change.

  // External Temp: Outdoor Temperature
  etemp = Math.floor(Math.random() * (90 - 30) + 30); // etemp = <number>
  document.getElementById("externalTemp").innerHTML = etemp; // do not change.

  // Internal Temp: Cabin Temperature of the car.
  itemp = etemp - 10;
  document.getElementById("internalTemp").innerHTML = itemp; // do not change.

  // Wind Speed
  wspeed = Math.floor(Math.random() * 11);
  document.getElementById("windSpeed").innerHTML = wspeed;

  // Humidity
  humid = Math.floor(Math.random() * 100);
  document.getElementById("humidity").innerHTML = humid;

  // visibility
  visib = Math.floor(Math.random() * 100);
  document.getElementById("visibility").innerHTML = visib;

  // Distance between car and object in front
  frontProx = Math.floor(Math.random() * 20);
  document.getElementById("frontDistance").innerHTML = frontProx;

  // Distance between car and object behind
  rearProx = Math.floor(Math.random() * 20);
  document.getElementById("rearDistance").innerHTML = rearProx;

  // Blind Spot yes or no
  blindS = Math.random() < 0.5;
  document.getElementById("blindSpot").innerHTML = blindS;

  // Cruise control on or not
  cruiseOn = Math.random() < 0.5;
  document.getElementById("cruiseControlStatus").innerHTML = cruiseOn;

  // starting speed for cruise control
  if (cruiseOn) {
    cruiseStart = speed;
  } else {cruiseStart = 0}
  document.getElementById("startingSpeed").innerHTML = cruiseStart;

  // Cruising speed
  document.getElementById("cruisingSpeed").innerHTML = cruiseStart;

  // distance from left lane line
  leftLineDist = Math.floor(Math.random() * 30);
  document.getElementById("distanceLeftLine").innerHTML = leftLineDist; // do not change.

  // distance from right lane line
  rightLineDist = Math.floor(Math.random() * 30);
  document.getElementById("distanceRightLine").innerHTML = rightLineDist; // do not change.

  // var redLight = false;
  signIndex = Math.floor(Math.random() * 5);
  if (signIndex == 1){
    whatSignal = "No nearby traffic signal";
    document.getElementById("whatSign").innerHTML = whatSignal;
  }
  if (signIndex == 2){
    whatSignal = "Red Light";
    document.getElementById("whatSign").innerHTML = whatSignal;
  }
  if (signIndex == 3){
    whatSignal = "Stop Sign";
    document.getElementById("whatSign").innerHTML = whatSignal;
  }
  if (signIndex == 4){
    whatSignal = "All Way Stop Sign";
    document.getElementById("whatSign").innerHTML = whatSignal;
  }
  if (signIndex == 5){
    whatSignal = "Yield Sign";
    document.getElementById("whatSign").innerHTML = whatSignal;
  }

  throwWarnings();
  putInTable();
}

function putInTable() {
  let table = document.getElementById("Logs");
  let row = table.insertRow();

  var today = new Date();

  let dateCell = row.insertCell(0);
  dateCell.innerHTML =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();

  let timeCell = row.insertCell(1);
  timeCell.innerHTML =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  let speedCell = row.insertCell(2);
  speedCell.innerHTML = speed;

  let rpmCell = row.insertCell(3);
  rpmCell.innerHTML = rpm;

  let engTCell = row.insertCell(4);
  engTCell.innerHTML = btemp;

  //battery level
  let outTCell = row.insertCell(5);
  outTCell.innerHTML = otemp;

  let itempCell = row.insertCell(6);
  itempCell.innerHTML = itemp;

  let etempCell = row.insertCell(7);
  etemp.innerHTML = etemp;

  let wspeedCell = row.insertCell(8);
  wspeedCell.innerHTML = wspeed;

  let humidCell = row.insertCell(9);
  humidCell.innerHTML = humid;

  let visibCell = row.insertCell(10);
  visibCell.innerHTML = visib;

  let frontProxCell = row.insertCell(11);
  frontProxCell.innerHTML = frontProx;

  let rearProxCell = row.insertCell(12);
  rearProxCell.innerHTML = rearProx;

  let blindSCell = row.insertCell(13);
  blindSCell.innerHTML = blindS;

  let cruiseStartCell = row.insertCell(14);
  cruiseStartCell.innerHTML = cruiseStart;

  let cruiseSpeedCell = row.insertCell(15);
  cruiseSpeedCell.innerHTML = cruiseStart;

  let cruiseOnCell = row.insertCell(16);
  cruiseOnCell.innerHTML = cruiseOn;

  let leftLineCell = row.insertCell(17);
  leftLineCell.innerHTML = leftLineDist;

  let rightLineCell = row.insertCell(18);
  rightLineCell.innerHTML = rightLineDist;

  let whatSignalCell = row.insertCell(19);
  whatSignalCell.innerHTML = whatSignal;

  let condCell = row.insertCell(20);
  condCell.innerHTML = "Admin";
}

function throwWarnings() {
  if (speed < 80) {
    document.getElementById("speedingAlert").innerHTML =
        "SPEED OK";

    document.getElementById("speedingAlert").style.backgroundColor = "green";
    document.getElementById("speedingAlert").style.color = "white";
    document.getElementById("speedingAlert").style.padding =
      "10px 100px 10px 100px";
  }
  if (speed > 80) {
    document.getElementById("speedingAlert").innerHTML =
        "SPEED WARNING";

    document.getElementById("speedingAlert").style.backgroundColor = "yellow";
    document.getElementById("speedingAlert").style.color = "black";
    document.getElementById("speedingAlert").style.padding =
      "10px 100px 10px 100px";
  }
  if (speed > 90) {
      document.getElementById("speedingAlert").innerHTML =
          "SPEEDING";

    document.getElementById("speedingAlert").style.backgroundColor = "red";
    document.getElementById("speedingAlert").style.color = "black";
    document.getElementById("speedingAlert").style.padding =
      "10px 100px 10px 100px";
  }

  if (etemp < 200) {
      document.getElementById("tempAlert").innerHTML =
          "GREEN: NO ALERT, ENGINE OK";

    document.getElementById("tempAlert").style.backgroundColor = "green";
    document.getElementById("tempAlert").style.color = "white";
    document.getElementById("tempAlert").style.padding =
      "10px 100px 10px 100px";
  }
  if (etemp > 200) {
      document.getElementById("tempAlert").innerHTML =
          "YELLOW ALERT ENGINE TMP";

    document.getElementById("tempAlert").style.backgroundColor = "yellow";
    document.getElementById("tempAlert").style.color = "black";
    document.getElementById("tempAlert").style.padding =
      "10px 100px 10px 100px";
  }
  if (etemp > 250) {
      document.getElementById("tempAlert").innerHTML =
          "RED ALERT ENGINE TMP";

    document.getElementById("tempAlert").style.backgroundColor = "red";
    document.getElementById("tempAlert").style.color = "black";
    document.getElementById("tempAlert").style.padding =
      "10px 100px 10px 100px";
  }
  if (whatSignal == "No nearby traffic signal") {
    document.getElementById("signAlert").innerHTML =
        "NO SIGNS";

  document.getElementById("signAlert").style.backgroundColor = "green";
  document.getElementById("signAlert").style.color = "white";
  document.getElementById("signAlert").style.padding =
    "10px 100px 10px 100px";
  }
  if (whatSignal == "Red Light"){
    document.getElementById("signAlert").innerHTML =
        "RED LIGHT";

  document.getElementById("signAlert").style.backgroundColor = "red";
  document.getElementById("signAlert").style.color = "black";
  document.getElementById("signAlert").style.padding =
    "10px 100px 10px 100px";
  }
  if (whatSignal == "Stop Sign"){
    document.getElementById("signAlert").innerHTML =
        "STOP";

  document.getElementById("signAlert").style.backgroundColor = "red";
  document.getElementById("signAlert").style.color = "black";
  document.getElementById("signAlert").style.padding =
    "10px 100px 10px 100px";
  }
  if (whatSignal == "All Way Stop Sign"){
    document.getElementById("signAlert").innerHTML =
        "STOP";

  document.getElementById("signAlert").style.backgroundColor = "red";
  document.getElementById("signAlert").style.color = "black";
  document.getElementById("signAlert").style.padding =
    "10px 100px 10px 100px";
  }
  if (whatSignal == "Yield Sign"){
    document.getElementById("signAlert").innerHTML =
        "YIELD";

  document.getElementById("signAlert").style.backgroundColor = "yellow";
  document.getElementById("signAlert").style.color = "black";
  document.getElementById("signAlert").style.padding =
    "10px 100px 10px 100px";
  }
  if(rpm > 500){
    document.getElementById("tractAlert").innerHTML =
        "TRACTION LOSS";


  document.getElementById("tractAlert").style.backgroundColor = "red";
  document.getElementById("tractAlert").style.color = "black";
  document.getElementById("tractAlert").style.padding =
    "10px 100px 10px 100px";
  }
  else {
    document.getElementById("tractAlert").innerHTML =
        "NO TRACTION LOSS";
    document.getElementById("tractAlert").style.backgroundColor = "green";
    document.getElementById("tractAlert").style.color = "white";
  }
  if(rightLineDist > 45 || leftLineDist >45){
    document.getElementById("driftAlert").innerHTML =
        "DRIFTING";

  document.getElementById("driftAlert").style.backgroundColor = "red";
  document.getElementById("driftAlert").style.color = "black";
  document.getElementById("driftAlert").style.padding =
    "10px 100px 10px 100px";
  }
  if(rightLineDist <= 45 && leftLineDist <=45){
    document.getElementById("driftAlert").innerHTML =
        "NOT DRIFTING";

  document.getElementById("driftAlert").style.backgroundColor = "green";
  document.getElementById("driftAlert").style.color = "white";
  document.getElementById("driftAlert").style.padding =
    "10px 100px 10px 100px";
  }
  if(blindS == 1){
    document.getElementById("blindAlert").innerHTML =
        "OBJECT IN BLINDSPOT";

  document.getElementById("blindAlert").style.backgroundColor = "red";
  document.getElementById("blindAlert").style.color = "black";
  document.getElementById("blindAlert").style.padding =
    "10px 100px 10px 100px";
  }
  if(blindS == 0){
    document.getElementById("blindAlert").innerHTML =
        "NO OBJECT IN BLINDSPOT";

  document.getElementById("blindAlert").style.backgroundColor = "green";
  document.getElementById("blindAlert").style.color = "white";
  document.getElementById("blindAlert").style.padding =
    "10px 100px 10px 100px";
  }
  if(cruiseOn == 0){
    document.getElementById("cruiseAlert").innerHTML =
        "CRUISE OFF";

  document.getElementById("cruiseAlert").style.backgroundColor = "red";
  document.getElementById("cruiseAlert").style.color = "black";
  document.getElementById("cruiseAlert").style.padding =
    "10px 100px 10px 100px";
  }
  if(cruiseOn == 1){
    document.getElementById("cruiseAlert").innerHTML =
        "CRUISE ON";

  document.getElementById("cruiseAlert").style.backgroundColor = "green";
  document.getElementById("cruiseAlert").style.color = "white";
  document.getElementById("cruiseAlert").style.padding =
    "10px 100px 10px 100px";
  }

  let isMoving = Math.floor(Math.random() * 2);
  let objectDist = Math.floor(Math.random() * 50);
  if (isMoving == 1) {
    // object IS moving
    if (objectDist <= 10) {
      document.getElementById("objectAlert").innerHTML =
          "COLLISION";

      document.getElementById("objectAlert").style.backgroundColor = "red";
      document.getElementById("objectAlert").style.color = "black";
    } else if (objectDist <= 30) {
      document.getElementById("objectAlert").innerHTML =
          "OBJECT APPROACHING";

      document.getElementById("objectAlert").style.backgroundColor = "yellow";
      document.getElementById("objectAlert").style.color = "black";
    } else {
      document.getElementById("objectAlert").innerHTML =
          "NO OBJECT";

      document.getElementById("objectAlert").style.backgroundColor = "green";
      document.getElementById("objectAlert").style.color = "white";
    }
  } else {
    // object is NOT moving
    if (objectDist <= 5) {
      document.getElementById("objectAlert").innerHTML =
          "COLLISION";

      document.getElementById("objectAlert").style.backgroundColor = "red";
      document.getElementById("objectAlert").style.color = "black";
    } else if (objectDist <= 10) {
      document.getElementById("objectAlert").innerHTML =
          "OBJECT NEAR";

      document.getElementById("objectAlert").style.backgroundColor = "yellow";
      document.getElementById("objectAlert").style.color = "black";
    } else {
      document.getElementById("objectAlert").innerHTML =
          "NO OBJECT";

      document.getElementById("objectAlert").style.backgroundColor = "green";
      document.getElementById("objectAlert").style.color = "white";
    }
  }
}
