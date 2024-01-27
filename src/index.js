function refreshWeather(response) {
    let temperatureElement = document. querySelector("#current-temperature-value");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("Berlin");