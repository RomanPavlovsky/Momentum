const audioToggle = document.querySelector(
  ".elements-window__audio .toggle__input"
);
const weatherToggle = document.querySelector(
  ".elements-window__weather .toggle__input"
);
const quoteToggle = document.querySelector(
  ".elements-window__quote .toggle__input"
);
const greetingToggle = document.querySelector(
  ".elements-window__greeting .toggle__input"
);
const audioplayer = document.querySelector(".audioplayer__wrapper");
const weather = document.querySelector(".weather__wrapper");
const quote = document.querySelector(".quote__wrapper");
const greeting = document.querySelector(".greeting__wrapper");
const toggleElements = () => {
  audioToggle.addEventListener("click", () => {
    audioToggle.checked === true
      ? (audioplayer.style.display = "flex")
      : (audioplayer.style.display = "none");
  });
  weatherToggle.addEventListener("click", () => {
    weatherToggle.checked === true
      ? (weather.style.display = "flex")
      : (weather.style.display = "none");
  });
  quoteToggle.addEventListener("click", () => {
    quoteToggle.checked === true
      ? (quote.style.display = "flex")
      : (quote.style.display = "none");
  });
  greetingToggle.addEventListener("click", () => {
    greetingToggle.checked === true
      ? (greeting.style.display = "flex")
      : (greeting.style.display = "none");
  });
};

toggleElements();

export default toggleElements;
