import Canvas from "./canvas.js"
import Grid from "./grid.js"
import Point from "./point.js"
import Keyboard from "./input.js"

const canvasWidth = 200
const canvasHeight = Math.round(canvasWidth * 9 / 16)
const canvas = new Canvas(document.querySelector('canvas'), canvasWidth, canvasHeight)
const keysDown = new Keyboard()
const player = new Point(3, 3, 0)
const map = Grid.fromString(`
@@@@@@@@@@@@@@@@@
@          @    @
@          @    @
@          @    @
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

const wallDistance = (player, angle) => {
    const ray = new Point(player.x, player.y, angle)
    while (ray.distance(player) < 15) {
        ray.advance(0.1)
        if (map.get(ray.x, ray.y) != ' ')
            return ray.distance(player)
    }
    return Infinity
}

const render = (FOV = Math.PI / 3) => {
    for (let x = 0; x < canvasWidth; x++) {
        const angle = getAngle(x, canvasWidth, FOV)
        const height = canvasHeight / wallDistance(player, angle)
        for (let y = 0; y < canvasHeight; y++) {
            canvas.set(x, y, '#000');
            if (y > (canvasHeight / 2) - height && y < (canvasHeight / 2) + height)
                canvas.set(x, y, '#fff');
        }
    }
}

canvas.drawLoop(render)