export class Point {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    advance(d) {
        this.x += Math.cos(this.angle) * d;
        this.y += Math.sin(this.angle) * d;
    }

    distance(point) {
        return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2);
    }
}
