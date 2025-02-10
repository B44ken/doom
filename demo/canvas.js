const context = canvas.getContext('2d')
const width = canvas.width = 800
const height = canvas.height = 450
const image = context.createImageData(width, height)

export const setPixel = (x, y, color) => {
    const i = (y * width + x) * 4
    image.data[i] = color
    image.data[i + 1] = color
    image.data[i + 2] = color
    image.data[i + 3] = 255
}

export const drawLoop = render => {
    render()
    context.putImageData(image, 0, 0)
    requestAnimationFrame(() => drawLoop(render))
}
