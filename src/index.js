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

    setWeatherAppBackgroundColor(temperature);

    function setWeatherAppBackgroundColor(temperature) {
        let container = document.querySelector(".weather-app");
    
        if (temperature < 0) {
            container.style.backgroundColor = "var(--color-secondary)";
        } else if (temperature >= 0 && temperature < 10) {
            container.style.backgroundColor = "var(--color-tertiary)";
        } else if (temperature >= 11 && temperature < 20) {
            container.style.backgroundColor = "var(--color-quinary)";
        } else if (temperature > 20) {
            container.style.backgroundColor = "var(--color-primary)";
        } else {
            container.style.backgroundColor = "var(--color-quaternary)";
        }
    }

    getForecast(response.data.city)
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

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let currentDayIndex = date.getDay();

    let nextDayIndex = (currentDayIndex + 1) % 7;

    return days[nextDayIndex];
}

function getForecast(city) {
    let apiKey = "00beca703bc44c5a7o5477ctfdbf0239";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {

    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml = forecastHtml + `<div class="grid-item">
    <div class="forecast-day"><strong>${formatDay(day.time)}</strong></div>
    <img src="${day.condition.icon_url}" alt="forecast icon" class="forecast-icon"/>
    <div class="forecast-temperatures">
        <span class="forecast-temperature-max"><strong>${Math.round(day.temperature.maximum)}° </strong> </span><span class="forecast-temperature-min"> ${Math.round(day.temperature.minimum)}°</span>
    </div>
    </div>`;
    }

    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("Berlin");