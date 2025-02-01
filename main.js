import { Canvas } from "./canvas.js"
import { Grid } from "./grid.js"
import { Point } from "./point.js"

const width = 200
const height = Math.round(width * 9 / 16)
const canvas = new Canvas(document.querySelector('canvas'), width, height)

const map = Grid.fromString(`
                     @                  @
                                        @
                                        @
         M                              @
                                        @      
                                        @
`.trim())

const player = new Point(3, 3, 0)

const keysDown = new Set()
document.addEventListener('keydown', (event) => {
    keysDown.add(event.key)

})
document.addEventListener('keyup', (event) => {
    keysDown.delete(event.key)
})

const step = (dist) => {
    player.advance(dist)
    if (map.get(Math.floor(player.x), Math.floor(player.y)) === '@')
        player.advance(-dist)
}

setInterval(() => {
    if (keysDown.has('w'))
        step(0.05)
    if (keysDown.has('s'))
        step(-0.05)
    if (keysDown.has('a'))
        player.angle -= 0.02
    if (keysDown.has('d'))
        player.angle += 0.02
}, 10)



const distanceToWall = (map, point) => {
    const ray = new Point(point.x, point.y, point.angle)
    while (point.distance(ray) < 15) {
        ray.advance(0.1)
        if (map.get(Math.floor(ray.x), Math.floor(ray.y)) != ' ')
            return ({
                dist: point.distance(ray),
                hit: map.get(Math.floor(ray.x), Math.floor(ray.y))
            })
    }
    return ({ dist: Infinity, hit: ' ' })
}

const getDistances = (fov = Math.PI / 3) => {
    var angleMin = player.angle - fov / 2
    var angleMax = player.angle + fov / 2
    const distances = []
    for (let i = angleMin; i < angleMax; i += fov / width) {
        const point = new Point(player.x, player.y, i)
        const dtw = distanceToWall(map, point)
        dtw.dist *= Math.cos(player.angle - i)
        distances.push(dtw)
    }
    return distances
}

const render = () => {
    const distances = getDistances()
    for (var x = 0; x < width; x++) {
        const wallHeight = 1 / distances[x].dist
        const pixelHeight = wallHeight * height
        const scaled = 255 - Math.round(150 * (distances[x].dist / 15))
        let color
        if(distances[x].hit == 'M')
            color = `rgb(${scaled}, 0, 0)`
        else if(distances[x].hit == '@')
            color = `rgb(${scaled}, ${scaled}, ${scaled})`
        // const color = 'red'
        const mid = height/2
        for (var y = 0; y < height; y++) {
            if(y > mid + pixelHeight)
                canvas.set(x, y, '#066')
            else if(y > mid - pixelHeight)
                canvas.set(x, y, color)
            else
                canvas.set(x, y, '#fe9')
        }
    }
}

canvas.drawLoop(render)