# HueControlApp

The Hue Control Application is a simple web application for the thrid individual homework of CMU course 49-788 "Mobile Apps for Internet of Things". The app aims to connect and control the Hue lights in local network by accessing and controling via http protocol.

A video demo of the application has been published on my YouTube. It can be reached by [Link].

## Getting Started
First make sure you have your hue kit connected and installed. For help with this please visit the getting started page on [Hue](http://www2.meethue.com/en-gb/about-hue). Or some helpful tutorial introducing ["How to Set Up Your Hue Lights"](https://www.howtogeek.com/247500/how-to-set-up-your-philips-hue-lights/
).

To use this web app, fork or mirror this repository. You also need to do some installation and confuguration.
First, install Mustache, it is a logic-less templates that could render the JSON data into HTML directly.
mustache.js is an implementation of the mustache template system in JavaScript, which is included and has been used in our app.
You can use npm to install,
```bat
$ npm install mustache --save
```
or install with bower,
```bat
$ bower install --save mustache
```
For more information about Mustache, refer https://mustache.github.io/

You also need to have Node.js installed. You can download the recommended version from the official website. https://nodejs.org/en/

## Usage
Find the internal IP address of your bridge. Since our app currently only supports working in local network, you have to find out the internal IP address of the bridge on your network, you could find it by following methods.
1. Use a UPnP discovery app to find Philips hue in your network.
2. Use our broker server discover process by visiting www.meethue.com/api/nupnp
3. Log into your wireless router and look Philips hue up in the DHCP table.
4. Hue App method: Download the official Philips hue app. Connect your phone to the network the hue bridge is on. Start the hue app(iOS described here). Push link connect to the bridge. Use the app to find the bridge and try controlling lights. All working -- Go to the settings menu in the app. Go to My Bridge. Go to Network settings. Switch off the DHCP toggle. The ip address of the bridge will show. Note the ip address, then switch DHCP back on

Once you have got the IP address, assign it to the **host** variable in *server.js*.
```js
var host = 'internal IP address of bridge'
```
Start server using the command.
```bat
$ node server.js
```
Then go to **localhost:8080**. You can start play with your Hue light! Have fun!

## API
The functions that we have in app are supported by our built in APIs. It includes:
### Lights
1. Get light information
You could retrieve the information of all lights in your network, such as if status and brightness of a light.

|Address           |Method            |   Body|
|---------------|---------------------|-------|
| `<IP address>/api/<username>/lights` |`GET`|       |

2. Get grouping information
You could retrieve the information of all groups, such as a light is in the class of "living room" or "Kitchen".

|Address           |Method            |   Body|
|---------------|---------------------|-------|
| `<IP address>/api/<username>/groups` |`GET`|       |

3. Light control
You can interact with the “state” attributes here. By using PUT method, the API could control the light is on by setting the “on” resource to true. It could also control the saturation (intensity) of the colors and the brightness is at its maximum by setting the “sat” and “bri” resources to 254. Finally it could tell the system to set the “hue” (a measure of color) to 10000 points (hue runs from 0 to 65535).

|Address           |Method            |   Body|
|---------------|---------------------|-------|
| `<IP address>/api/<username>/lights/1/state` |`PUT`| `{"on":true, "sat":254, "bri":254,"hue":10000}`      |

### Bridge
1. Create new user
You are able to create a new user with the app. Before creating new user, please push the physical button on the bridge firstly.

|Address                        |Method   |   Body                                      |
|-------------------------------|---------|---------------------------------------------|
| `<IP address>/api/<username>` |`POST`   |  `{"devicetype":"my_hue_app#iphone peter"}` |

2. Authenticate an existing user
You are able to authenticate an existing user. This could be achieved by sending checking the HTTP response to an uploaded username.

|Address           |Method            |   Body|
|---------------|---------------------|-------|
| `<IP address>/api/<username>` |`GET`|       |

For more information about the RESTful interface of Hue, please refer the official webpage of Hue's developer program.  https://www.developers.meethue.com/documentation/getting-started
