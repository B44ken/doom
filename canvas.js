export default class Canvas {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.setupGrid(width, height);
    }

    set(x, y, color) {
        if (this.grid[y] === undefined || this.grid[y][x] === undefined)
            return
        this.grid[y][x] = color
    }

    setupGrid(width, height) {
        this.canvas.width = width
        this.canvas.height = height
        this.grid = Array(height).fill(0).map(() => Array(width).fill('#fff'))
    }

    drawGrid() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.beginPath()
        for (const y in this.grid) {
            for (const x in this.grid[y]) {
                this.context.fillStyle = this.grid[y][x]
                this.context.fillRect(x, y, 1, 1)
            }
        }
        this.context.fill();
    }

    drawLoop(render) {
        console.log('drawLoop')
        this.drawGrid()
        render()
        setTimeout(() =>
            requestAnimationFrame(() => this.drawLoop(render))
        , 10)
    }
}