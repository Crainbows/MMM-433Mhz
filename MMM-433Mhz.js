/* global Module */

/* Magic Mirror
 * Module: MMM-433Mhz
 *
 * By Oliver Balmford
 * MIT Licensed.
 */


Module.register("MMM-433Mhz", {

	requiresVersion: "2.1.0", // Required version of MagicMirror

	screen: true,

	start: function() {
		var self = this;
		console.log("MMM-433Mhz - Module Started");
		// Send socket notification to establish socket connection
		self.sendSocketNotification("ESTABLISH", "Establish");
		self.sendSocketNotification("CONFIG", self.config);

		// Flag for check if module is loaded
		self.loaded = false;

		// Check if any responses control monitor switching
		// If they do begin the timeout sequence
		let response = self.config.responses.find(o => o.action === "MONITOR");
		if(response){
			self.showScreen(response);
		}
	},

	showScreen: function (response) {
		var self = this;
		self.screen = true;
		var body = document.getElementsByTagName("body")[0];
		

		// Clear the timeout if it has already been set
		if(self.timeoutID){
			clearTimeout(self.timeoutID);
		}

		// Soft mode simply hides the body element using jquery
		// Hard mode switches off HDMI output using MMM-Remote-Control
		if(response.soft){
			// Set timeout for hiding the screen
			self.timeoutID = setTimeout(function () {
				body.style.display = "none";
				
				console.log("MMM-433Mhz - Monitor Soft off");
			},response.timeout * 1000);

			console.log("MMM-433Mhz - Monitor Soft on");
			body.style.display = "block";
		} else {
			// Set timeout for hiding the screen
			self.timeoutID = setTimeout(function () {
				self.sendNotification("REMOTE_ACTION", {action: "MONITOROFF"});
				console.log("MMM-433Mhz - Monitor Hard off");
			},response.timeout * 1000);

			console.log("MMM-433Mhz - Monitor Hard on");
			self.sendNotification("REMOTE_ACTION", {action: "MONITORON"});
		}


	},

	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
		self.loaded = true;
		return wrapper;
	},


	socketNotificationReceived: function(notification, payload) {
		var self = this;

		if (notification === "433_CODE_RECEIVED") {

			let response = self.config.responses.find(o => o.code === payload);

			if(!response){
				console.warn("MMM-433Mhz - No Matching Response found for " + payload);
			}
			else {
				console.log("MMM-433Mhz - Found Matching Response for " + payload);
				switch(response.action){
				case "MONITOR":
					self.showScreen(response);
					break;
				case "SHUTDOWN":
					self.sendNotification("REMOTE_ACTION", {action: "SHUTDOWN"});
					break;
				case "RESTART":
					self.sendNotification("REMOTE_ACTION", {action: "RESTART"});
					break;
				case "REBOOT":
					self.sendNotification("REMOTE_ACTION", {action: "REBOOT"});
					break;
				case "REFRESH":
					self.sendNotification("REMOTE_ACTION", {action: "REFRESH"});
					break;
				default:
					console.error("MMM-433Mhz - Action not supported");
				}
			}
		}
	}
});
