'use strict';

const Client = require('../');

const client = new Client();

const USERNAME = '<YOUR USERNAME>';
const PASSWORD = '<YOUR PASSWORD>';
const KEY = '<YOUR PIN>';

const example = async () => {
    const login = await client.login(USERNAME, PASSWORD);
    console.log('login was', login.status);

    const system = await client.system();
    console.log('panel id is', system[0].PanelId);

    const armed = await client.armPartial(system[0].PanelId, KEY);
    console.log(armed.panelData.ArmedStatus);

    const logoff = await client.logoff();
    console.log('logoff was', logoff.status);
};

example();
