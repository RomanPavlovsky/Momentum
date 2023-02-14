import { timeDay } from "./userTime";
const nextSlide = document.querySelector(".slider_next");
const prevSlide = document.querySelector(".slider_prev");

const getLinkImages = async (timeDay) => {
  const timeDayUrls = {
    morning: "6ARmtP5OHaE",
    night: "XOcF3I9txyE",
    afternoon: "ALOyC6RsD7s",
    evening: "rZyvycpZUcs",
  };
  const res = await fetch(
    `https://api.unsplash.com/photos/random?collections=${timeDayUrls[timeDay]}&count=20&client_id=${process.env.UNSPLASH_CLIENT_ID}`
  );
  const data = await res.json();
  console.log(data);
  return data;
};

const slider = (arrImages) => {
  let id = 0;
  const slide = (id) => {
    document.body.style.backgroundImage = `url(${arrImages[id].urls.regular})`;
  };
  prevSlide.addEventListener("click", () => {
    id--;
    if (id < 0) {
      id = arrImages.length - 1;
    }
    slide(id);
  });
  nextSlide.addEventListener("click", () => {
    id++;
    if (id > arrImages.length - 1) {
      id = 0;
    }
    slide(id);
  });
  slide(id);
};

const startSlider = async () => {
  let arrImages = await getLinkImages(timeDay);
  slider(arrImages);
};
startSlider();

export default startSlider;
