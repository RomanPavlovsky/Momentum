import { dataPets } from './dataPets';

const sliderContent = document.querySelector('.slider__content');
const slidePrev = document.querySelector('.slider__button_prev');
const slideNext = document.querySelector('.slider__button_next');
let arrId;

const removeNext = () => {
  document.querySelectorAll('.slider__card').forEach((elem) => {
    elem.classList.add('slider__card_remove-next');
  });
};
const removePrev = () => {
  document.querySelectorAll('.slider__card').forEach((elem) => {
    elem.classList.add('slider__card_remove-prev');
  });
};
const addNext = () => {
  document.querySelectorAll('.slider__card').forEach((elem) => {
    elem.classList.add('slider__card_render-next');
  });
};
const addPrev = () => {
  document.querySelectorAll('.slider__card').forEach((elem) => {
    elem.classList.add('slider__card_render-prev');
  });
};

const getIdCards = () => {
  let id1 = Math.floor(Math.random() * dataPets.length);
  let id2 = Math.floor(Math.random() * dataPets.length);
  do {
    id2 = Math.floor(Math.random() * dataPets.length);
  } while (id1 === id2);
  let id3 = Math.floor(Math.random() * dataPets.length);
  do {
    id3 = Math.floor(Math.random() * dataPets.length);
  } while (id1 === id3 || id2 === id3);
  arrId = [id1, id2, id3];
};
getIdCards();
const addCard = (id) => {
  return `<div class="slider__card card ">
	<img class="card__image" src="${dataPets[id].img}" />
	<h4 class="card__name">${dataPets[id].name}</h4>
	<button data-index=${id} class="card__button button">Learn more</button>
  </div>`;
};
const getMobileId = () => {
  let id = Math.floor(Math.random() * dataPets.length);
  do {
    id = Math.floor(Math.random() * dataPets.length);
  } while (id === mobileState);
  return id;
};
const getTabletId = () => {
  let id1 = Math.floor(Math.random() * dataPets.length);
  do {
    id1 = Math.floor(Math.random() * dataPets.length);
  } while (id1 === tabletState[0] || id1 === tabletState[1]);
  let id2 = Math.floor(Math.random() * dataPets.length);
  do {
    id2 = Math.floor(Math.random() * dataPets.length);
  } while (id2 === tabletState[0] || id2 === tabletState[1] || id2 === id1);
  return [id1, id2];
};
const getDesktopId = () => {
  let id1 = Math.floor(Math.random() * dataPets.length);
  do {
    id1 = Math.floor(Math.random() * dataPets.length);
  } while (
    id1 === desktopState[0] ||
    id1 === desktopState[1] ||
    id1 === desktopState[2]
  );
  let id2 = Math.floor(Math.random() * dataPets.length);
  do {
    id2 = Math.floor(Math.random() * dataPets.length);
  } while (
    id2 === desktopState[0] ||
    id2 === desktopState[1] ||
    id2 === desktopState[2] ||
    id2 === id1
  );
  let id3 = Math.floor(Math.random() * dataPets.length);
  do {
    id3 = Math.floor(Math.random() * dataPets.length);
  } while (
    id3 === desktopState[0] ||
    id3 === desktopState[1] ||
    id3 === desktopState[2] ||
    id3 === id1 ||
    id3 === id2
  );
  return [id1, id2, id3];
};
const renderCards = (state) => {
  sliderContent.innerHTML = state
    .map((elem) => {
      return addCard(elem);
    })
    .join('');
};
let currentId;
let isNext = false;
let isPrev = false;
let mobileState = arrId.slice(0, 1);
let tabletState = arrId.slice(0, 2);
let desktopState = arrId;
const useNext = () => {
  if (mediaMobile.matches) {
    if (isNext === false && isPrev === false) {
      currentId = getMobileId();
      isNext = true;
      sliderContent.innerHTML = addCard(currentId);
    } else if (isNext === true) {
      mobileState = currentId;
      currentId = getMobileId();
      isNext = true;
      sliderContent.innerHTML = addCard(currentId);
    } else if (isNext !== true) {
      sliderContent.innerHTML = addCard(mobileState);
      [currentId, mobileState] = [mobileState, currentId];
      isNext = true;
      isPrev = false;
    }
  } else if (minMediaTablet.matches && maxMediaTablet.matches) {
    if (isNext === false && isPrev === false) {
      currentId = getTabletId();
      isNext = true;
      renderCards(currentId);
    } else if (isNext === true) {
      tabletState = currentId;
      currentId = getTabletId();
      isNext = true;
      renderCards(currentId);
    } else if (isNext !== true) {
      renderCards(tabletState);
      [currentId, tabletState] = [tabletState, currentId];
      isNext = true;
      isPrev = false;
    }
  } else {
    if (isNext === false && isPrev === false) {
      currentId = getDesktopId();
      isNext = true;
      let x = [1, 2, 3];
      sliderContent.innerHTML = currentId
        .map((elem) => {
          return addCard(elem);
        })
        .join('');
    } else if (isNext === true) {
      desktopState = currentId;
      currentId = getDesktopId();
      isNext = true;
      renderCards(currentId);
    } else if (isNext !== true) {
      renderCards(desktopState);
      [currentId, desktopState] = [desktopState, currentId];
      isNext = true;
      isPrev = false;
    }
  }
};
const usePrev = () => {
  if (mediaMobile.matches) {
    if (isNext === false && isPrev === false) {
      currentId = getMobileId();
      isPrev = true;
      sliderContent.innerHTML = addCard(currentId);
    } else if (isPrev === true) {
      mobileState = currentId;
      currentId = getMobileId();
      isPrev = true;
      sliderContent.innerHTML = addCard(currentId);
    } else if (isPrev !== true) {
      sliderContent.innerHTML = addCard(mobileState);
      [currentId, mobileState] = [mobileState, currentId];
      isPrev = true;
      isNext = false;
    }
  } else if (minMediaTablet.matches && maxMediaTablet.matches) {
    if (isNext === false && isPrev === false) {
      currentId = getTabletId();
      isPrev = true;
      renderCards(currentId);
    } else if (isPrev === true) {
      tabletState = currentId;
      currentId = getTabletId();
      isPrev = true;
      renderCards(currentId);
    } else if (isPrev !== true) {
      renderCards(tabletState);
      [currentId, tabletState] = [tabletState, currentId];
      isPrev = true;
      isNext = false;
    }
  } else {
    if (isNext === false && isPrev === false) {
      currentId = getDesktopId();
      isPrev = true;
      renderCards(currentId);
    } else if (isPrev === true) {
      desktopState = currentId;
      currentId = getDesktopId();
      isPrev = true;
      renderCards(currentId);
    } else if (isPrev !== true) {
      renderCards(desktopState);
      [currentId, desktopState] = [desktopState, currentId];
      isPrev = true;
      isNext = false;
    }
  }
};

