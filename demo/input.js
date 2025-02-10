const keys = {}

document.addEventListener('keydown', ({ key }) => keys[key] = true)
document.addEventListener('keyup', ({ key }) => keys[key] = false)

export const pressed = k => (keys[k] == true)
