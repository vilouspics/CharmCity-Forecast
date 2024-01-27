function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    // console.log(searchInput.value);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit)