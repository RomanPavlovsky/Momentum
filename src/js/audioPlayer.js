const title = document.querySelector(".track-description__title");
const author = document.querySelector(".track-description__author");
const currentTime = document.querySelector(".track-time__current-time");
const length = document.querySelector(".track-time__length");
const timelineRange = document.querySelector(".track-timeline__input-range");
const timelineProgress = document.querySelector(".track-timeline__progress");
const playToggle = document.querySelector(".audio-controls__toggle");
const volumeButton = document.querySelector(".volume__button");
const volumeRange = document.querySelector(".volume__input-range");
const volumeProgress = document.querySelector(".volume__progress");
const prev = document.querySelector(".audio-controls__prev");
const next = document.querySelector(".audio-controls__next");

const getTrack = async () => {
  const res = await fetch(
    `https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.JAMENDO_CLIENT_ID}&format=jsonpretty&limit=50&boost=popularity_total&tags=electrohouse&include=musicinfo&groupby=artist_id`
  );
  const data = await res.json();
  const filterData = await data.results.filter(
    (obj) => obj.audio.length > 0 && obj.audiodownload_allowed === true
  );
  console.log(filterData);
  return filterData;
};

const startPlayer = async () => {
  const tracks = await getTrack();
  let id = Math.floor(Math.random() * 51);
  let audio;

  const getTrackTime = (num) => {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) {
      return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    } else {
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
      ).padStart(2, 0)}`;
    }
  };
  const addAudio = async () => {
    audio = new Audio();
    audio.src = tracks[id].audio;
    audio.addEventListener("loadedmetadata", () => {
      author.textContent = tracks[id].artist_name;
      title.textContent = tracks[id].name;
      length.textContent = getTrackTime(audio.duration);
      audio.volume = 0.7;
      volumeProgress.style.width = audio.volume * 100 + "%";
      volumeRange.value = audio.volume * 100;
      getVolumeIcon();
    });
  };
  addAudio();
  prev.addEventListener("click", () => {
    console.dir(audio);
    console.dir(audio.currentTime);
    audio.pause();
    if (audio.currentTime > 4 && audio.paused === true) {
      playToggle.classList.remove("toggle_play");
      playToggle.classList.add("toggle_pause");
      audio.currentTime = 0;
      audio.play();
    } else if (audio.currentTime > 4 && audio.paused === false) {
      audio.currentTime = 0;
      audio.play();
    } else if (audio.currentTime < 4 && id < 0) {
      playToggle.classList.remove("toggle_play");
      playToggle.classList.add("toggle_pause");
      id--;
      id = tracks.length - 1;
      addAudio(id);
      audio.play();
    } else {
      playToggle.classList.remove("toggle_play");
      playToggle.classList.add("toggle_pause");
      id--;
      addAudio(id);
      audio.play();
    }
  });
  next.addEventListener("click", () => {
    audio.pause();
    id++;
    if (id > tracks.length - 1) {
      id = 0;
    }
    addAudio(id);
    audio.addEventListener("canplay", () => {
      playToggle.classList.remove("toggle_play");
      playToggle.classList.add("toggle_pause");
      audio.play();
    });
  });

  const getVolumeIcon = () => {
    if (volumeRange.value > 50) {
      volumeButton.classList.remove("mute");
      volumeButton.classList.remove("medium");
      volumeButton.classList.add("high");
    } else if (volumeRange.value == 0) {
      volumeButton.classList.remove("medium");
      volumeButton.classList.remove("high");
      volumeButton.classList.add("mute");
    } else if (volumeRange.value < 50 || volumeSlider.value > 0) {
      volumeButton.classList.remove("mute");
      volumeButton.classList.remove("high");
      volumeButton.classList.add("medium");
    }
  };

  // rewind track
  timelineRange.addEventListener("input", () => {
    timelineProgress.style.width = timelineRange.value + "%";
    const timeToSeek = (timelineRange.value / 100) * audio.duration;
    audio.currentTime = timeToSeek;
  });
  // track playing
  setInterval(() => {
    timelineProgress.style.width =
      (audio.currentTime / audio.duration) * 100 + "%";
    currentTime.textContent = getTrackTime(audio.currentTime);
  });
  // toggle play/stop
  playToggle.addEventListener("click", () => {
    if (audio.paused) {
      playToggle.classList.remove("toggle_play");
      playToggle.classList.add("toggle_pause");
      audio.play();
    } else {
      playToggle.classList.remove("toggle_pause");
      playToggle.classList.add("toggle_play");
      audio.pause();
    }
  });
  // volume-slider;
  volumeRange.addEventListener("input", () => {
    volumeProgress.style.width = volumeRange.value + "%";
    audio.volume = volumeRange.value / 100;
    getVolumeIcon();
  });
  // volumeButton toggle
  volumeButton.addEventListener("click", () => {
    if (audio.muted === false) {
      audio.muted = true;
      volumeRange.value = 0;
      volumeProgress.style.width = volumeRange.value + "%";
      getVolumeIcon();
    } else {
      audio.muted = false;
      volumeRange.value = audio.volume * 100;
      volumeProgress.style.width = volumeRange.value + "%";
      getVolumeIcon();
    }
  });
};
startPlayer();
export default startPlayer;
