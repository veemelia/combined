const slider = document.querySelector(".slider");
const previous = document.querySelector(".previous");
const mainBtn = document.querySelector(".play");
const next = document.querySelector(".next");
const mainImg = document.querySelector("#mainImg");
const audio = document.querySelector("#audio");

const playImg = require("../public/play.png");
const pauseImg = require("../public/pause.png");
const aDayToRemember = require("url:../public/adaytoremember.mp3");
const romantic = require("url:../public/romantic.mp3");
const theJazzPiano = require("url:../public/thejazzpiano.mp3");

let isPlaying = false;
// const songList = [aDayToRemember, romantic, theJazzPiano];
const songList = [romantic];
let index = Math.floor(Math.random() * songList.length);

const setSong = () => {
  audio.src = songList[index];
};

// const togglePlay = () => {
mainBtn.addEventListener("click", () => {
  if (!isPlaying) {
    slider.max = audio.duration;
    audio.play();
    isPlaying = true;
    mainImg.src = pauseImg;
  } else {
    audio.pause();
    isPlaying = false;
    mainImg.src = playImg;
  }
  // };
});

audio.addEventListener("ended", () => {
  audio.currentTime = 0;
  next.click();
});

audio.addEventListener("timeupdate", () => {
  slider.value = audio.currentTime;
  console.log(slider.max);
  console.log(slider.value);
});

slider.addEventListener("change", () => {
  audio.currentTime = slider.value;
});

// const previous = () => {
previous.addEventListener("click", () => {
  index -= 1;

  if (index < 0) {
    index = songList.length - 1;
  }

  setSong();

  if (!isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  // };
});

// const next = () => {
next.addEventListener("click", () => {
  index += 1;

  if (index === songList.length) {
    index = 0;
  }

  setSong();
  slider.max = audio.duration;
  console.log(slider.max);

  if (!isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  // };
});

audio.addEventListener("loadeddata", function () {
  console.log("Audio duration: " + this.duration);
  slider.max = audio.duration;
});

window.onload = setSong();
