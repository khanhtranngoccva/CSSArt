// Code for the reusable box
(function reusableBox() {
    const reusableBoxContents = `<div class="_reusableBox__boxFace _reusableBox__boxBack _lighting"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxFront _lighting"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxLeft _lighting"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxRight _lighting"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxBottom _lighting"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxTop _lighting"></div>`;
    Array.from(document.querySelectorAll(".reusableBox")).forEach(e => e.innerHTML = reusableBoxContents);
})();

// Code for the donut.
(function donut() {
    const cylinderInDonutCount = 42;
    const baseCylinderAngle = 2 * Math.PI / cylinderInDonutCount;
    const reusableDonutContents = `<div class="reusableCylinder"></div>`.repeat(cylinderInDonutCount);
    Array.from(document.querySelectorAll(".reusableDonut")).forEach(e => {
        e.innerHTML = reusableDonutContents;
        Array.from(e.querySelectorAll(".reusableCylinder")).forEach((cylinderStrip, cylinderStripNumber) => {
            cylinderStrip.style.transform = `rotateY(${cylinderStripNumber / cylinderInDonutCount}turn) translateZ(calc(var(--donutRadius) - var(--thickness) / 2)) rotateY(90deg) rotateX(90deg)`;
            cylinderStrip.style.setProperty("--height", `calc(var(--donutRadius) * ${2 * Math.tan(baseCylinderAngle / 2)})`);
        });
    });
})();

// Code for the cylinder.
(function cylinder() {
    const cylinderStripCount = 42;
    const reusableCylinderContents = `<div class="_reusableCylinder__cylinderFace _reusableCylinder__cylinderTop _lighting"></div>` + `<div class="_reusableCylinder__cylinderFace _reusableCylinder__cylinderStrip _lighting"></div>`.repeat(cylinderStripCount) + `<div class="_reusableCylinder__cylinderFace _reusableCylinder__cylinderBottom _lighting"></div>`;
    const baseStripAngle = 2 * Math.PI / cylinderStripCount;

    const thickCylinderContents = `<div class="reusableCylinder"></div><div class="reusableCylinder reusableCylinderInner"></div>`

    Array.from(document.querySelectorAll(".reusableThickCylinder")).forEach(e => e.innerHTML = thickCylinderContents);
    Array.from(document.querySelectorAll(".reusableCylinder")).forEach(e => {
        e.innerHTML = reusableCylinderContents;
        Array.from(e.querySelectorAll("._reusableCylinder__cylinderStrip")).forEach((cylinderStrip, cylinderStripNumber) => {
            cylinderStrip.style.transform = `rotateY(${cylinderStripNumber / cylinderStripCount}turn) translateZ(var(--radius))`;
            cylinderStrip.style.setProperty("--width", `calc(var(--radius) * ${2 * Math.tan(baseStripAngle / 2)})`);
        });
    });
})();

// Code for the camera.
(function activateCamera() {
    const [minRotX, maxRotX] = [-60, 60];
    const [minRotY, maxRotY] = [-180, 180];
    const camera = document.querySelector(".globalCamera");
    window.addEventListener("mousemove", function (e) {
        const {clientX, clientY} = e;
        const percentageX = clientX / window.innerWidth;
        const percentageY = clientY / window.innerHeight;
        const rotX = -(minRotX + (maxRotX - minRotX) * percentageY);
        const rotY = minRotY + (maxRotY - minRotY) * percentageX;
        camera.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
})();

// Lights, camera, ACTION! 
const photonLight = new Photon.Light(0, 0, 180);
const camera = document.querySelector(".globalCamera");
const globalFace = new Photon.FaceGroup(camera, Array.from(document.querySelectorAll("._lighting")), 0.2, 0, true);
globalFace.render(photonLight, true);


// The layer.
const duration = 5;
const liquidLayers = Array.from(document.querySelectorAll(".recursiveLiquidLayer"));
const liquidLayerCount = liquidLayers.length;
liquidLayers.forEach((layer, number) => {
   layer.style.animationDuration = `${duration}s`;
   layer.style.animationDelay = -duration * 1.2 * number / liquidLayerCount + "s";
});