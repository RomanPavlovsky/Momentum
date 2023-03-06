import getQuote from "./quote";
import { start } from "./weather";
const languageButton = document.querySelectorAll(
  ".language-window__wrapper .radio-checkbox__input"
);
const languageWindow = document.querySelector(".language-window__wrapper");
// this solution with old "for" cycle method, can use "forEach"
const getLanguage = () => {
  if (localStorage.lang === undefined) {
    for (let i = 0; i < languageButton.length; i++) {
      if (languageButton[i].checked) {
        localStorage.setItem("lang", languageButton[i].value);
        break;
      }
    }
  } else {
    for (let i = 0; i < languageButton.length; i++) {
      if (languageButton[i].value === localStorage.lang) {
        languageButton[i].setAttribute("checked", "checked");
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
          break;
        }
      }
    }
  });
};
getLanguage();
export default getLanguage;
