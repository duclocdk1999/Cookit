import * as navigation from './navigation';


function parseJSON(response) {
  return response.json();
}


let accessToken = '';

export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}


export default function request(url, options) {
  return fetch(url, options)
    .then(parseJSON);
}
