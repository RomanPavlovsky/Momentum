const cityInput = document.querySelector(".city_input");

const getUserLocation = async () => {
  const res = await fetch(`http://ip-api.com/json/`);
  const data = await res.json();
  console.log(data);
  return data.city;
};

const getUserWeather = async (location) => {
  cityInput.value = location[0].toUpperCase() + location.slice(1);
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${process.env.API_KEY}&lang=en`
  );
  const data = await res.json();
  console.log(data);
  cityInput.addEventListener("mouseover", () => {
    cityInput.value = null;
  });
  cityInput.addEventListener("mouseout", () => {
    cityInput.value = location;
  });

  setInterval(() => {
    console.log(location);
  }, 10000);
  // document.querySelector(".city_input").textContent = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp - 273) + "&deg C";
  document.querySelector(
    ".icon_weather"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
  const description = data.weather[0].description;
  document.querySelector(".discription").textContent =
    description[0].toUpperCase() + description.slice(1);
  document.querySelector(".wind_info").textContent = `Wind speed: ${Math.round(
    data.wind.speed
  )} m/s`;
  document.querySelector(
    ".humidity_info"
  ).textContent = `Humidity: ${data.main.humidity}%`;
};

cityInput.addEventListener("change", () => {
  let inputLocation = cityInput.value;
  getUserWeather(inputLocation);
});
const start = async () => {
  let userLocation = await getUserLocation();
  getUserWeather(userLocation);
};
start();

export default start;
