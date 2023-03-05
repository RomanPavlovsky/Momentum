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
const allToggle = document.querySelectorAll(".elements-window .toggle__input");

let elementsSettings = {};
const getElemSettings = () => {
  if (localStorage.elements === undefined) {
    allToggle.forEach((elem) => {
      elementsSettings[elem.name] = elem.checked;
    });
    localStorage.elements = JSON.stringify(elementsSettings);
  } else {
    elementsSettings = JSON.parse(localStorage.elements);
    allToggle.forEach((elem) => {
      elem.checked = elementsSettings[elem.name];
    });
  }
};
getElemSettings();
setInterval(() => {
  elementsSettings.player === true
    ? (audioplayer.style.display = "flex")
    : (audioplayer.style.display = "none");
  elementsSettings.weather === true
    ? (weather.style.display = "flex")
    : (weather.style.display = "none");
  elementsSettings.quote === true
    ? (quote.style.display = "flex")
    : (quote.style.display = "none");
  elementsSettings.greeting === true
    ? (greeting.style.display = "flex")
    : (greeting.style.display = "none");
});
function setElementStorage() {
  elementsSettings[this.name] = this.checked;
  localStorage.elements = JSON.stringify(elementsSettings);
}
const toggleElements = () => {
  audioToggle.addEventListener("click", setElementStorage);
  weatherToggle.addEventListener("click", setElementStorage);
  quoteToggle.addEventListener("click", setElementStorage);
  greetingToggle.addEventListener("click", setElementStorage);
};
toggleElements();

export default toggleElements;
