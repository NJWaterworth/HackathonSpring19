var five = require("johnny-five");
var board = new five.Board();

var data = [];
var bodyCount = -1;
var cases = 6;
var Threshold = 50;
var BaseCase = 600;

function checkPerson(){
	
	var sum = 0;
	
	if(data.length > cases){
		for(let i = 0; i < data.length - 2; i++){
			sum = sum + data[i];
		}
		if(sum/(cases - 1) - data[data.length - 2] > Threshold){
			bodyCount = bodyCount + 1;
			console.log("New Person Found! Total People:" + bodyCount);
			data.splice(0,data.length - 2);
		}
		else
			data.shift();
	}
}

//Set board presets
board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "PING_PULSE_IN",
    pin: 7
  });

  //Catch Change
  proximity.on("change", function() {
	data.push(this.cm);
	checkPerson();
	
	/*
	data.forEach(function(item, index, array){
		console.log("Number: " + item + " index: " +index);
		});*/
	});
});