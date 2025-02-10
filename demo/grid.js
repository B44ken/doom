const mapString = `
@@@@@@@@@@@@@@@@@
@          @    @
@          @    @
@   +      @    @
@          @@  @@
@               @
@   @@     @    @
@   @@@    @    @
@   @@     @    @
@          @    @
@@@@@@@@@@@@@@@@@`.split('\n')

export const getMap = (x, y) =>
    mapString?.[Math.floor(y)]?.[Math.floor(x)] || ' '
