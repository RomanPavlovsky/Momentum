import getQuote from "./quote";
import { start } from "./weather";
const languageButton = document.querySelectorAll(
  ".language-window__wrapper .radio-checkbox__input"
);
const languageWindow = document.querySelector(".language-window__wrapper");
const languageSection = document.querySelector(".language-section__title");
const imagesSection = document.querySelector(".images-section__title");
const elementsSection = document.querySelector(".elements-section__title");
const languageWindowTitle = document.querySelector(".language-window__title");
const elementsWindowTitle = document.querySelector(".elements-window__title");
const imagesWindowTitle = document.querySelector(".images-window__title");
const elementsWindowGreeting = document.querySelector(
  ".elements-window__greeting .elements-window__name"
);
const elementsWindowPlayer = document.querySelector(
  ".elements-window__player .elements-window__name"
);
const elementsWindowWeather = document.querySelector(
  ".elements-window__weather .elements-window__name"
);
const elementsWindowQuote = document.querySelector(
  ".elements-window__quote .elements-window__name"
);
// this solution with old "for" cycle method, can use "forEach"
const translateMenu = () => {
  if (localStorage.lang === "ru") {
    languageSection.textContent = "Язык";
    elementsSection.textContent = "Рабочий стол";
    imagesSection.textContent = "Обои приложения";
    languageWindowTitle.textContent = "Язык:";
    elementsWindowTitle.textContent = "Элементы рабочего стола:";
    imagesWindowTitle.textContent = "Источник изображений:";
    elementsWindowGreeting.textContent = "Приветствие";
    elementsWindowPlayer.textContent = "Аудиоплеер";
    elementsWindowWeather.textContent = "Погода";
    elementsWindowQuote.textContent = "Цитата";
  } else {
    languageSection.textContent = "Language";
    elementsSection.textContent = "Desktop";
    imagesSection.textContent = "App wallpapers";
    languageWindowTitle.textContent = "Language:";
    elementsWindowTitle.textContent = "Desktop elements:";
    imagesWindowTitle.textContent = "Image source:";
    elementsWindowGreeting.textContent = "Greating";
    elementsWindowPlayer.textContent = "Audioplayer";
    elementsWindowWeather.textContent = "Weather";
    elementsWindowQuote.textContent = "Quote";
  }
};
const getLanguage = () => {
  if (localStorage.lang === undefined) {
    for (let i = 0; i < languageButton.length; i++) {
      if (languageButton[i].checked) {
        localStorage.setItem("lang", languageButton[i].value);
        translateMenu();
        break;
      }
    }
  } else {
    for (let i = 0; i < languageButton.length; i++) {
      if (languageButton[i].value === localStorage.lang) {
        languageButton[i].setAttribute("checked", "checked");
        translateMenu();
        break;
      }
    }
  }

  languageWindow.addEventListener("click", (e) => {
    if (e.target.closest(".radio-checkbox__input")) {
      for (let i = 0; i < languageButton.length; i++) {
        if (languageButton[i].checked) {
          localStorage.setItem("lang", languageButton[i].value);
          start();
          getQuote();
          translateMenu();
          break;
        }
      }
    }
  });
};
getLanguage();
export default getLanguage;
