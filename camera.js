class Camera {
    constructor(grid, pos, angle, fov) {
        this.grid = grid;
        this.pos = pos;
        this.angle = angle;
        this.fov = fov;
    }

    raycast() {
        const dx = Math.cos(this.angle);
        const dy = Math.sin(this.angle);
        let distance = 0;
        while (distance < 32) {
            distance += 0.01;
            const x = this.pos.x + dx * distance;
            const y = this.pos.y + dy * distance;
            if (this.grid.get(x, y) !== " ") {
                return distance;
            }
        }
        return distance;
    }

    angularDiameter(distance) {
        return 2 * Math.atan(1 / (2 * distance));
    }

    getStrips(n) {
        const strips = [];
        for (let i = 0; i < n; i++) {
            const angle = this.angle - this.fov / 2 + i * this.fov / n;
            const distance = this.raycast(angle);
            const height = this.angularDiameter(distance);
            strips.push(height);
        }
        return strips;
    }
}

export { Camera };