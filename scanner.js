var rpi433    = require("rpi-433");
var rfSniffer = rpi433.sniffer({
	pin: 2,                     //Sniff on GPIO 2 (or Physical PIN 13)
	debounceDelay: 500          //Wait 500ms before reading another code
});

console.log("Scanning for 433Mhz codes...");

rfSniffer.on("data", function (data) {
	console.log("Code received: "+data.code);
});
