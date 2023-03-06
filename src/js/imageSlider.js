import { timeDay } from "./date";
const nextSlide = document.querySelector(".slider-next");
const prevSlide = document.querySelector(".slider-prev");
const darkTheme = document.querySelector(".dark-filter");

let imagesArr = [];
let id = 0;
const getUnsplashImages = async (timeDay) => {
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
  console.log("UNSPLASH photos", data);
  imagesArr = data.map((element) => {
    return element.urls.regular;
  });
  console.log("imagesArr>>>>>", imagesArr);
  slide(0);
  id = 0;
};
const getFlickrImages = async (timeDay) => {
  const timeDayUrls = {
    morning: "72157721543859767",
    night: "72157721533137844",
    afternoon: "72157721531175023",
    evening: "72157721536662446",
  };
  const res = await fetch(
    `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&gallery_id=${timeDayUrls[timeDay]}&api_key=${process.env.FLICKR_KEY}&extras=url_h&format=json&nojsoncallback=1`
  );
  const data = await res.json();
  console.log("flickr", data.photos.photo);
  imagesArr = data.photos.photo.map((element) => {
    return element.url_h;
  });
  console.log("imagesArr>>>>>", imagesArr);
  slide(0);
  id = 0;
};

const slide = (id) => {
  const img = new Image();
  img.src = imagesArr[id];
  img.addEventListener("load", () => {
    document.body.style.backgroundImage = `url(${img.src})`;
    darkTheme.classList.add("fade");
    setTimeout(() => {
      darkTheme.classList.remove("fade");
    }, 500);
  });
};

prevSlide.addEventListener("click", () => {
  id--;
  if (id < 0) {
    id = imagesArr.length - 1;
  }
  console.log(id);
  slide(id);
});
nextSlide.addEventListener("click", () => {
  id++;
  if (id > imagesArr.length - 1) {
    id = 0;
  }
  console.log(id);
  slide(id);
});
export const getImages = () => {
  if (localStorage.imagesApi === "unsplash") {
    getUnsplashImages(timeDay);
  } else {
    getFlickrImages(timeDay);
  }
};
getImages();

export default getImages;
