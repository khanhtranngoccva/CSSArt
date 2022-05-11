// Tidy up the code
const reusableBoxContents = `<div class="_reusableBox__boxFace _reusableBox__boxBack"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxFront"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxLeft"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxRight"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxBottom"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxTop"></div>`;
Array.from(document.querySelectorAll(".reusableBox")).map(e=>e.innerHTML = reusableBoxContents);

const canvas = document.querySelector(".canvas");
const sliders = document.querySelector("#sliders");
const camera = document.querySelector(".globalCamera");
const rotX = document.querySelector("#rotX");
const rotY = document.querySelector("#rotY");
const perspective = document.querySelector("#perspective");
const originX = document.querySelector("#originX");
const originY = document.querySelector("#originY");

let defaultRotateY = 40;
let defaultScale = `1.8`;

function setDefaultAngle() {
    camera.removeEventListener("animationend", setDefaultAngle);
    camera.style.transform = `scale(${defaultScale}) rotateY(${defaultRotateY}deg)`;
    document.querySelector("form").style.display = "flex";
    rotX.value = 0;
    rotY.value = defaultRotateY;
    // perspective.value = 1000;
    // originX.value = 0;
    // originY.value = -600;
}

document.querySelector("form").addEventListener("input", function() {
    // canvas.style.setProperty("--offsetPerspectiveY", originY.value + "px");
    // canvas.style.setProperty("--offsetPerspectiveX", originX.value + "px");
    // canvas.style.perspective = perspective.value + "px";
    camera.style.transform = `scale(1.8) rotateX(${rotX.value}deg) rotateY(${rotY.value}deg)`
})


document.querySelector("#toggle").addEventListener("click", function (e) {
    e.preventDefault();
    sliders.style.display = getComputedStyle(sliders).display === "none" ? "flex" : "none";
})

camera.addEventListener("animationend", setDefaultAngle);
