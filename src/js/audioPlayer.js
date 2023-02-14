const trackTitle = document.querySelector(".track_title");
const trackAuthor = document.querySelector(".track_author");
const trackCurrTime = document.querySelector(".track_current_time");
const trackLength = document.querySelector(".track_length");
const trackRange = document.querySelector(".track_range");
const trackProgress = document.querySelector(".track_progress");
const toggler = document.querySelector(".audio_toggle");
const volumeBtn = document.querySelector(".volume_btn");
const volumeSlider = document.querySelector(".volume_input");
const volumeProgress = document.querySelector(".volume_progress");
const prevAudio = document.querySelector(".audio_prev");
const nextAudio = document.querySelector(".audio_next");

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
      trackAuthor.textContent = tracks[id].artist_name;
      trackTitle.textContent = tracks[id].name;
      trackLength.textContent = getTrackTime(audio.duration);
      audio.volume = 0.7;
      volumeProgress.style.width = audio.volume * 100 + "%";
      volumeSlider.value = audio.volume * 100;
      getVolumeIcon();
    });
  };
  addAudio();
  prevAudio.addEventListener("click", () => {
    console.dir(audio);
    console.dir(audio.currentTime);
    audio.pause();
    if (audio.currentTime > 4 && audio.paused === true) {
      toggler.classList.remove("play");
      toggler.classList.add("pause");
      audio.currentTime = 0;
      audio.play();
    } else if (audio.currentTime > 4 && audio.paused === false) {
      audio.currentTime = 0;
      audio.play();
    } else if (audio.currentTime < 4 && id < 0) {
      toggler.classList.remove("play");
      toggler.classList.add("pause");
      id--;
      id = tracks.length - 1;
      addAudio(id);
      audio.play();
    } else {
      toggler.classList.remove("play");
      toggler.classList.add("pause");
      id--;
      addAudio(id);
      audio.play();
    }
  });
  nextAudio.addEventListener("click", () => {
    audio.pause();
    id++;
    if (id > tracks.length - 1) {
      id = 0;
    }
    addAudio(id);
    audio.addEventListener("canplay", () => {
      toggler.classList.remove("play");
      toggler.classList.add("pause");
      audio.play();
    });
  });

  const getVolumeIcon = () => {
    if (volumeSlider.value > 50) {
      volumeBtn.classList.remove("mute");
      volumeBtn.classList.remove("medium");
      volumeBtn.classList.add("high");
    } else if (volumeSlider.value == 0) {
      volumeBtn.classList.remove("medium");
      volumeBtn.classList.remove("high");
      volumeBtn.classList.add("mute");
    } else if (volumeSlider.value < 50 || volumeSlider.value > 0) {
      volumeBtn.classList.remove("mute");
      volumeBtn.classList.remove("high");
      volumeBtn.classList.add("medium");
    }
  };

  // rewind track
  trackRange.addEventListener("input", () => {
    trackProgress.style.width = trackRange.value + "%";
    const timeToSeek = (trackRange.value / 100) * audio.duration;
    audio.currentTime = timeToSeek;
  });
  // track playing
  setInterval(() => {
    trackProgress.style.width =
      (audio.currentTime / audio.duration) * 100 + "%";
    trackCurrTime.textContent = getTrackTime(audio.currentTime);
  });
  // toggle play/stop
  toggler.addEventListener("click", () => {
    if (audio.paused) {
      toggler.classList.remove("play");
      toggler.classList.add("pause");
      audio.play();
    } else {
      toggler.classList.remove("pause");
      toggler.classList.add("play");
      audio.pause();
    }
  });
  // volume-slider;
  volumeSlider.addEventListener("input", () => {
    volumeProgress.style.width = volumeSlider.value + "%";
    audio.volume = volumeSlider.value / 100;
    getVolumeIcon();
  });
  // volumeButton toggle
  volumeBtn.addEventListener("click", () => {
    if (audio.muted === false) {
      audio.muted = true;
      volumeSlider.value = 0;
      volumeProgress.style.width = volumeSlider.value + "%";
      getVolumeIcon();
    } else {
      audio.muted = false;
      volumeSlider.value = audio.volume * 100;
      volumeProgress.style.width = volumeSlider.value + "%";
      getVolumeIcon();
    }
  });
};
startPlayer();
export default startPlayer;
