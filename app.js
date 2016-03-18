var gpio = require('rpi-gpio');
 

gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
});
gpio.setup(11, gpio.DIR_IN, gpio.EDGE_BOTH);


//gpio.setup(11, gpio.DIR_IN, gpio.EDGE_BOTH, readInput);
 
//function readInput() {
//    gpio.read(11, function(err, value) {
//	if( err !== null ) {
//		console.log(err);
//	}
//       console.log('The value is ' + value);

//	readInput();
//    });
//}

