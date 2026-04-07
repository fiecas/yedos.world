const BOX_SIZE = 30;
const BIG_BOX_SIZE = BOX_SIZE * 5;

const genBackground = () => {
    const backgroundEl = document.getElementById("background");
    if (!backgroundEl) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const numBigBoxes =
        (Math.floor(screenWidth / BIG_BOX_SIZE) + 2) *
        (Math.floor(screenHeight / BIG_BOX_SIZE) + 2);

    backgroundEl.innerHTML = "";
    for (let i = 0; i < numBigBoxes; i++) {
        let bigBoxEl = document.createElement("div");
        bigBoxEl.className = "box big";

        for (let i = 0; i < 25; i++) {
            let boxEl = document.createElement("div");
            boxEl.classList = "box";
            boxEl.style.width = BOX_SIZE + "px";
            boxEl.style.height = BOX_SIZE + "px";

            bigBoxEl.appendChild(boxEl);
        }

        backgroundEl.appendChild(bigBoxEl);
    }
};

genBackground();
window.onresize = genBackground;
