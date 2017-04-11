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
  displayVisual(requestData);
}
//const API_CALL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&APPID=${API_KEY}`;

const cityInput = document.querySelector('#cityInput');
const inputBtn = document.querySelector('#inputBtn');
const visualForecastDiv = document.querySelector('#visualForecast');

inputBtn.addEventListener('click', () => {
  let cityName = cityInput.value;
  let apiLink = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&APPID=${API_KEY}`;
  createRequest(apiLink, runRequest);
});

function displayVisual(cityData) {
  removeOldForecast();
  for (let i = 0; i < cityData.list.length; i += 8) {
    visualForecastDiv.appendChild(createDailyVisual(cityData, cityData.list[i]));
  }
}

const createDailyVisual = (wholeObj, dayObj) => {
  let dayDiv = document.createElement('div');

  let cityDataName = document.createElement('h1');
  cityDataName.innerHTML = wholeObj.city.name;

  let dateVis = document.createElement('h3');
  dateVis.innerHTML = dayObj.dt_txt;

  let tempVis = document.createElement('h2');
  tempVis.innerHTML = `Temperature: ${(dayObj.main.temp * 9/5 - 459.67).toFixed(2)} &deg F`;

  dayDiv.appendChild(cityDataName);
  dayDiv.appendChild(dateVis);
  dayDiv.appendChild(tempVis);

  return dayDiv;
};

const removeOldForecast = () => {
  while (visualForecastDiv.hasChildNodes()) {
    visualForecastDiv.removeChild(visualForecastDiv.lastChild);
  }
};