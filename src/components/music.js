const { useRef, useState } = require("react");

const playImg = require("../../public/play.png");
const pauseImg = require("../../public/pause.png");
const previousImg = require("../../public/previous.png");
const nextImg = require("../../public/next.png");

const aDayToRemember = require("url:../../public/adaytoremember.mp3");
const romantic = require("url:../../public/romantic.mp3");
const theJazzPiano = require("url:../../public/thejazzpiano.mp3");

const Music = () => {
  const audioRef = useRef();
  const sliderRef = useRef();

  // const [song, setSong] = useState("");
  //   const slider = document.querySelector(".slider");
  //   const mainImg = document.querySelector("#mainImg");
  //   const audio = document.querySelector(".audio");

  let isPlaying = false;
  const songList = [aDayToRemember, romantic, theJazzPiano];
  let index = Math.floor(Math.random() * songList.length);

  const setSong = () => {
    const audio = audioRef.current;
    // audio.src = songList[index];
  };

  const playPause = () => {
    const audio = audioRef.current;
    const slider = sliderRef.current;

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
  };

  //   mainBtn.addEventListener("click", () => {
  //     if (!isPlaying) {
  //       slider.max = audio.duration;
  //       audio.play();
  //       isPlaying = true;
  //       mainImg.src = pauseImg;
  //     } else {
  //       audio.pause();
  //       isPlaying = false;
  //       mainImg.src = playImg;
  //     }
  //   });

  //   audio.addEventListener("ended", () => {
  //     audio.currentTime = 0;
  //     next.click();
  //   });

  //   audio.addEventListener("timeupdate", () => {
  //     slider.value = audio.currentTime;
  //     console.log(slider.max);
  //     console.log(slider.value);
  //   });

  const changeTime = (e) => {
    const audio = audioRef.current;
    const slider = sliderRef.current;

    audio.currentTime = slider.value;
  };

  //   slider.addEventListener("change", () => {
  //     audio.currentTime = slider.value;
  //   });

  const goBack = () => {
    const audio = audioRef.current;

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
  };

  //   previous.addEventListener("click", () => {
  //     index -= 1;

  //     if (index < 0) {
  //       index = songList.length - 1;
  //     }

  //     setSong();

  //     if (!isPlaying) {
  //       audio.pause();
  //     } else {
  //       audio.play();
  //     }
  //   });

  const nextSong = () => {
    const audio = audioRef.current;
    const slider = sliderRef.current;

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
  };

  //   next.addEventListener("click", () => {
  //     index += 1;

  //     if (index === songList.length) {
  //       index = 0;
  //     }

  //     setSong();
  //     slider.max = audio.duration;
  //     console.log(slider.max);

  //     if (!isPlaying) {
  //       audio.pause();
  //     } else {
  //       audio.play();
  //     }
  //   });

  //   audio.addEventListener("loadeddata", function () {
  //     console.log("Audio duration: " + this.duration);
  //     slider.max = audio.duration;
  //   });

  window.onload = setSong();

  return (
    <div id="music-section">
      <div className="container">
        <div className="wrapper">
          <h1>Soundtrack of the Day</h1>
          <img src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
          <audio
            src={songList[index]}
            className="audio"
            preload="metadata"
            ref={audioRef}
          ></audio>
          <input
            type="range"
            id="range"
            className="slider"
            value="0"
            min="0"
            onChange={changeTime}
            ref={sliderRef}
          />
          <div className="button-container">
            <button className="previous" onClick={goBack}>
              <img src={previousImg} />
            </button>
            <button className="play" onClick={playPause}>
              <img id="mainImg" src={playImg} />
            </button>
            <button className="next" onClick={nextSong}>
              <img src={nextImg} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = Music;
