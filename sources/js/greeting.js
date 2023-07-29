import { timeDay } from "./date";
const name = document.querySelector(".greeting__name-input");
const buffer = document.querySelector(".greeting__input-buffer");
const greeting = document.querySelector(".greeting__title");

const showGreeting = () => {
  if (localStorage.lang === "ru") {
    const greetingRu = {
      morning: "Доброе утро,",
      afternoon: "Добрый день,",
      evening: "Добрый вечер,",
      night: "Доброй ночи,",
    };
    greeting.textContent = greetingRu[timeDay];
    name.setAttribute("placeholder", "[Введите имя]");
  } else {
    greeting.textContent = `Good ${timeDay},`;
    name.setAttribute("placeholder", "[Enter name]");
  }

  setTimeout(showGreeting, 50);
};
showGreeting();

name.addEventListener("input", () => {
  buffer.textContent = `${name.value}`;
  name.style.width = `${buffer.clientWidth}px`;
});
const setLocalStorage = () => {
  localStorage.setItem("name", name.value);
};
window.addEventListener("beforeunload", setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
};
window.addEventListener("load", getLocalStorage);

export default showGreeting;
