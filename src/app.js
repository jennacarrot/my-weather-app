let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();

let time = document.querySelector(".time");

time.innerHTML = `${hour}:${minute}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let year = now.getFullYear();

let date = now.getDate();

let fullDate = document.querySelector(".date");

fullDate.innerHTML = `${day} ${date} ${month} ${year}`;

function showWeather(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".averageTemp");
  temperatureElement.innerHTML = `${temperature}C°`;
  console.log(response.data.main.pressure);
  let pressure = response.data.main.pressure;
  let pressureElement = document.querySelector(".pressure");
  pressureElement.innerHTML = `Pressure: ${pressure}`;
  console.log(response.data.main.humidity);
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  console.log(response.data.wind.speed);
  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `Wind Speed: ${windSpeed} mph`;
  console.log(response.data.weather.description);
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = `Description: ${description} `;
  let icon = response.data.weather.icon;
  let iconElement = document.querySelector(".mainIcon");

  function changeToCelsius(event) {
    event.preventDefault();
    let temperatureCelsius = document.querySelector(".averageTemp");
    temperatureCelsius.innerHTML = `${temperature}`;
  }

  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", changeToCelsius);

  function changeToFahrenheit(event) {
    let temperatureF = (temperature * 9.0) / 5.0 + 32.0;
    event.preventDefault();
    let temperatureFahreneit = document.querySelector(".averageTemp");
    temperatureFahreneit.innerHTML = `${temperatureF}F°`;
  }

  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", changeToFahrenheit);
}

function citySearch(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city");
  let newCityName = document.querySelector(".city");
  if (newCity.value) {
    newCityName.innerHTML = `${newCity.value}`;
    let apiKey = "856ea507b57a7ec288937b5bb2dfbef2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  } else {
    newCityName.innerHTML = "Please type a city below.";
  }
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", citySearch);

function findPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "856ea507b57a7ec288937b5bb2dfbef2";
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlLocation).then(getCurrentPosition);
}

function getCurrentPosition(response) {
  console.log(response.data.main.temp);
  let temperatureAlert = Math.round(response.data.main.temp);
  console.log(temperatureAlert);
  alert(`It is ${temperatureAlert}°C at your current location `);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}

let currentLocation = document.querySelector(".button");
currentLocation.addEventListener("click", getLocation);
