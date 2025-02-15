// the map
const mapString = `
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@          @    @             @
@          @                  @
@   +      @    @    @@@@@@@@@@
@          @@  @@             @
@               @             @
@   @@@    @    @@@@@@@@@     @
@   @@@    @    @             @
@   @@@    @    @             @
@          @    @             @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`.split("\n");

export const getMap = (x, y) =>
    mapString?.[Math.floor(y)]?.[Math.floor(x)] || " ";

// canvas
const context = canvas.getContext("2d");
export const canvasWidth = (canvas.width = 320),
    canvasHeight = (canvas.height = 200);

// image data lets us modify the pixels directly
const image = context.createImageData(canvas.width, canvas.height);

export const setPixel = (x, y, color) => {
    const i = (y * canvasWidth + x) * 4;
    image.data[i] = color[0];
    image.data[i + 1] = color[1];
    image.data[i + 2] = color[2];
    image.data[i + 3] = 255;
};

const image32 = new Uint32Array(image.data.buffer);
export const setPixel32 = (x, y, color) =>
    (image32[y * canvasWidth + x] = color);

for (let i = 0; i < image32.length; i++) image32[i] = 0xffffffff;

export const drawLoop = (render) => {
    render();
    context.putImageData(image, 0, 0);
    requestAnimationFrame(() => drawLoop(render));
};

// point functions
export const point = (x = 0, y = 0, angle = 0) => ({ x, y, angle });
export const advance = (p, d) => {
    p.x += Math.cos(p.angle) * d;
    p.y += Math.sin(p.angle) * d;
};
export const distance = (p1, p2) =>
    Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

// key set
export const keys = {};
document.addEventListener("keydown", ({ key }) => (keys[key] = true));
document.addEventListener("keyup", ({ key }) => (keys[key] = false));
