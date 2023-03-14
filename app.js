const key = 'fa09cc612d5a9e9923765ef4d3397922';

const weatherData = fetch(
  `http://api.openweathermap.org/data/2.5/weather?q=Sydney&units=metric&appid=${key}`,
  {
    mode: 'cors',
  }
)
  .then((resp) => resp.json())
  .then((resp) => {
    console.log(resp.main.temp, 'metric');
  });
