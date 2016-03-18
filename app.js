var optional = require('optional');

var gpio = optional('rpi-gpio'); // optionally includes the rpi-gpio

function updateState(channel, value) {
  if (channel === 11) {
    console.log(value);
  }
}

if (gpio !== null) {
  gpio.on('change', updateState());
  gpio.setup(11, gpio.DIR_IN, gpio.EDGE_BOTH);
} else {
  setInterval(function(){
    updateState(11, Boolean(Math.floor(Math.random()*2)));
  }, 3000);
}
