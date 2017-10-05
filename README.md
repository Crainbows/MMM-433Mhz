# MMM-433Mhz

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Trigger Magic Mirror functions with 433Mhz signals such as garage remote keys or wireless PIR sensors.

## Dependencies

* [WiringPi](http://wiringpi.com/download-and-install/)
* [rpi-433](https://www.npmjs.com/package/rpi-433) (npm)
* [MMM-Remote-Control](https://github.com/Jopyth/MMM-Remote-Control) *optional - see actions configuration for details*

## Installation 

Clone this repository in to the `~/MagicMirror/modules/` directory.

```bash
cd ~/MagicMirror/modules
git clone https://github.com/crainbows/MMM-433Mhz
```
Install the node dependencies.
```bash
cd MMM-433Mhz
npm install
```
Once set up you can identify the code emmitted from your device by connecting your receiver to wiring pin 2 and using the following:

`node ~/MagicMirror/modules/MMM-433Mhz/scanner.js`

This will give you an output similar to below when your device is triggered.
```
Scanning for 433Mhz codes...
Code received: 4781610
```

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-433Mhz',
            config: {
                wiringPin: 2,
                responses: [
                    {code: 4781610, action: "MONITOR", timeout: 300, soft: true}
                ],
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `wiringPin`      | *Required* The data GPIO pin of the Raspberry Pi. Numbered according to the WiringPi Library. [Pinout](https://pinout.xyz/pinout/wiringpi) (Integer)
| `responses`      | *Required* See below for details.


### Responses

| Option           | Description
|----------------- |-----------
| `code`           | *Required* This is the unique code emitted by your 433Mhz device upon activation. (Integer)
| `action`         | *Required* The action to be performed.


### Actions

| Option           | Description                                       | Additional Options
|----------------- |-------------------------------------------------- |-----------
| `MONITOR`        | Switch the display on for a fixed period of time. | `timeout` *Required* (seconds) How long the display should be shown for before hiding again. .<br> `soft` *Required* (Boolean) Soft mode hides the body element and relys on the power saving mode of the monitor. When set to false Hard mode is selected where a notification is sent to MMM-Remote-Control to disable the display output.
| `SHUTDOWN`       | Sends a notification to MMM-Remote-Control to shutdown. | None
| `RESTART`        | Sends a notification to MMM-Remote-Control to RESTART. | None
| `REBOOT`         | Sends a notification to MMM-Remote-Control to REBOOT. | None
| `REFRESH`        | Sends a notification to MMM-Remote-Control to REFRESH. | None


## MIT License

The MIT License (MIT)

Copyright &copy; 2017 Oliver Balmford

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.