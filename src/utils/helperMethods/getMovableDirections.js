import DirectionEnum from '../enums/DirectionEnum'
import { difference } from 'lodash'

export default function getMovableDirections (mazeData, currentLocIdx, mazeWidth) {
    const currentLocWalls = mazeData[currentLocIdx]

    const eastLocWalls = mazeData[currentLocIdx + 1]
    if (hasWallInDirection(eastLocWalls, DirectionEnum.WEST)) {
        currentLocWalls.push(DirectionEnum.EAST)
    }

    const southLocWalls = mazeData[currentLocIdx + mazeWidth]
    if (hasWallInDirection(southLocWalls, DirectionEnum.NORTH)) {
        currentLocWalls.push(DirectionEnum.SOUTH)
    }

    const directions = Object.values(DirectionEnum)
    return difference(directions, currentLocWalls)
}

function hasWallInDirection (walls, direction) {
    return walls.find(wall => wall === direction)
}
