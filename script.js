const frameCount = 240;
const canvas = document.getElementById("scrollCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function currentFrame(index) {
    return `frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
}

const images = [];

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

function render(index) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
}

window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor((scrollTop / maxScroll) * frameCount)
    );

    render(frameIndex);
});

images[0].onload = () => {
    render(0);
};

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
