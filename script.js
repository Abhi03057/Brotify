console.log("Welcome to Brotify");
let audioElement = new Audio('Linkin Park - In The End.mp3');
let songIndex = 0;
let masterplay = document.getElementById("masterplay");
let myprogressBar = document.getElementById("progress");
let songdisplay = Array.from(document.getElementsByClassName("songdisplay"));
let mastersongname = document.getElementById("mastersongname");
let previousButton = document.getElementById('previous');
let nextButton = document.getElementById('next');
let masterplayIcon = document.querySelector('#masterplay'); // For the play/pause button (no icon anymore, it's a button now)

let songs = [
    { songName: "In the End", filePath: "Linkin Park - In The End.mp3", coverpath: "https://i.pinimg.com/originals/fc/25/27/fc252706d432fa2dd0a5d2e41b6897d1.png" },
    { songName: "JOKER", filePath: "Dax-JOKER-(CeeNaija.com).mp3", coverpath: "https://hiphopcanada.com/wp-content/uploads/2020/05/dax-joker-688w-1.jpg" },
    { songName: "FE!N", filePath: "Travis Scott Ft. Playboi Carti – FE!N_(Naijaflavour.com).mp3", coverpath: "https://925thebeat.com/wp-content/uploads/2023/09/Travis_Scott_Songs_by_Talmage_Garn-1000x600.jpg" },
    { songName: "Perfect", filePath: "One Direction - Perfect.mp3", coverpath: "https://images-na.ssl-images-amazon.com/images/I/91Sw0Hbc10L._SL1500_.jpg" },
    { songName: "Numb", filePath: "Linkin Park - NUMB.mp3", coverpath: "https://i.pinimg.com/originals/fc/25/27/fc252706d432fa2dd0a5d2e41b6897d1.png" },
];

// Function to make all play icons switch back to play
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("fa-circle-pause")).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Function to update the song details and play it
const playSong = (index) => {
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    mastersongname.innerText = songs[index].songName;
    document.querySelector(".songphoto").style.backgroundImage = `url(${songs[index].coverpath})`;

    masterplay.textContent = "Pause"; // Set the master play button text to "Pause"
};

// Function to pause song and update UI
const pauseSong = () => {
    audioElement.pause();
    masterplay.textContent = "Play"; // Set the master play button text to "Play"
};

// Event listeners for play/pause functionality for the song suggestions
Array.from(document.getElementsByClassName("fa-circle-play")).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays(); // Make sure all other songs are switched back to play
        songIndex = i; // Set the song index to the clicked song
        playSong(songIndex); // Play the selected song

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
    });
});

// Master play/pause button event listener
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex); // Play current song
        makeAllPlays(); // Reset icons to play for other songs
        document.querySelectorAll('.fa-circle-play')[songIndex].classList.add('fa-circle-pause');
        document.querySelectorAll('.fa-circle-play')[songIndex].classList.remove('fa-circle-play');
    } else {
        pauseSong(); // Pause current song
        makeAllPlays(); // Reset all icons to play
    }
});

// Time update event to update the progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressBar.value = progress;
});

// Seekbar change event listener
myprogressBar.addEventListener('change', () => {
    audioElement.currentTime = myprogressBar.value * audioElement.duration / 100;
});

// Next button functionality
nextButton.addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1; // Loop back to the start if we're at the last song
    playSong(songIndex); // Play the next song
    makeAllPlays(); // Reset all play buttons
    document.querySelectorAll('.fa-circle-play')[songIndex].classList.add('fa-circle-pause');
    document.querySelectorAll('.fa-circle-play')[songIndex].classList.remove('fa-circle-play');
});

// Previous button functionality
previousButton.addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1; // Loop back to the last song if we're at the first song
    playSong(songIndex); // Play the previous song
    makeAllPlays(); // Reset all play buttons
    document.querySelectorAll('.fa-circle-play')[songIndex].classList.add('fa-circle-pause');
    document.querySelectorAll('.fa-circle-play')[songIndex].classList.remove('fa-circle-play');
});
