import DirectionEnum from '../enums/DirectionEnum'
import { difference } from 'lodash'

export default function getMovableDirections (mazeData, currentLocIndex, mazeWidth) {
    const currentLocWalls = mazeData[currentLocIndex]

    const eastLocWalls = mazeData[currentLocIndex + 1]
    if (hasWallInDirection(eastLocWalls, DirectionEnum.WEST)) {
        currentLocWalls.push(DirectionEnum.EAST)
    }

    const southLocWalls = mazeData[currentLocIndex + mazeWidth]
    if (hasWallInDirection(southLocWalls, DirectionEnum.NORTH)) {
        currentLocWalls.push(DirectionEnum.SOUTH)
    }

    const directions = Object.values(DirectionEnum)
    return difference(directions, currentLocWalls)
}

function hasWallInDirection (walls, direction) {
    return walls.find(wall => wall === direction)
}
