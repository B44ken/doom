// import { drawLoop, setPixel } from "./canvas.js"
// import { getMap } from "./grid.js"
// import { point, advance, distance } from "./point.js"
// import { pressed  } from "./input.js"

import { canvasWidth, canvasHeight, drawLoop, setPixel, setPixel32, getMap, point, advance, distance, keys } from "./utils.js"

let player = point(3, 3, 0)

setInterval(() => {
    const step = (dist) => {
        advance(player, dist)
        if (getMap(player.x, player.y) != ' ')
            advance(player, -dist)
    }
    if (keys['w']) step(0.05)
    if (keys['s']) step(-0.05)
    if (keys['a']) player.angle -= 0.02
    if (keys['d']) player.angle += 0.02
    if (keys[' ']) shoot()
}, 10)

const raycast = (pos, angle) => {
    let ray = point(pos.x, pos.y, angle);
    while (getMap(ray.x, ray.y) == ' ') {
        advance(ray, 0.05)
        for(const enemy of enemies)
            if(distance(ray, enemy.point) < 0.25 && enemy.alive)
                return { ray, enemy };
        if (distance(pos, ray) > 15)
            return null
    }
    return { ray, wall: getMap(ray.x, ray.y) };
}

const shoot = () => {
    const { enemy } = raycast(player, player.angle)
    if(enemy?.alive)
        enemy.alive = false
}

const getSlice = (x, FOV = Math.PI / 3) => {
    const angle = player.angle - FOV / 2 + x * FOV / canvasWidth;
    const cast = raycast(player, angle)
    if(!cast?.ray)
        return { color: null, height: 0 }
    const d = distance(player, cast.ray)
    if(cast.enemy)
        return {
            color: [255, 0, 0],
            height: Math.atan(2 / d) * canvasHeight
        }
    const val = 255 - d * 10
    if(cast.wall)
        return {
            color: [val, val, val],
            height: Math.atan(2 / d) * canvasHeight
        }
    else
        return {
            color: [0, 0, 0],
            height: 0
        }
}

const enemies = [
    { point: point(6, 6, 0), alive: true },
    { point: point(20, 10, 0), alive: true },
]

function render() {
    const slices = []
    for(let x = 0; x < canvasWidth; x++) {
        slices.push((getSlice(x).height / canvasHeight))
        const { color, height } = getSlice(x);

        let minHeight = canvasHeight / 2 - height / 2;
        let maxHeight = canvasHeight / 2 + height / 2;

        for(let y = 0; y < canvasHeight; y++) {
            if(y < minHeight)
                setPixel32(x, y, 0xaaeeffff)
            if(y > minHeight && y < maxHeight)
                setPixel(x, y, color)
            if(y > maxHeight)
                setPixel32(x, y, 0x777777ff)
        }
    }
    return slices;
}

drawLoop(render)
