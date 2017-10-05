/* Magic Mirror
 * Node Helper: MMM-433Mhz
 *
 * By Oliver Balmford
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var rpi433    = require("rpi-433");

module.exports = NodeHelper.create({

	initSniffer: function (config) {
		var self = this;

		self.sniffer = new rpi433.sniffer({
			pin: config.wiringPin,
			debounceDelay: 500          //Wait 500ms before reading another code
		});

		console.log("MMM-433Mhz - Sniffer initialized");
		self.startSniffer();
	},

	startSniffer: function() {
		var self = this;

		console.log("MMM-433Mhz - Sniffer Started!");

		self.sniffer.on("data", function (data) {
			console.log("MMM-433Mhz - Received: " + data.code);

			self.sendSocketNotification("433_CODE_RECEIVED", data.code);
		  });
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		console.log(this.name + " received a socket notification: " + notification);
		if(notification === "CONFIG"){
			self.initSniffer(payload);
		}
	},
});
