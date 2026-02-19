const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 240;
const currentFrame = index =>
  `frames/ezgif-frame-${String(index).padStart(3, '0')}.png`;

const images = [];
const image = new Image();
let loadedImages = 0;

for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);

  img.onload = () => {
    loadedImages++;
    if (loadedImages === frameCount) {
      render();
    }
  };
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
}

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
