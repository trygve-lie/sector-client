'use strict';

const https = require('https');

const HOST = 'minside.sectoralarm.no';

const _init = Symbol('_init');
const _auth = Symbol('_auth');
const _token = Symbol('_token');

const SectorClient = class SectorClient {
    constructor() {
        this[_token] = '';
    }

    login(username, password) {
        return Promise.resolve()
            .then(this[_init])
            .then((cookie) => {
                return this[_auth](cookie, username, password);
            })
            .then((session) => {
                this[_token] = session;
                return {
                    status: 'OK'
                };
            });
    }

    logoff() {
        const options = {
            host: HOST,
            path: '/user/logoff',
            method: 'GET',
            headers: SectorClient.formHeaders(this[_token]),
        };

        this[_token] = '';

        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                const chunks = [];

                if (response.statusCode !== 302) {
                    reject(new Error('Logoff failed.'));
                }

                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                response.on('end', () => {
                    resolve({
                        status: 'OK'
                    });
                });
            });

            request.on('error', (error) => {
                reject(error);
            });

            request.end();
        });
    }

    system() {
        const options = {
            host: HOST,
            path: '/Panel/GetPanelList',
            method: 'GET',
            headers: SectorClient.jsonHeaders(this[_token]),
        };

        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                const chunks = [];

                if (response.statusCode !== 200) {
                    reject(new Error(`Request failed. Responded with http status ${response.statusCode}`));
                }

                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                response.on('end', () => {
                    const content = Buffer.concat(chunks).toString();
                    try {
                        const obj = JSON.parse(content);
                        resolve(obj);
                    } catch (error) {
                        reject(new Error(`Could not parse response: ${content}`));
                    }
                });
            });

            request.on('error', (error) => {
                reject(error);
            });

            request.end();
        });
    }

    status(panelId) {
        const body = JSON.stringify({
            panelId
        });

        const options = {
            host: HOST,
            path: '/Panel/GetOverview',
            method: 'POST',
            headers: SectorClient.jsonHeaders(this[_token], body),
        };

        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                const chunks = [];

                if (response.statusCode !== 200) {
                    reject(new Error(`Request failed. Responded with http status ${response.statusCode}`));
                }

                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                response.on('end', () => {
                    const content = Buffer.concat(chunks).toString();
                    try {
                        const obj = JSON.parse(content);
                        resolve(obj);
                    } catch (error) {
                        reject(new Error(`Could not parse response: ${content}`));
                    }
                });
            });

            request.on('error', (error) => {
                reject(error);
            });

            request.write(body);
            request.end();
        });
    }

    history(panelId) {
        const options = {
            host: HOST,
            path: `/Panel/GetPanelHistory/${panelId}`,
            method: 'GET',
            headers: SectorClient.jsonHeaders(this[_token]),
        };

        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                const chunks = [];

                if (response.statusCode !== 200) {
                    reject(new Error(`Request failed. Responded with http status ${response.statusCode}`));
                }

                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                response.on('end', () => {
                    const content = Buffer.concat(chunks).toString();
                    try {
                        const obj = JSON.parse(content);
                        resolve(obj);
                    } catch (error) {
                        reject(new Error(`Could not parse response: ${content}`));
                    }
                });
            });

            request.on('error', (error) => {
                reject(error);
            });

            request.end();
        });
    }

    armPartial(panelId, code) {
        const body = JSON.stringify({
            ArmCmd: 'Partial',
            id: panelId,
            HasLocks: false,
            PanelCode: code,
        });

        const options = {
            host: HOST,
            path: '/Panel/ArmPanel',
            method: 'POST',
            headers: SectorClient.jsonHeaders(this[_token], body),
        };

        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                const chunks = [];

                if (response.statusCode !== 200) {
                    reject(new Error(`Request failed. Responded with http status ${response.statusCode}`));
                }

                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                response.on('end', () => {
                    const content = Buffer.concat(chunks).toString();
                    try {
                        const obj = JSON.parse(content);
                        resolve(obj);
                    } catch (error) {
                        reject(new Error(`Could not parse response: ${content}`));
                    }
                });
            });

            request.on('error', (error) => {
                reject(error);
            });

            request.write(body);
            request.end();
        });
    }

    disarm(panelId, code) {
        const body = JSON.stringify({
            ArmCmd: 'Disarm',
            id: panelId,
            HasLocks: false,
            PanelCode: code,
        });

        const options = {
            host: HOST,
            path: '/Panel/ArmPanel',
            method: 'POST',
            headers: SectorClient.jsonHeaders(this[_token], body),
        };

        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                const chunks = [];

                if (response.statusCode !== 200) {
                    reject(new Error(`Request failed. Responded with http status ${response.statusCode}`));
                }

                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                response.on('end', () => {
                    const content = Buffer.concat(chunks).toString();
                    try {
                        const obj = JSON.parse(content);
                        resolve(obj);
                    } catch (error) {
                        reject(new Error(`Could not parse response: ${content}`));
                    }
                });
            });

            request.on('error', (error) => {
                reject(error);
            });

            request.write(body);
            request.end();
        });
    }

    [_init]() {
        const options = {
            host: HOST,
            path: '/User/Login',
            method: 'HEAD'
        };

        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                resolve(response.headers['set-cookie']);
            });

            request.on('error', (error) => {
                reject(error);
            });

            request.end();
        });
    }

    [_auth](cookie, username, password) {
        const token = cookie[0].slice(cookie[0].indexOf('=') + 1, cookie[0].indexOf(';'));
        const body = `userID=${username}&password=${password}&__RequestVerificationToken=${token}`;

        const options = {
            host: HOST,
            path: '/User/Login?ReturnUrl=%2f',
            method: 'POST',
            headers: SectorClient.formHeaders(cookie, body),
        };

        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                const chunks = [];

                if (response.statusCode !== 302) {
                    reject(new Error('Login failed.'));
                }

                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                response.on('end', () => {
                    resolve(response.headers['set-cookie']);
                });
            });

            request.on('error', (error) => {
                reject(error);
            });

            request.write(body);
            request.end();
        });
    }

    static formHeaders(cookie, body = '') {
        return {
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,sv;q=0.8',
            'Cache-Control': 'max-age=0',
            Connection: 'keep-alive',
            Cookie: cookie,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(body),
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36',
        };
    }

    static jsonHeaders(cookie, body = '') {
        return {
            Accept: 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,sv;q=0.8',
            'Cache-Control': 'max-age=0',
            Connection: 'keep-alive',
            Cookie: cookie,
            'Content-Type': 'application/json;charset=UTF-8',
            'Content-Length': Buffer.byteLength(body),
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36',
        };
    }
};

module.exports = SectorClient;
