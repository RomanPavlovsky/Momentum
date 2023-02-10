const showUserTime = () => {
  let userDate = new Date();
  let ruTime = userDate.toLocaleTimeString("ru");
  let date = userDate.toLocaleDateString("ru");
  let hours = userDate.getHours();
  let minutes = userDate.getMinutes();
  document.querySelector(".date").textContent = date;
  document.querySelector(".time").textContent = ruTime;
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
