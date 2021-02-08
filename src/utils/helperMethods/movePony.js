import DirectionEnum from '../DirectionEnum'

const moveNorthTurnLeft = [
    DirectionEnum.WEST,
    DirectionEnum.NORTH,
    DirectionEnum.EAST,
    DirectionEnum.SOUTH
]

const moveEastTurnLeft = [
    DirectionEnum.NORTH,
    DirectionEnum.EAST,
    DirectionEnum.SOUTH,
    DirectionEnum.WEST
]

const moveSouthTurnLeft = [
    DirectionEnum.EAST,
    DirectionEnum.SOUTH,
    DirectionEnum.WEST,
    DirectionEnum.NORTH
]

const moveWestTurnLeft = [
    DirectionEnum.SOUTH,
    DirectionEnum.WEST,
    DirectionEnum.NORTH,
    DirectionEnum.EAST
]

export default function movePony (turnDirection) {

}
