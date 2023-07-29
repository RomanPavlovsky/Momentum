import { getImages } from './imageSlider';

const imagesWindow = document.querySelector('.images-window__wrapper');
const imagesButtons = document.querySelectorAll(
  '.images-window__wrapper .radio-checkbox__input'
);
const getImagesSetting = () => {
  if (localStorage.imagesApi === undefined) {
    imagesButtons.forEach((button) => {
      if (button.checked === true) {
        localStorage.imagesApi = button.value;
      }
    });
  } else {
    imagesButtons.forEach((button) => {
      if (button.value === localStorage.imagesApi) {
        button.setAttribute('checked', 'checked');
      }
    });
  }
};
getImagesSetting();
const swapApi = () => {
  imagesWindow.addEventListener('click', (e) => {
    if (e.target.closest('.radio-checkbox__input')) {
      imagesButtons.forEach((button) => {
        if (button.checked) {
          localStorage.setItem('imagesApi', button.value);
          getImages();
        }
      });
    }
  });
};

swapApi();

export default swapApi;
