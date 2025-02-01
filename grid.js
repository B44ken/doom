class Grid {
    constructor(x, y) {
        // this.grid = Array.from({ length: y }, () => Array.from({ length: x }, () => 0))
        this.grid = Array(y).fill().map(() => Array(x).fill(' '))
        this.size = [x, y]
    }

    get(x, y) {
        if(typeof x === 'object') {
            y = x.y
            x = x.x
        }

        if (x < 0 || x >= this.size[0] || y < 0 || y >= this.size[1])
            return 0
        
        return this.grid[Math.round(y)][Math.round(x)]
    }

    set(x, y, value) {
        this.grid[y][x] = value
    }

    toString() {
        return this.grid.map(row => row.join('')).join('\n')
    }

    static fromString(path) {
        const fileStr = path.split('\n')
        const grid = new Grid(fileStr[0].length, fileStr.length)
        for (let y = 0; y < fileStr.length; y++) {
            for (let x = 0; x < fileStr[y].length; x++) {
                grid.set(x, y, fileStr[y][x])
            }
        }
        return grid
    }
}

export { Grid }