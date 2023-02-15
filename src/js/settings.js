const settingsBtn = document.querySelector(".settings_btn");
const settingsModal = document.querySelector(".settings_modal");

const openSettings = () => {
  settingsBtn.addEventListener("click", () => {
    let modalSize = parseInt(getComputedStyle(settingsModal).width);
    console.log(modalSize);
    console.log("вызов события");
    if (modalSize === 0) {
      console.log("вызов модалки");
      settingsBtn.classList.add("active");
      setTimeout(() => {
        settingsModal.classList.add("active");
      }, 300);
    } else if (modalSize > 0) {
      settingsBtn.classList.add("unactive");
      setTimeout(() => {
        settingsModal.classList.remove("active");
      }, 300);
    }
  });
  settingsBtn.addEventListener(
    "animationend",
    () => {
      settingsBtn.classList.remove("active");
      settingsBtn.classList.remove("unactive");
    },
    false
  );
};
openSettings();

export default openSettings;
