var optional = require('optional');
var Slack = require('node-slack');

var hook_url = "https://hooks.slack.com/services/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"

var slack = new Slack(hook_url);
var gpio = optional('rpi-gpio'); // optionally includes the rpi-gpio

function updateState(channel, value) {
  if (channel === 11) {
    var message = "Someone is here: " + value;
    
    console.log(message);
    slack.send({
      text: message,
      channel: '#foo',
      username: 'Bot'
    });

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
