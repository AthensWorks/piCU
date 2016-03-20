var gpio = require('rpi-gpio');

var currentState = false;

function updateState(channel, value) {
  if (channel === 11) {
	  currentState = value;
	  
	  var message = "Someone is here: " + currentState;
	  
	  console.log(message);
  }
}

if (gpio !== null) {
  gpio.on('change', updateState);
  gpio.setup(11, gpio.DIR_IN, gpio.EDGE_BOTH, function() {
	console.log("GPIO channel 11 set up");
  });
}
