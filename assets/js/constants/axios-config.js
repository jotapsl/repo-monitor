import axios from 'axios';

export function configAxios() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
}