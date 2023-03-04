import getQuote from "./quote";
import { start } from "./weather";
const langInput = document.querySelectorAll(
  ".language-window__wrapper .radio-checkbox__input"
);
const langContainer = document.querySelector(".language-window__wrapper");

const multiLang = () => {
  let chekedLang;
  window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.lang === undefined) {
      for (let i = 0; i < langInput.length; i++) {
        if (langInput[i].checked) {
          chekedLang = langInput[i].value;
          localStorage.setItem("lang", chekedLang);
          break;
        }
      }
    } else {
      chekedLang = localStorage.lang;
      for (let i = 0; i < langInput.length; i++) {
        if (langInput[i].value == chekedLang) {
          langInput[i].setAttribute("checked", "checked");
          break;
        }
      }
    }
  });
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("lang", chekedLang);
  });
  langContainer.addEventListener("click", (e) => {
    if (e.target.closest(".radio-checkbox__input")) {
      for (let i = 0; i < langInput.length; i++) {
        if (langInput[i].checked) {
          chekedLang = langInput[i].value;
          localStorage.setItem("lang", chekedLang);
          start();
          getQuote();
          console.log(chekedLang);
          break;
        }
      }
    }
  });
};
multiLang();
export default multiLang;