const maxMediaTablet = window.matchMedia('(max-width: 1200px)');
const minMediaTablet = window.matchMedia('(min-width: 768px)');
const mediaMobile = window.matchMedia('(max-width: 767px)');

if (mediaMobile.matches) {
  sliderContent.innerHTML = addCard(arrId[0]);
} else if (minMediaTablet.matches && maxMediaTablet.matches) {
  sliderContent.innerHTML = addCard(arrId[0]) + addCard(arrId[1]);
} else {
  sliderContent.innerHTML =
    addCard(arrId[0]) + addCard(arrId[1]) + addCard(arrId[2]);
}
function tablet(e) {
  if (e.matches) {
    getIdCards();
    isNext = false;
    isPrev = false;
    tabletState = arrId.slice(0, 2);
    sliderContent.innerHTML = addCard(arrId[0]) + addCard(arrId[1]);
  } else {
    getIdCards();
    isNext = false;
    isPrev = false;
    desktopState = arrId;
    sliderContent.innerHTML =
      addCard(arrId[0]) + addCard(arrId[1]) + addCard(arrId[2]);
  }
}
function mobile(e) {
  if (e.matches) {
    getIdCards();
    isNext = false;
    isPrev = false;
    mobileState = arrId.slice(0, 1);
    sliderContent.innerHTML = addCard(arrId[0]);
  } else {
    getIdCards();
    isNext = false;
    isPrev = false;
    tabletState = arrId.slice(0, 2);
    sliderContent.innerHTML = addCard(arrId[0]) + addCard(arrId[1]);
  }
}
maxMediaTablet.addEventListener('change', tablet);
mediaMobile.addEventListener('change', mobile);

slidePrev.addEventListener('click', usePrev);
slideNext.addEventListener('click', useNext);

slider();
export default slider;
