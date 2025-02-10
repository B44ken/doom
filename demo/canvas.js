export default class Canvas {
    constructor(canvas, width, height) { 
        this.canvas = canvas;
        canvas.width = width;
        canvas.height = height;
        this.context = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.image = this.context.createImageData(width, height);
        this.image.data.fill(255);
    }

    set(x, y, color) {
        const i = (y * this.width + x) * 4;
        this.image.data[i] = color;
        this.image.data[i + 1] = color;
        this.image.data[i + 2] = color;
        this.image.data[i + 3] = 255;
    }

    drawGrid() {
        this.context.putImageData(this.image, 0, 0);
    }

    drawLoop(render) {
        render()
        this.drawGrid()
        requestAnimationFrame(() => this.drawLoop(render))
    }

    clear() { }
}