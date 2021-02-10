import { difference, intersection, shuffle } from 'lodash'
import DirectionEnum from '../enums/DirectionEnum'
import SideEnum from '../enums/SideEnum'

export default function getDirectionToMove (mazeInfo, latestDirection, wallToFollow) {
    const movableDirections = getMovableDirections(mazeInfo.data, mazeInfo.pony[0], mazeInfo.size[0])
    const prioritisedDirections = getPrioritisedDirections(latestDirection, wallToFollow)
    const prioritisedMovableDirections = intersection(prioritisedDirections, movableDirections)
    return prioritisedMovableDirections[0]
}

function getPrioritisedDirections (latestDirection, wallToFollow) {
    const directions = Object.values(DirectionEnum)
    const latestDirIdx = directions.findIndex(direction => direction === latestDirection)

    if (wallToFollow === SideEnum.LEFT) {
        const nextDirIdx = latestDirIdx - 1

        const prioritisedStart = directions.slice(nextDirIdx)
        const prioritisedEnd = directions.slice(0, nextDirIdx)

        return [...prioritisedStart, ...prioritisedEnd]
    } else if (wallToFollow === SideEnum.RIGHT) {
        let nextDirIdx = latestDirIdx + 2
        if (nextDirIdx > directions.length) nextDirIdx -= directions.length

        const prioritisedStart = directions.slice(nextDirIdx)
        const prioritisedEnd = directions.slice(0, nextDirIdx)

        return [...prioritisedStart, ...prioritisedEnd].reverse()
    } else {
        return shuffle(directions)
    }
}

function getMovableDirections (mazeWalls, currentLocIdx, mazeWidth) {
    const currentLocWalls = mazeWalls[currentLocIdx]

    const eastLocWalls = mazeWalls[currentLocIdx + 1]
    if (isInSouthEastCorner(currentLocIdx, mazeWalls)) currentLocWalls.push(DirectionEnum.EAST)
    else if (isAtEastWalls(mazeWidth, currentLocIdx)) currentLocWalls.push(DirectionEnum.EAST)
    else if (hasWallInDirection(eastLocWalls, DirectionEnum.WEST)) currentLocWalls.push(DirectionEnum.EAST)

    const southLocWalls = mazeWalls[currentLocIdx + mazeWidth]
    if (isAtSouthWalls(currentLocIdx, mazeWidth, mazeWalls)) currentLocWalls.push(DirectionEnum.SOUTH)
    else if (hasWallInDirection(southLocWalls, DirectionEnum.NORTH)) currentLocWalls.push(DirectionEnum.SOUTH)

    const directions = Object.values(DirectionEnum)
    return difference(directions, currentLocWalls)
}

function hasWallInDirection (walls, direction) {
    return walls.find(wall => wall === direction)
}

function isInSouthEastCorner (currentLocIdx, mazeWalls) {
    return currentLocIdx + 1 === mazeWalls.length
}

function isAtEastWalls (mazeWidth, currentLocIdx) {
    return !(currentLocIdx === 0) && mazeWidth % (currentLocIdx + 1) === 0
}

function isAtSouthWalls (currentLocIdx, mazeWidth, mazeWalls) {
    return currentLocIdx + mazeWidth > mazeWalls.length - 1
}
