# sector-client

[![Dependencies](https://img.shields.io/david/trygve-lie/sector-client.svg?style=flat-square)](https://david-dm.org/trygve-lie/sector-client)

Node client for Sector Alarm. Checks status and arms / disarms the alarm.

## Installation

```bash
$ npm install sector-client
```

## Examples

Login and show status of alarm:

```js
const Client = require('sector-client');
const client = new Client();

const USERNAME = 'your@email.com';
const PASSWORD = 'your-password';

const example = async () => {
    const login = await client.login(USERNAME, PASSWORD);
    const system = await client.system();
    console.log(system);
};

example();
```


## Description

This is a node.js client to control alarm systems from the scandinavian alarm
company [Sector Alarm](http://www.sectoralarm.no/).

This module lets you log on an alarm system from Sector Alarm and retrieve status
info about the system and run operations on the alarms registered on the user.

To log in and run operations, one do need a users username, password and alarm
panel key. The `username` and `password` are the username and passwords one use to
log on the web control panel at Sector Alarm with. The `key` wanted when arming /
disarmin an system is the key one use to punch in on an systems panel to activate
/ deactivate an alarm.


## Constructor

Create a new Sector Alarm Client instance.

```js
const Client = require('sector-client');
const client = new Client();
```


## API

This module have the following API:

### .login(username, password)

Log in as a user to the alarm one want to control. The method takes your
`username` and `password` as arguments. Returns a `Promise`.

Login must be done before any other methods are called. The login keeps
a token so after one can run any other methods after each other without
re-authenticating.

```js
const client = new Client();
client.login('your-username', 'your-password').then(success => {
    console.log(success);
}).catch(error => {
    console.error(error);
});
```


### .logoff()

Logs the user off. Returns a `Promise`.

```js
client.logoff().then(success => {
    console.log(success);
}).catch(error => {
    console.error(error);
});
```

### .system()

List information about the alarm systems registered on the logged in user.

Its worth noticing that this method will return a list of objects for each
alarm system and in each of these objects hold the `PanelId` which one will
need to run operations on each indivitual alarm system.

Returns a `Promise`.

```js
client.system().then(info => {
    console.log(info);
}).catch(error => {
    console.error(error);
});
```


### .status(panelId)

Get current status of an alarm system. The mathod takes the `panelId` of the
alarm as argument. Returns a `Promise`.

```js
client.status('system-panelId').then(status => {
    console.log(status);
}).catch(error => {
    console.error(error);
});
```


### .history(panelId)

List the history of an alarm system. The mathod takes the `panelId` of the
alarm as argument. Returns a `Promise`.

```js
client.history('system-panelId').then(history => {
    console.log(history);
}).catch(error => {
    console.error(error);
});
```


### .armPartial(panelId, key)

Partially arm an alarm system. The mathod takes the `panelId` and `key` of the
alarm as arguments. Returns a `Promise`.

```js
client.armPartial('system-panelId', 'your-key').then(status => {
    console.log(status);
}).catch(error => {
    console.error(error);
});
```


### .disarm(panelId, key)

Disarms an alarm system. The mathod takes the `panelId` and `key` of the
alarm as arguments. Returns a `Promise`.

```js
client.disarm('system-panelId', 'your-key').then(status => {
    console.log(status);
}).catch(error => {
    console.error(error);
});
```


## node.js compabillity

This module is written in ES6 and uses some functions only found in node.js 8.2
and newer. This module will not function with older than 8.2 versions of node.js.


## Warning and disclosure

This is __NOT__ an official client from Sector Alarm. This client uses the exact
same http endpoints which their web and mobile apps does. This client was
developed out of looking at these http calls and are imitating these.

Be aware that these endpoints can be changed at any time by Sector Alarm and that
this module can be rendered broken at any time due to this.

Sector Alarm does not currently provide a public API for their alarms and this
is a reverse enginered module using the APIs exposed for their web and mobile
applications. Iow; how we log on here is not optimal from a security perspective.
By using this module one are leaving all credentials needed to arm and disarm
an alarm in clear text in your program. By using this module you are fully aware
of this and take full responsibillity for your own security.

If your credential to your alarm are compromised due to using this module, your
do hold full responsibillity of this yourself. I hold no responsibillity for your
usage of this module.


## Dear Sector Alarm

First of all; I have to say that I am pretty happy with your service. You do provide
a good alarm service in my mind.

My home consist of now a pretty big smarthouse setup which include a lot of different
components and misc systems. This module was made to solve a wish I have in my
smarthouse set up. Its a huge hack to be honest and I'm pretty sure this is not the
way you would like to see others integrate with you.

So, I have a wish for you: I would love to see a public API for controlling sertain
aspects of your alarms. I would love to see an public API with a proper security model
for server to server authentication and communication and resonable endpoints one can
run programatical operations on.

If you ever want input on such an API I'll be more than happy to provide feedback
on what I would love to see and be able to integrate. If ever such an public API
surface I'll be more then happy to terminate this module...


## License

The MIT License (MIT)

Copyright (c) 2018 - Trygve Lie - post@trygve-lie.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
