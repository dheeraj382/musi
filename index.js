  
async function get(folder){

    let n;
    function formatTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60); // Remove milliseconds
        return `${min}:${sec < 10 ? "0" + sec : sec}`; // Ensure two-digit seconds
    }
    
     
    





 
    






    







 
    let a= await fetch( `http://127.0.0.1:3000/${folder}/`);
    let b=await a.text()
    let div=document.createElement("div");
   div.innerHTML=b
   console.log("fetch",div)
let as=div.getElementsByTagName("a");
console.log( "link",as)
let songs=[];
for (let index = 0; index < as.length; index++) {
const element = as[index];
 if(element.href.endsWith(".mp3"))
 {
    songs.push(element.href.split(`/${folder}/`)[1]);
 }
} console.log("song list",songs)
//console.log("0 index",songs[0]);
showsongs(songs);
let currentsong = new Audio();

 
 function playmusic(track,pause=false)
{
 
    currentsong.src=(`/${folder}/`+track)
  
   if(!pause){
    currentsong.play();
    start_play.src="pause-stroke-rounded.svg"

     

   }
 
 
document.querySelector(".songinfo").innerHTML=track;
  
document.querySelector(".songtime").innerHTML="00/00";
 



}


function showsongs(songs){
let songul =document.querySelector(".songlist").getElementsByTagName("ul")[0];


    
    // Clear the previous song list before adding new songs
    songul.innerHTML = "";  // This clears the existing songs

//songul.innerHTML="";
 
 for (const song of songs) {
     songul.innerHTML=songul.innerHTML+`  <li   style="margin-left=0px;" >
     <img class="invert" src="icons8-music.svg"   style="width: 50px;" alt="">
      <div class="info "> 
           <div class="">${song}</div>
             <div> dheer</div>
     </div>
     play now
     <img class="invert" src="play-stroke-rounded.svg" alt="">
 </li>    `;
 }
//atach event listner 
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML)
    e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        //console.log(e.querySelector(".info").firstElementChild.innerHTML)
 let track=e.querySelector(".info").firstElementChild.innerHTML
playmusic(track);
 
})
});
  

let play=document.getElementById("start_play");
play.addEventListener("click",()=>{
    if(currentsong.paused){
        currentsong.play()
        play.src="pause-stroke-rounded.svg"
    }
    else{  
    currentsong.pause();
        play.src="play-stroke-rounded.svg"}
})
 
}

 currentsong.addEventListener("timeupdate",()=>{
  document.querySelector(".songtime").innerHTML=  `${formatTime(currentsong.currentTime)}/
  ${formatTime(currentsong.duration)}`;

document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100 +"%";
 })
//add vent listner to seek bar
 
 //
  

currentsong.addEventListener("loadedmetadata",()=>{
console.log(" y btra hai ki dura",currentsong.duration)
})

 document.querySelector(".seekbar").addEventListener("click",e=>{
     
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100 ;
     
        document.querySelector(".circle").style.left= percent + "%";
 
     n=((currentsong.duration)*percent)/100;
          
         // currentsong.currentTime= n;
       currentsong.currentTime=n;
          
         
           
   // currentsong.play()
       console.log("httttttttttttttttttttttttttttttttttttttt")
    })

    document.querySelector(".threeline").addEventListener("click",()=>{
        document.querySelector(".left").style.left=0;
    })

    document.querySelector(".cross").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-100%";
    })
 






 //addd event listner previous
 previous.addEventListener("click",()=>{
console.log("click pervious")
let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
 if((index-1)>=0){
    playmusic(songs[index-1])
 }
else{
    playmusic(songs[songs.length-1])
}
 })

 //addd event listner next 
 next.addEventListener("click",()=>{
    console.log("click next")
    
 
 //console.log(index);
 //playmusic(songs[index+1])
// console.log(currentsong.src,"y yyyyyyyyyyyyy")


  
 console.log(" new curnt song",songs.indexOf(currentsong.src.split("/").slice(-1)[0]))
  
 let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
 console.log(songs.length-2)
 if((index+1) <songs.length){
    
    playmusic(songs[index+1])
 }
   else{
    playmusic(songs[0])
   }
 })


 



// add event volume
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
currentsong.volume=parseInt(e.target.value)/100;
})












//loasing folder
  

Array.from(document.getElementsByClassName("card")).forEach(e=>{
    e.addEventListener("click", async item=>{
console.log(item.currentTarget.dataset.folder);  

    })
})

 
//daefault song
 playmusic(songs[0],true)

// 

}

 

get("so")
 

