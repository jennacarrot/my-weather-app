let now = new Date();
let hour = now.getHours();

function getImage(hour) {
  if (hour < 12) {
    document.querySelector(
      ".background"
    ).style.backgroundImage = `url("images/day.jpg")`;
  } else if (hour > 19) {
    document.querySelector(
      ".background"
    ).style.backgroundImage = `url("images/night.jpg")`;
  } else {
    document.querySelector(
      ".background"
    ).style.backgroundImage = `url("images/dusk.jpg")`;
  }
}

getImage(hour);

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

function getForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-main></div>
            <img src="http://openweathermap.org/img/wn/@2x.png" alt="" class="forecastIcon" />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> </span>
              <span class="weather-forecast-temperature-min"></span>
            </div>
          </div>
        </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

getForecast();

function formatCurrentTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayCurrentForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (0 < index && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <div class="weather-forecast-date">${formatCurrentTime(
              forecastDay.dt
            )}</div>
            <div class="weather-forecast-main">${
              forecastDay.weather[0].main
            }</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" class="forecastIcon"  width="42"/>
            
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )} </span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )} </span>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCurrentCoordinates(coordinates) {
  let apiKey = "856ea507b57a7ec288937b5bb2dfbef2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentForecast);
}

function getCurrentPosition(response) {
  let newCity = document.querySelector(".city");
  let cityName = response.name;
  newCity.innerHTML = `${cityName}`;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".averageTemp");
  temperatureElement.innerHTML = `${temperature}°C`;

  let pressure = response.data.main.pressure;
  let pressureElement = document.querySelector(".pressure");
  pressureElement.innerHTML = `Pressure: ${pressure}`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;

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

  getCurrentCoordinates(response.data.coord);
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

function findPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "856ea507b57a7ec288937b5bb2dfbef2";
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlLocation).then(getCurrentPosition);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(findPosition);
}

getLocation();

function formatTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (0 < index && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <div class="weather-forecast-date">${formatTime(
              forecastDay.dt
            )}</div>
            <div class="weather-forecast-main">${
              forecastDay.weather[0].main
            }</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" class="forecastIcon"  width="42"/>
            
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> ${Math.round(
                forecastDay.temp.max
              )} </span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )} </span>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCoords(coordinates) {
  let apiKey = "856ea507b57a7ec288937b5bb2dfbef2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".averageTemp");
  temperatureElement.innerHTML = `${temperature}°C`;

  let pressure = response.data.main.pressure;
  let pressureElement = document.querySelector(".pressure");
  pressureElement.innerHTML = `Pressure: ${pressure}`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;

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
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", citySearch);
