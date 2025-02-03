export default class Keyboard {
    constructor() {
        this.keysDown = new Set()
        document.addEventListener('keydown', (event) =>
            this.keysDown.add(event.key))
        document.addEventListener('keyup', (event) =>
            this.keysDown.delete(event.key))
    }

    pressed(key) {
        return this.keysDown.has(key)
    }
}