function refreshWeather(response) {
    let temperatureElement = document. querySelector("#current-temperature-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let dayTimeElement = document.querySelector("#day-and-time");
    let date = new Date(response.data.time * 1000);

    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="weather icon" class="current-temperature-icon"></img>`
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    dayTimeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday" 
      ];
      let day = days[date.getDay()];

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      return `${day} ${hours}:${minutes}, `;
}

function searchCity(city) {
    let apiKey = "00beca703bc44c5a7o5477ctfdbf0239";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
}

function displayForecast() {

    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

    days.forEach(function (day) {
        forecastHtml = forecastHtml + `<div class="grid-item">
    <div class="forecast-day"><strong>${day}</strong></div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-night.png" alt="forecast icon"/>
    <div class="forecast-temperatures">
        <span class="forecast-temperature-max"><strong>18°</strong> </span><span class="forecast-temperature-min">12°</span>
    </div>
    </div>`;

    })

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("Berlin");
displayForecast();