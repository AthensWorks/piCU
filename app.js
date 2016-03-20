var optional = require('optional');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var Slack = require('node-slack');
var gpio = optional('rpi-gpio'); // optionally includes the rpi-gpio

var hook_url = "https://hooks.slack.com/services/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"

// setup
//moment.format();
var slack = new Slack(hook_url);
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var lastSeen = moment(0);

function updateState(channel, value) {
  if (channel === 11) {
	  if (value === true) {
		  lastSeen = moment();
	  }
	  
	  var message = "Someone is here: " + value;
	  
	  console.log(message);
  }
}

if (gpio !== null) {
  gpio.on('change', updateState);
  gpio.setup(11, gpio.DIR_IN, gpio.EDGE_BOTH);
} else {
  setInterval(function() {
    updateState(11, Boolean(Math.floor(Math.random() * 2)));
  }, 3000);
}

app.post('/', function(req, res) {
	console.log("Got hook request.");
	
	var reply = slack.respond(req.body,function(hook) {
        return {
            text: hook.user_name + ': last motion detected ' + lastSeen.fromNow(),
            username: 'Space Bot'
        };

    });

    res.json(reply);
});

var server = app.listen(3000, function() {
	console.log('App listening on port 3000');
});

function cleanup() {
	console.log("Shutting down server.");

	server.close(function () {
		console.log("Exiting.");
		process.exit()
	});	
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('uncaughtException', cleanup);
