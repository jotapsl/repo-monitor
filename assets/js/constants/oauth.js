const hostname = window && window.location && window.location.hostname;
let callbackUrl;
let clientId;

if (hostname === 'localhost') {
    callbackUrl = 'http://localhost:8000/logincallback/';
    clientId = '1dd8f2d6386da42490b5';
} else if (hostname === 'repo-monitor.herokuapp.com') {
    callbackUrl = 'https://repo-monitor.herokuapp.com/logincallback/';
    clientId = 'ab2e6e1a339db0fced5e';
} else {
    throw new Error('Hostname error!');
}

export const SCOPE = 'user repo';
export const CLIENT_ID = clientId;
export const CALLBACK_URL = callbackUrl;