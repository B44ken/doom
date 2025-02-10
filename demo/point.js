export const point = (x = 0, y = 0, angle = 0) => ({ x, y, angle })

export const advance = (p, d) => {
    p.x += Math.cos(p.angle) * d
    p.y += Math.sin(p.angle) * d
}

export const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
