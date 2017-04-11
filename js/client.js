/*jshint esversion: 6*/

//DOM Elements
const cityInput = document.querySelector('#cityInput');
const inputBtn = document.querySelector('#inputBtn');
const visualForecastDiv = document.querySelector('#visualForecast');
const countryCodes = document.querySelector('#countryCodes');

//Universal Request Function
function createRequest(apiLink, eventListener) {
  const weatherReq = new XMLHttpRequest();
  weatherReq.addEventListener('load', eventListener);
  weatherReq.open('GET', apiLink);
  weatherReq.send();
}
//Function for country codes request
function codeRequest() {
  let codeData = JSON.parse(this.responseText);
  for (let i = 0; i < codeData.length; i++) {
    createCodeOption(codeData[i]);
  }
}
//append country options to select input
const createCodeOption =(codeData) => {
  let eachOption = document.createElement('option');
  eachOption.value = codeData.Code;
  eachOption.innerHTML = codeData.Name;

  countryCodes.appendChild(eachOption);
};

createRequest('http://data.okfn.org/data/core/country-list/r/data.json', codeRequest);

//function for city weather request
function runRequest() {
  let requestData = JSON.parse(this.responseText);
  console.log(requestData);
  displayVisual(requestData);
}

//button Event Listener
inputBtn.addEventListener('click', () => {
  let cityName = cityInput.value;
  let countryAbbr = countryCodes.value;
  console.log(countryAbbr);
  let apiLink = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryAbbr}&APPID=${API_KEY}`;
  createRequest(apiLink, runRequest);
});

//Append 5 Days to forecast Div
const displayVisual = (cityData) => {
  removeOldForecast();
  for (let i = 0; i < cityData.list.length; i += 8) {
    visualForecastDiv.appendChild(createDailyVisual(cityData, cityData.list[i]));
  }
};

//creates div with visual data to show user
const createDailyVisual = (wholeObj, dayObj) => {
  let dayDiv = document.createElement('div');
  dayDiv.className = 'daily-visual';

  let cityDataName = document.createElement('h1');
  cityDataName.innerHTML = wholeObj.city.name;

  let dateVis = document.createElement('h3');
  dateVis.innerHTML = dayObj.dt_txt;

  let weatherVis = document.createElement('h2');
  weatherVis.innerHTML = dayObj.weather[0].description.toUpperCase();

  let tempVis = document.createElement('h2');
  tempVis.innerHTML = `${(dayObj.main.temp * 9/5 - 459.67).toFixed(2)} &deg F`;

  dayDiv.appendChild(cityDataName);
  dayDiv.appendChild(dateVis);
  dayDiv.appendChild(weatherVis);
  dayDiv.appendChild(tempVis);

  return dayDiv;
};

//remove any child nodes on displa\
const removeOldForecast = () => {
  while (visualForecastDiv.hasChildNodes()) {
    visualForecastDiv.removeChild(visualForecastDiv.lastChild);
  }
};
