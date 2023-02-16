const settingsBtn = document.querySelector(".settings_btn");
const settingsModal = document.querySelector(".settings_modal");
const langOpenContainer = document.querySelector(".lang_open_container");
const imagesOpenContainer = document.querySelector(".images_open_container");
const elementsOpenContainer = document.querySelector(
  ".elements_open_container"
);
const settingsWrapper = document.querySelector(".settings_wrapper");

// open modal window
const openSettings = () => {
  settingsBtn.addEventListener("click", () => {
    let modalSize = parseInt(getComputedStyle(settingsModal).width);
    if (modalSize === 0) {
      settingsBtn.classList.add("active");
      settingsWrapper.style.opacity = "1";
      settingsWrapper.style.zIndex = "2";
      setTimeout(() => {
        settingsModal.classList.add("active");
      }, 300);
    } else if (modalSize > 0) {
      settingsBtn.classList.remove("active");
      settingsBtn.classList.add("unactive");
      setTimeout(() => {
        settingsModal.classList.remove("active");
        langOpenContainer.style.opacity = "0";
        langOpenContainer.style.zIndex = "1";
        elementsOpenContainer.style.opacity = "0";
        elementsOpenContainer.style.zIndex = "1";
        imagesOpenContainer.style.opacity = "0";
        imagesOpenContainer.style.zIndex = "1";
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
  settingsWrapper.addEventListener("click", (e) => {
    if (e.target.closest(".lang_settings")) {
      langOpenContainer.style.opacity = "1";
      langOpenContainer.style.zIndex = "2";
    } else if (e.target.closest(".images_settings")) {
      imagesOpenContainer.style.opacity = "1";
      imagesOpenContainer.style.zIndex = "2";
    } else if (e.target.closest(".elements_settings")) {
      elementsOpenContainer.style.opacity = "1";
      elementsOpenContainer.style.zIndex = "2";
    }
    settingsWrapper.style.opacity = "0";
    settingsWrapper.style.zIndex = "1";
  });
  // back to main modal window
  langOpenContainer.addEventListener("click", (e) => {
    if (e.target.className === "back_btn") {
      langOpenContainer.style.opacity = "0";
      langOpenContainer.style.zIndex = "1";
      settingsWrapper.style.opacity = "1";
      settingsWrapper.style.zIndex = "2";
    }
  });
  elementsOpenContainer.addEventListener("click", (e) => {
    if (e.target.className === "back_btn") {
      elementsOpenContainer.style.opacity = "0";
      elementsOpenContainer.style.zIndex = "1";
      settingsWrapper.style.opacity = "1";
      settingsWrapper.style.zIndex = "2";
    }
  });
  imagesOpenContainer.addEventListener("click", (e) => {
    if (e.target.className === "back_btn") {
      imagesOpenContainer.style.opacity = "0";
      imagesOpenContainer.style.zIndex = "1";
      settingsWrapper.style.opacity = "1";
      settingsWrapper.style.zIndex = "2";
    }
  });
};
openSettings();

export default openSettings;
