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