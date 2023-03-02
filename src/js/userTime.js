const showUserTime = () => {
  let userDate = new Date();
  let time = userDate.toLocaleTimeString(localStorage.lang);
  let date = userDate.toLocaleDateString(localStorage.lang);
  let hours = userDate.getHours();
  let minutes = userDate.getMinutes();
  document.querySelector(".date").textContent = date;
  document.querySelector(".time").textContent = time;
  setTimeout(showUserTime, 1000);
  return hours * 60 + minutes;
};

let minutes = showUserTime();

const getTimeDay = (minutes) => {
  if (minutes >= 240 && minutes < 720) {
    return "morning";
  } else if (minutes >= 720 && minutes < 1020) {
    return "afternoon";
  } else if (minutes >= 1020 && minutes <= 1439) {
    return "evening";
  } else {
    return "night";
  }
};
export let timeDay = getTimeDay(minutes);
