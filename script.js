const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const card = document.getElementById("card");
const music = document.getElementById("music");

openBtn.addEventListener("click", function () {

    // Hide cover
    cover.style.display = "none";

    // Show invitation
    card.style.display = "block";
    card.classList.add("show");

    // Start music
    music.play().catch(() => {
        console.log("Music autoplay blocked until user interaction.");
    });

    // Create flower petals
    createFlowers();

});

// Flower animation
function createFlowers() {

    setInterval(function(){

        let flower = document.createElement("div");

        flower.innerHTML = "🌸";

        flower.style.position = "fixed";
        flower.style.left = Math.random()*100 + "vw";
        flower.style.top = "-50px";
        flower.style.fontSize = (20 + Math.random()*20)+"px";
        flower.style.zIndex = "999";

        document.body.appendChild(flower);

        let pos = -50;

        let timer = setInterval(function(){

            pos += 4;

            flower.style.top = pos+"px";
            flower.style.transform =
                "rotate("+pos+"deg)";

            if(pos>window.innerHeight){

                clearInterval(timer);
                flower.remove();

            }

        },30);

    },400);

}
