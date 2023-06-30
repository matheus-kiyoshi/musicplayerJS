let trackArt = document.querySelector('.player-album-image');
let trackName = document.querySelector('.player-title');
let trackArtist = document.querySelector('.player-artist-name');

let player = document.querySelector('.player');
let bar1 = document.querySelector('.barra1');
let bar2 = document.querySelector('.barra2');
let divTime = document.querySelector('.time');

let repeatBtn = document.querySelector('.repeat-button');
let pauseBtn = document.querySelector('.fa-pause');
let playBtn = document.querySelector('.fa-play');
let randomBtn = document.querySelector('.shuffle-button');

let musicSlider = document.querySelector('#music-range');
let currentTime = document.querySelector('#music-current-time');
let totalTime = document.querySelector('#music-total-time');
let wave = document.querySelector('#wave');
let randomIcon = document.querySelector('.fa-shuffle');
let currentTrack = document.createElement('audio');

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let isInRepeat = false;
let updateTimer;

const musics = [
  {
    source: "src/Circles.mp3",
    title: "Circles",
    artist: "Post Malone",
    image: "images/HollywoodsBleeding.jpg",
    ident: "holybleed",
    color: "rgb(68, 68, 68)",
  },
  {
    source: "src/betty.mp3",
    title: "betty",
    artist: "Taylor Swift",
    image: "images/folklore.jpg",
    ident: "betty",
    color: "rgb(68, 68, 68)",
  },
  {
    source: "src/LostCause.mp3",
    title: "Lost Cause",
    artist: "Billie Eillish",
    image: "images/hte.jpg",
    ident: "hte",
    color: "#906D4D",
  },
  {
    source: "src/SongOfTime.mp3",
    title: "Song Of Time",
    artist: "Less Gravity",
    image: "images/sot.jpg",
    ident: "sot",
    color: "rgb(52, 100, 46)",
  },
  {
    source: "src/Starboy.mp3",
    title: "Starboy",
    artist: "The Weeknd",
    image: "images/Starboy.png",
    ident: "starboy",
    color: "#4d000e",
  },
  {
    source: "src/happinessisabutterfly.mp3",
    title: "Happiness is a butterfly",
    artist: "Lana Del Rey",
    image: "images/nfr.png",
    ident: "nfr",
    color: "#800d22",
  },
  {
    source: "src/Supercut.mp3",
    title: "Supercut",
    artist: "Lorde",
    image: "images/melodrama.webp",
    ident: "melodrama",
    color: "#0a3b8b",
  },
];

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
  bar1.id = musics[trackIndex].ident;
  bar2.id = musics[trackIndex].ident;
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

// HTML events


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


// ------------------


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