

var stop = 0;
var stopMax = 6;
var stopX = [351,361,340,353,284,204,175];
var stopY = [166,252,441,582,661,659,76];
var pointImg = new Image();
var routeImg = new Image(500, 700);


function loadedPage()
{
  routeImg.src = "greenRoute.png";
  pointImg.src = "point.png";
}

pointImg.onload = function()
{
    var c = document.getElementById("canvasPoint");
    var ctx = c.getContext("2d");
    ctx.drawImage(pointImg, stopX[stop], stopY[stop]);
}

routeImg.onload = function()
{
  var c = document.getElementById("canvasRoute");
  var ctx = c.getContext("2d");
  ctx.drawImage(routeImg, 0, 0);
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
}
