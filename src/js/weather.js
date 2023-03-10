const cityInput = document.querySelector(".weather__city-input");
const autocompleteList = document.querySelector(".weather__autocomplete-list");
const temp = document.querySelector(".weather__temp");
const iconWeather = document.querySelector(".weather__icon");
const descriptionWeather = document.querySelector(".weather__description");
const wind = document.querySelector(".weather__wind");
const humidity = document.querySelector(".weather__humidity");
// autocomplete
let autocomplete = [];
const getCityAutocomplete = async (value) => {
  const res = await fetch(`http://localhost:3030/autocomplete?q=${value}`);
  const data = await res.json();
  const filterCity = await data.filter(
    (obj) =>
      obj.city_name_en.toLowerCase().startsWith(`${value}`) ||
      obj.city_name_ru.toLowerCase().startsWith(`${value}`)
  );
  autocomplete = filterCity.map((element) => {
    return element;
  });
  const autocompleteCity = await autocomplete
    .map((element) => {
      if (localStorage.getItem("lang") === "en") {
        return `<li data-index=${element.id}>${element.city_name_en}, ${element.country_name_en} </li>`;
      } else if (localStorage.getItem("lang") === "ru") {
        return `<li data-index=${element.id}>${element.city_name_ru}, ${element.country_name_ru} </li>`;
      }
    })
    // .slice(0, 3)
    .join("");
  autocompleteList.innerHTML = autocompleteCity;
};

autocompleteList.addEventListener("click", (e) => {
  sessionStorage.setItem("cityInput", `${e.target.textContent}`);
  cityInput.value = e.target.textContent;
  const location = autocomplete.filter((obj) => {
    if (obj.id === e.target.dataset.index) {
      return obj;
    }
  });
  getUserWeather(location);
  autocompleteList.innerHTML = "";
});

// Input City
cityInput.addEventListener("input", () => {
  if (cityInput.value.length >= 2) {
    const value = cityInput.value.toLowerCase();
    getCityAutocomplete(value);
  } else if (cityInput.value.length < 2) {
    autocompleteList.innerHTML = "";
  }
});
cityInput.addEventListener("focus", () => {
  cityInput.value = "";
});
cityInput.addEventListener("blur", () => {
  setTimeout(() => {
    if (cityInput.value != sessionStorage.getItem("cityInput")) {
      cityInput.value = sessionStorage.getItem("cityInput");
    }
    autocompleteList.innerHTML = "";
  }, 150);
});

cityInput.addEventListener("change", () => {});

// Autoloading user location
const getUserLocation = async () => {
  const res = await fetch(`http://ip-api.com/json/?lang=${localStorage.lang}`);
  const data = await res.json();
  console.log("IP ??????????????", data);
  cityInput.value = `${data.city}, ${data.country}`;
  sessionStorage.setItem("cityInput", `${cityInput.value}`);
  return data;
};
//Autoloading user weather
const getUserWeather = async (location) => {
  const lat = location.lat || location[0].latitude;
  const lon = location.lon || location[0].longitude;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&lang=${localStorage.lang}`
  );
  const data = await res.json();
  console.log("WEATHER DATA", data);
  temp.innerHTML = Math.round(data.main.temp - 273) + "&deg C";
  iconWeather.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
  const description = data.weather[0].description;
  descriptionWeather.textContent =
    description[0].toUpperCase() + description.slice(1);
  wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
};
export const start = async () => {
  let userLocation = await getUserLocation();
  getUserWeather(userLocation);
};
start();

export default start;
