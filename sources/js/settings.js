const settingsBtn = document.querySelector(".settings__button");
const settingsModal = document.querySelector(".settings__modal");
const modalMenu = document.querySelector(".modal__menu");
const languageWindow = document.querySelector(".modal__language-window");
const imagesWindow = document.querySelector(".modal__images-window");
const elementsWindow = document.querySelector(".modal__elements-window");

// open modal window
const openSettings = () => {
  settingsBtn.addEventListener("click", () => {
    let modalSize = parseInt(getComputedStyle(settingsModal).width);
    if (modalSize === 0) {
      settingsBtn.classList.add("active");
      modalMenu.style.opacity = "1";
      modalMenu.style.zIndex = "2";
      setTimeout(() => {
        settingsModal.classList.add("active");
      }, 300);
    } else if (modalSize > 0) {
      settingsBtn.classList.remove("active");
      settingsBtn.classList.add("unactive");
      setTimeout(() => {
        settingsModal.classList.remove("active");
        languageWindow.style.opacity = "0";
        languageWindow.style.zIndex = "1";
        elementsWindow.style.opacity = "0";
        elementsWindow.style.zIndex = "1";
        imagesWindow.style.opacity = "0";
        imagesWindow.style.zIndex = "1";
      }, 300);
    }
  });
  settingsBtn.addEventListener(
    "animationend",
    () => {
      settingsBtn.classList.remove("unactive");
    },
    false
  );
  //open target settings
  modalMenu.addEventListener("click", (e) => {
    if (e.target.closest(".language-section")) {
      languageWindow.style.opacity = "1";
      languageWindow.style.zIndex = "2";
    } else if (e.target.closest(".images-section")) {
      imagesWindow.style.opacity = "1";
      imagesWindow.style.zIndex = "2";
    } else if (e.target.closest(".elements-section")) {
      elementsWindow.style.opacity = "1";
      elementsWindow.style.zIndex = "2";
    }
    modalMenu.style.opacity = "0";
    modalMenu.style.zIndex = "1";
  });
  // back to main modal window
  languageWindow.addEventListener("click", (e) => {
    if (e.target.className === "back-button") {
      languageWindow.style.opacity = "0";
      languageWindow.style.zIndex = "1";
      modalMenu.style.opacity = "1";
      modalMenu.style.zIndex = "2";
    }
  });
  elementsWindow.addEventListener("click", (e) => {
    if (e.target.className === "back-button") {
      elementsWindow.style.opacity = "0";
      elementsWindow.style.zIndex = "1";
      modalMenu.style.opacity = "1";
      modalMenu.style.zIndex = "2";
    }
  });
  imagesWindow.addEventListener("click", (e) => {
    if (e.target.className === "back-button") {
      imagesWindow.style.opacity = "0";
      imagesWindow.style.zIndex = "1";
      modalMenu.style.opacity = "1";
      modalMenu.style.zIndex = "2";
    }
  });
};
openSettings();

export default openSettings;
