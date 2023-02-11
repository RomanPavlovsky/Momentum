import { timeDay } from "./userTime";
const name = document.querySelector(".name");

const showGreeting = () => {
  document.querySelector(".greeting").textContent = `Good ${timeDay},`;
  setTimeout(showGreeting, 1000);
};

showGreeting();

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
