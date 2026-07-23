// ================================
// Puttu Panchalu Invitation
// ================================

const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const card = document.getElementById("card");
const music = document.getElementById("music");

const canvas = document.getElementById("scratch");
const ctx = canvas.getContext("2d");

let scratching = false;

// -----------------------
// Open Invitation
// -----------------------

openBtn.addEventListener("click", () => {

    cover.style.display = "none";

    card.style.display = "block";
    card.classList.add("show");

    setupScratch();

    music.play().catch(() => {
        console.log("Music blocked until user interaction.");
    });

    startFlowers();

});

// -----------------------
// Flower Animation
// -----------------------

function startFlowers() {

    setInterval(() => {

        const flower = document.createElement("div");

        flower.className = "flower";

        flower.innerHTML = "🌸";

        flower.style.left = Math.random() * 100 + "vw";

        flower.style.fontSize = (20 + Math.random() * 20) + "px";

        flower.style.animationDuration =
            (5 + Math.random() * 5) + "s";

        document.body.appendChild(flower);

        setTimeout(() => {

            flower.remove();

        },10000);

    },300);

}

// -----------------------
// Scratch Layer
// -----------------------

function setupScratch(){

    canvas.width = card.offsetWidth;

    canvas.height = card.offsetHeight;

    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "#d4af37";

    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#ffffff";

    ctx.textAlign = "center";

    ctx.font = "bold 28px Arial";

    ctx.fillText(
        "✨ Scratch Here ✨",
        canvas.width/2,
        canvas.height/2
    );

    ctx.globalCompositeOperation = "destination-out";

}

// -----------------------
// Scratch Function
// -----------------------

function scratch(x,y){

    ctx.beginPath();

    ctx.arc(x,y,30,0,Math.PI*2);

    ctx.fill();

}

// -----------------------
// Mouse Support
// -----------------------

canvas.addEventListener("mousedown",()=>{

    scratching = true;

});

canvas.addEventListener("mouseup",()=>{

    scratching = false;

    checkScratch();

});

canvas.addEventListener("mousemove",(e)=>{

    if(!scratching) return;

    const rect = canvas.getBoundingClientRect();

    scratch(
        e.clientX-rect.left,
        e.clientY-rect.top
    );

});

// -----------------------
// Mobile Touch Support
// -----------------------

canvas.addEventListener("touchstart",(e)=>{

    scratching = true;

    e.preventDefault();

});

canvas.addEventListener("touchend",()=>{

    scratching = false;

    checkScratch();

});

canvas.addEventListener("touchmove",(e)=>{

    if(!scratching) return;

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const touch = e.touches[0];

    scratch(
        touch.clientX-rect.left,
        touch.clientY-rect.top
    );

});

// -----------------------
// Remove Layer After 60%
// -----------------------

function checkScratch(){

    const pixels = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    let transparent = 0;

    for(let i=3;i<pixels.data.length;i+=4){

        if(pixels.data[i]===0){

            transparent++;

        }

    }

    const percent =
        transparent /
        (canvas.width*canvas.height);

    if(percent>0.60){

        canvas.style.transition="1s";

        canvas.style.opacity="0";

        setTimeout(()=>{

            canvas.style.display="none";

        },1000);

    }

}
