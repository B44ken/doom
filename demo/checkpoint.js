import { canvasHeight, canvasWidth, drawLoop, point, setPixel, distance, advance, getMap } from './utils.js'

const player = point(3, 3, 0)

function raycast(ray) {
    while(getMap(ray.x, ray.y) == " ")
        advance(ray, 0.05)
    return ray
}   

function getHeight(x) {
    const FOV = Math.PI / 2

    const ray = point(player.x, player.y, player.angle)
    ray.angle += (-FOV / 2) + (FOV * x / canvasWidth)
    const hit = raycast(ray)

    if(hit == null)
        return 0
    return 1 / distance(player, hit)
}

function render() {
    for(let x = 0; x < canvasWidth; x++) {

        let minHeight = canvasHeight / 2
        let maxHeight = canvasHeight / 2

        const height = getHeight(x)

        minHeight -= canvasHeight * height / 2
        maxHeight += canvasHeight * height / 2

        for(let y = 0; y < canvasHeight; y++) {
            if(y > minHeight && y < maxHeight)
                setPixel(x, y, [x, y, 0])
            else
                setPixel(x, y, [0, 0, 0])
        }
    }
}

drawLoop(render)