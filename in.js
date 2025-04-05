
let currentsong = new Audio();
let songs = [];
let currentFolder = "";
//let isPaused = true;

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

function playmusic(track, pause = false) {
    currentsong.src = `/${currentFolder}/${track}`;
    if (!pause) {
        currentsong.play();
        isPaused = false;
        document.getElementById("start_play").src = "pause-stroke-rounded.svg";
    } else {
        isPaused = true;
        document.getElementById("start_play").src = "play-stroke-rounded.svg";
    }
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00/00";
}

function showsongs(songs) {
    let songul = document.querySelector(".songlist ul");
    songul.innerHTML = "";

    for (const song of songs) {
        songul.innerHTML += `
        <li style="margin-left=0px;">
            <img class="invert" src="icons8-music.svg" style="width: 50px;" alt="">
            <div class="info">
                <div>${song}</div>
                <div>dheer</div>
            </div>
            play now
            <img class="invert" src="play-stroke-rounded.svg" alt="">
        </li>`;
    }

    Array.from(document.querySelectorAll(".songlist li")).forEach(e => {
        e.addEventListener("click", () => {
            let track = e.querySelector(".info").firstElementChild.innerHTML;
            playmusic(track);
        });
    });
}
 


async function get(folder) {
    currentFolder = folder;
    currentsong.pause();
    currentsong.currentTime = 0;

        let res = await fetch(`${folder}/songs.json`);
    let html = await res.text();
    let div = document.createElement("div");
    div.innerHTML = html;

    let as = div.getElementsByTagName("a");
    songs = [];

    for (let element of as) {
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

    console.log("Fetched songs:", songs);
    showsongs(songs);

    // Play first song but paused
    playmusic(songs[0], true);
}

// Bind once: Play button
document.getElementById("start_play").addEventListener("click", () => {
    if (currentsong.src) {
        if (currentsong.paused) {
            currentsong.play();
            document.getElementById("start_play").src = "pause-stroke-rounded.svg";
        } else {
            currentsong.pause();
            document.getElementById("start_play").src = "play-stroke-rounded.svg";
        }
    }
});

// Bind once: Previous
document.getElementById("previous").addEventListener("click", () => {
    let current = currentsong.src.split("/").pop();
    let index = songs.indexOf(current);
    if (index > 0) {
        playmusic(songs[index - 1]);
    } else {
        playmusic(songs[songs.length - 1]);
    }
});

// Bind once: Next
document.getElementById("next").addEventListener("click", () => {
    let current = currentsong.src.split("/").pop();
    let index = songs.indexOf(current);
    if (index < songs.length - 1) {
        playmusic(songs[index + 1]);
    } else {
        playmusic(songs[0]);
    }
});

// Time update for seek bar & duration
currentsong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML =
        `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`;
    document.querySelector(".circle").style.left =
        (currentsong.currentTime / currentsong.duration) * 100 + "%";
});

// Seekbar click
document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width);
    currentsong.currentTime = currentsong.duration * percent;
});

// Volume change
document.querySelector(".range input").addEventListener("change", e => {
    currentsong.volume = parseInt(e.target.value) / 100;
});

// Sidebar show/hide
document.querySelector(".threeline").addEventListener("click", () => {
    document.querySelector(".left").style.left = 0;
});
document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%";
});

// Folder cards
Array.from(document.getElementsByClassName("card")).forEach(e => {
    e.addEventListener("click", async item => {
        let folder = item.currentTarget.dataset.folder;
        await get(folder);
    });
});
document.querySelector(".sign").addEventListener("click",async(e)=>{
    
    window.location.href = "sign.html";
     })




     


  // Check localStorage flag
   
  const user = localStorage.getItem("username");

  if (user) {
    const btn = document.querySelector(".button");
    if (btn) {
      btn.textContent = "Hello " + user;
    }
  }

// Default folder load
get("so");

