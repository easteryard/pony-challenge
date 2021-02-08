import { difference } from 'lodash'
import DirectionEnum from './DirectionEnum'



export function getMovableDirections (mazeData, currentLocIndex, mazeWidth) {
    const westAndNorth = mazeData[currentLocIndex]
    const east = mazeData[currentLocIndex + 1]
    const south = mazeData[currentLocIndex + mazeWidth]
    const currentLocWalls = westAndNorth.concat(east, south)

    const directions = Object.values(DirectionEnum)
    const movableDirections = difference(directions, currentLocWalls)
    console.log('movDir: ', movableDirections)
    return movableDirections
}
