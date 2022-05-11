// Tidy up the code
const reusableBoxContents = `<div class="_reusableBox__boxFace _reusableBox__boxBack"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxFront"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxLeft"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxRight"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxBottom"></div>
                <div class="_reusableBox__boxFace _reusableBox__boxTop"></div>`;

Array.from(document.querySelectorAll(".reusableBox")).map(e => e.innerHTML = reusableBoxContents);

const headColorArrayOrder = [headBack, headFront, headLeft, headRight, headBottom, headTop];
const creeperHeadFaces = document.querySelectorAll(".creeperHead ._reusableBox__boxFace");
const creeperBodyFaces = document.querySelectorAll(".creeperBody ._reusableBox__boxFace");
const creeperLegs = document.querySelectorAll(".creeperLeg");

function fillFace(face, colorArray) {
    const newFragment = document.createDocumentFragment();
    for (let colorData of colorArray) {
        const newElement = document.createElement("div");
        newElement.style.background = colorData;
        newFragment.append(newElement);
    }
    face.append(newFragment);
}

function fillFaceRandom(face, rowCount, columnCount, randomColorArray) {
    const newFragment = document.createDocumentFragment();
    face.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
    face.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
    for (let i = 0; i < rowCount * columnCount; i++) {
        const newElement = document.createElement("div");
        newElement.style.background = pickRandom(randomColorArray);
        newFragment.append(newElement);
    }
    face.append(newFragment);
}

const bodyGridSize = [[12, 8], [12, 8], [12, 4], [12, 4], [4, 8], [4, 8]];
const legGridSize = [[6, 4], [6, 4], [6, 4], [6, 4], [4, 4], [4, 4]];

for (let i = 0; i < 6; i++) {
    fillFace(creeperHeadFaces[i], headColorArrayOrder[i]);
    fillFaceRandom(creeperBodyFaces[i], ...bodyGridSize[i], colorArray);
}

for (let creeperLeg of creeperLegs) {
    const creeperLegFaces = creeperLeg.querySelectorAll("._reusableBox__boxFace");
    for (let i = 0; i < 6; i++) {
        fillFaceRandom(creeperLegFaces[i], ...legGridSize[i], colorArray);
    }
    const creeperLegFront = creeperLeg.querySelector("._reusableBox__boxFront");
    Array.from(creeperLegFront.querySelectorAll("div")).forEach((e, i) => {
        if (i >= 16 && i < 20) {
            if (i % 2 === 0) {
                e.style.background = "#1c4c15";
            } else {
                e.style.background = "black";
            }
        } else if (i >= 20) {
            if (i % 2 === 0) {
                e.style.background = "black";
            } else {
                e.style.background = "#1c4c15";
            }
        }
    });
}

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

function explode() {
    this.classList.add("explode");
    setTimeout(() => {
        this.style.display = "none";
        document.body.style.background = "white";
        setTimeout(()=>{
            document.body.style.background = "rgba(255,0,0,0.3)"
        }, 200);
    }, 2100);
    this.removeEventListener("click", explode);
}

document.querySelector(".creeper").addEventListener("click", explode);