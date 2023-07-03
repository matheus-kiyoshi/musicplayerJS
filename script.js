const trackArt = document.querySelector('.player-album-image');
const trackName = document.querySelector('.player-title');
const trackArtist = document.querySelector('.player-artist-name');

const player = document.querySelector('.player');
const divTime = document.querySelector('.time');

const repeatBtn = document.querySelector('.repeat-button');
const pauseBtn = document.querySelector('.fa-pause');
const playBtn = document.querySelector('.fa-play');
const randomBtn = document.querySelector('.shuffle-button');
const backWardBtn = document.querySelector('.backward-step-button');
const forWardBtn = document.querySelector('.forward-step-button');
const play = document.querySelector('.play-button');

const musicSlider = document.querySelector('#music-range');
const currentTime = document.querySelector('#music-current-time');
const totalTime = document.querySelector('#music-total-time');
const wave = document.querySelector('#wave');
const randomIcon = document.querySelector('.fa-shuffle');
const currentTrack = document.createElement('audio');

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let isInRepeat = false;
let updateTimer;

repeatBtn.addEventListener('click', repeatTrack);
backWardBtn.addEventListener('click', prevTrack);
forWardBtn.addEventListener('click', nextTrack);
play.addEventListener('click', playOrPauseTrack);
randomBtn.addEventListener('click', randomTrack);
musicSlider.addEventListener('change', slider);

import { musics } from "./songs.js";

loadTrack(trackIndex);

function loadTrack(trackIndex) {
  clearInterval(updateTimer);
  reset();

  currentTrack.src = musics[trackIndex].source;
  currentTrack.load();
  currentTrack.volume = 0.5;

  trackName.textContent = musics[trackIndex].title;
  trackArtist.textContent = musics[trackIndex].artist;
  background(trackIndex);
  
  updateTimer = setInterval(setUpdate, 1000);

  currentTrack.addEventListener ('ended', nextTrack);
}

function reset() {
  currentTime.textContent = '00:00';
  totalTime.textContent = '00:00';
  musicSlider.value = 0;
}

function background(trackIndex) {
  trackArt.style.backgroundImage = "url(" + musics[trackIndex].image + ")";
  player.id = musics[trackIndex].ident;
  trackArt.id = musics[trackIndex].ident;
  trackName.id = musics[trackIndex].ident;
  trackArtist.id = musics[trackIndex].ident;
  divTime.id = musics[trackIndex].ident;
  musicSlider.style.backgroundColor = musics[trackIndex].color;
} 

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  wave.classList.add('loader');
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  wave.classList.remove('loader');
  playBtn.style.display = 'block';
  pauseBtn.style.display = 'none';
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
  randomBtn.style.opacity = '1';
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
  randomBtn.style.opacity = '0.5';
}

function repeatTrack() {
  if (isInRepeat === false) {
    isInRepeat = true;
    repeatBtn.style.opacity = '1';
  } else {
    isInRepeat = false;
    repeatBtn.style.opacity = '0.5';
  }
}

function prevTrack() {  
  if (isInRepeat === false) {
    trackIndex > 0 ? trackIndex -= 1 : trackIndex = musics.length - 1;
  }

  loadTrack(trackIndex);
  playTrack();
}

function playOrPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function nextTrack() {
  if (trackIndex < musics.length - 1 && isRandom === false && isInRepeat === false) {
    trackIndex += 1;
  } else if (trackIndex < musics.length - 1 && isRandom === true && isInRepeat === false) {
    let randomIndex = Number.parseInt(Math.random() * musics.length);
    while (randomIndex === trackIndex) {
      randomIndex = Number.parseInt(Math.random() * musics.length);
    }
    trackIndex = randomIndex;
  } else if (trackIndex === musics.length - 1 && isRandom === true && isInRepeat === false) {
    let randomIndex = Number.parseInt(Math.random() * musics.length);
    while (randomIndex === trackIndex) {
      randomIndex = Number.parseInt(Math.random() * musics.length);
    }
    trackIndex = randomIndex;
  } else if (trackIndex < musics.length - 1 && isInRepeat === true) {
    trackIndex = trackIndex;
  } else if (trackIndex === musics.length - 1 && isInRepeat === true) {
    trackIndex = trackIndex;
  } else {
    trackIndex = 0;
  }

  loadTrack(trackIndex);
  playTrack();
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function slider() {
  let slider = currentTrack.duration * (musicSlider.value / 100);
  currentTrack.currentTime = slider;
}

function setUpdate() {
  let sliderPosition = 0;
  if (!isNaN(currentTrack.duration)) {
    sliderPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    musicSlider.value = sliderPosition;

    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
    if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;

    currentTime.textContent = currentMinutes + ':' + currentSeconds;
    totalTime.textContent = durationMinutes + ':' + durationSeconds;
  }  
}