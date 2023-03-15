/*
get location lat and lon with

docs: https://openweathermap.org/api/geocoding-api

http://api.openweathermap.org/geo/1.0/direct?
q={city name},{state code},{country code}&limit={limit}&appid={API key}

*/

/*
get weather data

docs: https://openweathermap.org/current

API Call:
https://api.openweathermap.org/data/2.5/weather?
lat={lat}&lon={lon}&appid={API key}

units can be 'standard' (default), 'metric' (C), 'imperial' (F)

*/

let searchLocation = 'Manly';

const locationInput = document.querySelector('#searchLoc');
const searchIcon = document.querySelector('#search');
searchIcon.addEventListener('click', getSearchLocation);

async function getSearchLocation(event) {
  console.log(locationInput);
  console.log(locationInput.value);
  searchLocation = locationInput.value;
  await getWeather();
  addLocationList();
}

function addLocationList() {
  const selectLocations = document.querySelector('#locations');

  selectLocations.replaceChildren();

  console.log(locationList.length);

  for (let i = 0; i < locationList.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerText = `${locationList[i].name}, ${locationList[i].state}, ${locationList[i].country}, lat: ${locationList[i].lat}, lon: ${locationList[i].lon}`;
    selectLocations.appendChild(option);
  }
}

const locationDropDown = document.querySelector('#locations');
locationDropDown.addEventListener('change', getWeatherForSelection);

function getWeatherForSelection() {
  lat = locationList[locationDropDown.value].lat;
  lon = locationList[locationDropDown.value].lon;
  getWeatherData();
}

const key = 'fa09cc612d5a9e9923765ef4d3397922';

let lat = '';
let lon = '';
let units = 'metric';
let locationList = '';

/* split out geo and weather data */
async function getWeather() {
  await getGeoData();
  getWeatherData();
}

async function getGeoData() {
  // get lat and lon
  const geoResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&limit=5&appid=${key}`,
    {
      mode: 'cors',
    }
  );

  const geoData = await geoResponse.json();

  console.log('log location data:');
  console.log(geoData);
  locationList = geoData;
  console.log(geoData[0].lat, 'lat');
  console.log(geoData[0].lon, 'lon');
  lat = parseFloat(geoData[0].lat);
  lon = parseFloat(geoData[0].lon);
  console.log(lat, 'lat');
  console.log(lon, 'lon');
}

async function getWeatherData() {
  const weatherResponse = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`,
    {
      mode: 'cors',
    }
  );

  const weatherData = await weatherResponse.json();

  console.log('log weather data:');
  console.log(weatherData);
  console.log(weatherData.main.temp, 'metric');
}

/*
async function getWeatherData() {
  // get lat and lon
  const geoResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&limit=5&appid=${key}`,
    {
      mode: 'cors',
    }
  );

  const geoData = await geoResponse.json();

  console.log('log location data:');
  console.log(geoData);
  locationList = geoData;
  console.log(geoData[0].lat, 'lat');
  console.log(geoData[0].lon, 'lon');
  lat = parseFloat(geoData[0].lat);
  lon = parseFloat(geoData[0].lon);
  console.log(lat, 'lat');
  console.log(lon, 'lon');

  const weatherResponse = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`,
    {
      mode: 'cors',
    }
  );

  const weatherData = await weatherResponse.json();

  console.log('log weather data:');
  console.log(weatherData);
  console.log(weatherData.main.temp, 'metric');
}
*/

// getWeatherData();

// promise chaining version

// let lat2 = '';
// let lon2 = '';

function getWeatherDataProm() {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&limit=5&appid=${key}`,
    {
      mode: 'cors',
    }
  )
    .then((resp) => resp.json())
    .then((resp) => {
      console.log('log location data (promise chain):');
      console.log(resp);
      console.log(resp[0].lat);
      console.log(resp[0].lon);
      lat2 = parseFloat(resp[0].lat);
      lon2 = parseFloat(resp[0].lon);
      return [lat2, lon2];
    })
    .then((resp) => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${resp[0]}&lon=${resp[1]}&units=${units}&appid=${key}`,
        {
          mode: 'cors',
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          console.log('log weather data (promise chain):');
          console.log(resp);
          console.log(resp.main.temp, 'metric (promise chain)');
        });
    })
    .catch((err) => console.log(err));
}

// getWeatherDataProm();

/*
const weatherData = fetch(
  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`,
  {
    mode: 'cors',
  }
)
  .then((resp) => resp.json())
  .then((resp) => {
    console.log('log weather data:');
    console.log(resp);
    console.log(resp.main.temp, 'metric');
  });
*/
/*
async function getLocationData() {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&appid=${key}`,
    {
      mode: 'cors',
    }
  )
    .then((resp) => resp.json())
    .then((resp) => {
      console.log('log location data:');
      console.log(resp);
      console.log(resp[0].lat);
      console.log(resp[0].lon);
      lat = parseInt(resp[0].lat);
      lon = parseInt(resp[0].lon);
    });
}
*/
