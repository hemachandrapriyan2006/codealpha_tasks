const audio = new Audio();

const songs = [
    {
        title: "Hip Hop 02",
        artist: "by Lily J",
        src: "song1.mp3",
        cover: "image1.jpg"
    },
    {
        title: "Praise the Lord",
        artist: "by Arulo",
        src: "song2.mp3",
        cover: "image2.jpg"
    }
];

let songIndex = 0;

// Elements
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");

// Load song
function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
}

// Play / Pause
function playPause() {
    audio.paused ? audio.play() : audio.pause();
}

// Next & Previous
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
}

// Update progress
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Autoplay next song
audio.addEventListener("ended", nextSong);

// Playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => {
        songIndex = index;
        loadSong(songIndex);
        audio.play();
    };
    playlist.appendChild(li);
});

// Format time
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// Initialize
loadSong(songIndex);
volume.value = 0.5;
audio.volume = 0.5;
