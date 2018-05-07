const hostname = window && window.location && window.location.hostname;
let callbackUrl;
let clientId;

if (process.env.NODE_ENV === 'production') {
    callbackUrl = 'https://repo-monitor.herokuapp.com/logincallback/';
    clientId = 'ab2e6e1a339db0fced5e';
} else {
    callbackUrl = 'http://localhost:8000/logincallback/';
    clientId = '1dd8f2d6386da42490b5';
}

export const SCOPE = 'write:repo_hook';
export const CLIENT_ID = clientId;
export const CALLBACK_URL = callbackUrl;