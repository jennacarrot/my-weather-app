let now = new Date();
let hour = now.getHours();

function getImage(hour) {
  if (hour < 12) {
    document.querySelector(
      ".background"
    ).style.backgroundImage = `url("images/day.jpg")`;
  } else {
    if (hour > 20) {
      document.querySelector(
        ".background"
      ).style.backgroundImage = `url("images/night.jpg")`;
    } else {
      document.querySelector(
        ".background"
      ).style.backgroundImage = `url("images/dusk.jpg")`;
    }
  }
}

getImage();

let minute = ("0" + now.getMinutes()).slice(-2);

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

function displayForecast() {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
            <div class="weather-forecast-date">Wed</div>
            <img src="" alt="" class="forecastIcon" />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> 20° </span>
              <span class="weather-forecast-temperature-min"> 5° </span>
            </div>
          </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCoords(coordinates) {
  console.log(coordinates);
  let apiKey = "856ea507b57a7ec288937b5bb2dfbef2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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
  windElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;
  console.log(response.data.weather.description);
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = `Description: ${description} `;
  let iconElement = document.querySelector("#mainIcon");
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${description}`);

  getCoords(response.data.coord);

  function changeToCelsius(event) {
    event.preventDefault();
    let temperatureCelsius = document.querySelector(".averageTemp");
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    temperatureCelsius.innerHTML = `${temperature}°C`;
  }

  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", changeToCelsius);

  function changeToFahrenheit(event) {
    let temperatureF = Math.round((temperature * 9.0) / 5.0 + 32.0);
    event.preventDefault();
    let temperatureFahreneit = document.querySelector(".averageTemp");
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    temperatureFahreneit.innerHTML = `${temperatureF}°F`;
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
