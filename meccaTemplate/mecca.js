// Tidy up the code
(function reusableBox() {
    const reusableBoxContents = `<div class="_reusableBox__boxFace _reusableBox__boxBack _lighting"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxFront _lighting"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxLeft _lighting"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxRight _lighting"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxBottom _lighting"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxTop _lighting"></div>`;
    Array.from(document.querySelectorAll(".reusableBox")).forEach(e => e.innerHTML = reusableBoxContents);
})();

// Meme number go brr.
const cylinderStripCount = 99;
const reusableCylinderContents = `<div class="_reusableCylinder__cylinderFace _reusableCylinder__cylinderTop _lighting"></div>` + `<div class="_reusableCylinder__cylinderFace _reusableCylinder__cylinderStrip _lighting"></div>`.repeat(cylinderStripCount) + `<div class="_reusableCylinder__cylinderFace _reusableCylinder__cylinderBottom _lighting"></div>`;
const baseStripAngle = 2 * Math.PI / cylinderStripCount;


Array.from(document.querySelectorAll(".reusableCylinder")).forEach(e => {
    e.innerHTML = reusableCylinderContents;
    Array.from(e.querySelectorAll("._reusableCylinder__cylinderStrip")).forEach((cylinderStrip, cylinderStripNumber) => {
        cylinderStrip.style.transform = `rotateY(${cylinderStripNumber / cylinderStripCount}turn) translateZ(var(--radius))`;
        cylinderStrip.style.setProperty("--width", `calc(2px + var(--radius) * ${2 * Math.tan(baseStripAngle / 2)})`);
    });
});

function activateCamera() {
    const [minRotX, maxRotX] = [-60, 60];
    const [minRotY, maxRotY] = [-180, 180];
    const camera = document.querySelector(".globalCamera");
    window.addEventListener("mousemove", function (e) {
        let {clientX, clientY} = e;
        let percentageX = clientX / window.innerWidth;
        let percentageY = clientY / window.innerHeight;
        let rotX = -(minRotX + (maxRotX - minRotX) * percentageY);
        let rotY = minRotY + (maxRotY - minRotY) * percentageX;
        camera.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
}

let photonLight = new Photon.Light();
for (let element of document.querySelectorAll("._lighting")) {
    new Photon.Face(element, 0.15, 0).render(photonLight, true);
}
activateCamera();