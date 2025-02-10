import Canvas from "./canvas.js"
import Grid from "./grid.js"
import Point from "./point.js"
import Keyboard from "./input.js"

const canvasWidth = 400
const canvasHeight = Math.round(canvasWidth * 9 / 16)
const canvas = new Canvas(document.querySelector('canvas'), canvasWidth, canvasHeight)

const keysDown = new Keyboard()
const player = new Point(3, 3, 0)
const map = Grid.fromString(`
@@@@@@@@@@@@@@@@@
@          @    @
@          @    @
@   +      @    @
@          @@  @@
@               @
@   @@     @    @
@   @@@    @    @
@   @@     @    @
@          @    @
@@@@@@@@@@@@@@@@@
`.trim())

setInterval(() => {
    const step = (dist) => {
        player.advance(dist)
        if (map.get(player.x, player.y) != ' ')
            player.advance(-dist)
    }
    if (keysDown.pressed('w'))
        step(0.05)
    if (keysDown.pressed('s'))
        step(-0.05)
    if (keysDown.pressed('a'))
        player.angle -= 0.02
    if (keysDown.pressed('d'))
        player.angle += 0.02
}, 10)

const getAngle = (x, width, FOV = Math.PI / 3) =>
    player.angle - FOV / 2 + x * FOV / width

const raycast = (pos, angle) => {
    const ray = new Point(pos.x, pos.y, angle);
    while (map.get(ray.x, ray.y) == ' ') {
        ray.advance(0.05);
        if (pos.distance(ray) > 15)
            return null;
    }
    return ray;
}

const getSlice = (x) => {
    const ray = raycast(player, getAngle(x, canvasWidth));
    const distance = ray ? player.distance(ray) : 10000;
    const height = Math.atan(2 / distance) * canvasHeight;

    const fade = 255 - (distance * 20)
    const color = fade

    return { color, height }
}

function render() {
    const slices = []
    for(let x = 0; x < canvasWidth; x++) {
        slices.push((getSlice(x).height / canvasHeight).toPrecision(3))
        const { color, height } = getSlice(x);

        let minHeight = canvasHeight / 2 - height / 2;
        let maxHeight = canvasHeight / 2 + height / 2;

        for(let y = 0; y < canvasHeight; y++) {
            if(y > minHeight && y < maxHeight)
                canvas.set(x, y, color)
            else if (y < canvasHeight / 2)
                canvas.set(x, y, 255)
            else
                canvas.set(x, y, 128)
        }
    }
    return slices;
}

const slices = render()
console.log(`float slices[${slices.length}] = (${slices.join(',')})`)


canvas.drawLoop(render)
