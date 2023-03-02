import getQuote from "./quotes";
import { start } from "./userWeather";
const langInput = document.querySelectorAll(".lang_container .input_settings");
const langContainer = document.querySelector(".lang_container");

const sss = () => {
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
    if (e.target.closest(".input_settings")) {
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
sss();
export default sss;
