const title = document.querySelector('.track-description__title');
const author = document.querySelector('.track-description__author');
const currentTime = document.querySelector('.track-time__current-time');
const length = document.querySelector('.track-time__length');
const timelineRange = document.querySelector('.track-timeline__input-range');
const timelineProgress = document.querySelector('.track-timeline__progress');
const playToggle = document.querySelector('.audio-controls__toggle');
const volumeButton = document.querySelector('.volume__button');
const volumeRange = document.querySelector('.volume__input-range');
const volumeProgress = document.querySelector('.volume__progress');
const prev = document.querySelector('.audio-controls__prev');
const next = document.querySelector('.audio-controls__next');

const getTrack = async () => {
  const res = await fetch('http://localhost:3030/music?');
  const data = await res.json();
  return data;
};

const startPlayer = async () => {
  const tracks = await getTrack();
  let id = Math.floor(Math.random() * 10);
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
    audio.src = tracks[id].url;
    audio.addEventListener('loadedmetadata', () => {
      author.textContent = tracks[id].author;
      title.textContent = tracks[id].title;
      length.textContent = getTrackTime(audio.duration);
      audio.volume = 0.7;
      volumeProgress.style.width = audio.volume * 100 + '%';
      volumeRange.value = audio.volume * 100;
      getVolumeIcon();
    });
  };
  addAudio();
  const audioPlay = () => {
    playToggle.classList.remove('toggle_play');
    playToggle.classList.add('toggle_pause');
    audio.play();
    audio.removeEventListener('canplaythrough', audioPlay);
  };
  const playPrev = async () => {
    if (audio.play() !== undefined) {
      await audio.play();
      audio.pause();
      if (audio.currentTime > 4) {
        audio.currentTime = 0;
        audio.addEventListener('canplaythrough', audioPlay);
      } else if (audio.currentTime < 4) {
        id--;
        if (id < 0) {
          id = tracks.length - 1;
        }
        addAudio(id);
        audio.addEventListener('canplaythrough', audioPlay);
      }
    }
  };
  const playNext = async () => {
    if (audio.play() !== undefined) {
      await audio.play();
      audio.pause();
      id++;
      if (id > tracks.length - 1) {
        id = 0;
      }
      addAudio(id);
      audio.addEventListener('canplaythrough', audioplay);
    }
  };
  next.addEventListener('click', playNext);
  prev.addEventListener('click', playPrev);
  const getVolumeIcon = () => {
    if (volumeRange.value > 50) {
      volumeButton.classList.remove('mute');
      volumeButton.classList.remove('medium');
      volumeButton.classList.add('high');
    } else if (volumeRange.value == 0) {
      volumeButton.classList.remove('medium');
      volumeButton.classList.remove('high');
      volumeButton.classList.add('mute');
    } else if (volumeRange.value < 50 || volumeRange.value > 0) {
      volumeButton.classList.remove('mute');
      volumeButton.classList.remove('high');
      volumeButton.classList.add('medium');
    }
  };
  let audioProgress;
  const GetProgress = (flag) => {
    if (flag) {
      audioProgress = setInterval(() => {
        timelineProgress.style.width =
          (audio.currentTime / audio.duration) * 100 + '%';
        currentTime.textContent = getTrackTime(audio.currentTime);
        if (audio.currentTime === audio.duration) {
          playNext();
        }
      });
    } else {
      clearInterval(audioProgress);
    }
  };
  GetProgress(true);
  // Перемотка трека
  let timeline;
  timelineRange.addEventListener('input', () => {
    timelineProgress.style.width = timelineRange.value + '%';
    timeline = (timelineRange.value / 100) * audio.duration;
    currentTime.textContent = getTrackTime(timeline);
  });
  timelineRange.addEventListener('mousedown', () => {
    GetProgress(false);
  });
  timelineRange.addEventListener('mouseup', () => {
    audio.currentTime = timeline;
    GetProgress(true);
  });
  timelineRange.addEventListener('touchstart', () => {
    GetProgress(false);
  });
  timelineRange.addEventListener('touchend', () => {
    GetProgress(true);
    audio.currentTime = timeline;
  });

  // toggle play/stop
  const playStop = async () => {
    if (audio.paused) {
      playToggle.classList.remove('toggle_play');
      playToggle.classList.add('toggle_pause');
      audio.play();
    } else if (audio.play() !== undefined) {
      await audio.play();
      playToggle.classList.remove('toggle_pause');
      playToggle.classList.add('toggle_play');
      audio.pause();
    }
  };
  playToggle.addEventListener('click', playStop);
  // volume-slider;
  volumeRange.addEventListener('input', () => {
    volumeProgress.style.width = volumeRange.value + '%';
    audio.volume = volumeRange.value / 100;
    getVolumeIcon();
  });
  // volumeButton toggle
  volumeButton.addEventListener('click', () => {
    if (audio.muted === false) {
      audio.muted = true;
      volumeRange.value = 0;
      volumeProgress.style.width = volumeRange.value + '%';
      getVolumeIcon();
    } else {
      audio.muted = false;
      volumeRange.value = audio.volume * 100;
      volumeProgress.style.width = volumeRange.value + '%';
      getVolumeIcon();
    }
  });
};
startPlayer();
export default startPlayer;
