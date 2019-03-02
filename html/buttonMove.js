var passengerCounter=0;
var passengerMiles=0;
var passengerTotal=0;
var carCarbon=0;
var busCarbon=0;
var stop = 0;
var stopMax = 6;
var stopX = [178,185,172,182,132,78,64];
var stopY = [93,152,280,379,432,432,33];
var distanceStop = [.6,.2,.4,.2,.2,.1,.8];
var pointImg = new Image();
var routeImg = new Image();
var stopImg = new Image();


function loadedPage()
{
  routeImg.src = "greenRoute.png";
  pointImg.src = "point.png";

  loadData();
  renderCounter();
}

pointImg.onload = function()
{
    var c = document.getElementById("canvasPoint");
    var ctx = c.getContext("2d");
    ctx.drawImage(pointImg, stopX[stop]-8, stopY[stop]-8); //we subtract 16 to center image
}

routeImg.onload = function()
{
  var c = document.getElementById("canvasRoute");
  var ctx = c.getContext("2d");
  ctx.drawImage(routeImg,0,0,c.width,c.height);

  stopImg.src = "stop.png";
}

stopImg.onload = function()
{
  var c = document.getElementById("canvasRoute");
  var ctx = c.getContext("2d");

  for(var i=0;i<=stopMax;i++)
  {
    ctx.drawImage(stopImg,stopX[i]-8,stopY[i]-8);
  }
}

function renderCounter(){
  document.getElementById("Count").innerHTML = passengerCounter;
  document.getElementById("students").innerHTML = passengerTotal;
  document.getElementById("carbonDifference").innerHTML = (carCarbon-busCarbon).toFixed(4);

  if(carCarbon-busCarbon>=0)
  {
    var x =document.getElementById("status");
    x.innerHTML = "Good, carbon reduced".bold();
    x.style.color="green";
    document.getElementById("statusMessage").innerHTML = "Good job riding the bus keep it up!";
  }
  else
  {
    var x =document.getElementById("status");
    x.innerHTML = "Bad, gained carbon output".bold();
    x.style.color = "red";
    document.getElementById("statusMessage").innerHTML = "Try riding the bus today! Help reduce your carbon footprint.";
  }

}

function moveStop()
{
  stop++;
  if(stop>stopMax)
    stop=0;

  var c = document.getElementById("canvasPoint");
  var ctx = c.getContext("2d");

  ctx.clearRect(0, 0, c.width, c.height);
  pointImg.src="point.png";

  busCarbon+=(distanceStop[stop]/3.26)*8.887;
  carCarbon+=(distanceStop[stop]/24)*8.887*passengerCounter;

  renderCounter();
}

function saveData()
{
  var jsonOb = {counter: passengerCounter, miles: passengerMiles, stop: stop, bus: busCarbon, car: carCarbon, total: passengerTotal};
  var myJSON = JSON.stringify(jsonOb);
  localStorage.setItem("passengerJSON", myJSON);
}

function loadData()
{
  var text = localStorage.getItem("passengerJSON");
  var obj = JSON.parse(text);
  this.passengerCounter=obj.counter;
  this.passengerMiles=obj.miles;
  this.stop=obj.stop;
  this.busCarbon=obj.bus;
  this.carCarbon=obj.car;
  this.passengerTotal=obj.total;
}

function clearData()
{
  var jsonOb = {counter: 0, miles: 0, stop: 0, bus: 0, car: 0, total: 0};
  var myJSON = JSON.stringify(jsonOb);
  localStorage.setItem("passengerJSON", myJSON);
}

function addPassenger()
{
  passengerCounter++;
  passengerTotal++;
  document.getElementById("Count").innerHTML = passengerCounter;
  document.getElementById("students").innerHTML = passengerTotal;
}

function subractPassenger()
{
  passengerCounter=Math.max(0,passengerCounter-1);
  document.getElementById("Count").innerHTML = passengerCounter;
}
