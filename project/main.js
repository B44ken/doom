import { setPixel, drawLoop, canvasHeight, canvasWidth } from './utils.js'

function getWallHeight() {
    return 0.5
}

function draw() {
    const height = getWallHeight() * canvasHeight

    let minHeight = canvasHeight / 2 + height / 2
    let maxHeight = canvasHeight / 2 - height / 2

    for(let x = 0; x < canvasWidth; x++) {
        for(let y = 0; y < canvasHeight; y++) {
            if(y > minHeight && y < maxHeight)
                setPixel(x, y, [x, y, 0])
            else
                setPixel(x, y, [0, 0, 0])
        }
    }
}

drawLoop(draw)  