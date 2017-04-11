/*jshint esversion: 6*/
function createRequest(apiLink, eventListener) {
  const weatherReq = new XMLHttpRequest();
  weatherReq.addEventListener('load', eventListener);
  weatherReq.open('GET', apiLink);
  weatherReq.send();
}

function runRequest() {
  let requestData = JSON.parse(this.responseText);
  console.log(requestData);
}

const API_CALL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&APPID=${API_KEY}`;


createRequest(API_CALL, runRequest);