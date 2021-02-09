import DirectionEnum from '../enums/DirectionEnum'
import SideEnum from '../enums/SideEnum'
import { shuffle } from 'lodash'

export default function getPrioritisedDirections (latestDirection, keepToSide) {
    const directions = Object.values(DirectionEnum)
    const latestDirIdx = directions.findIndex(direction => direction === latestDirection)

    if (keepToSide === SideEnum.LEFT) {
        const nextDirIdx = latestDirIdx - 1

        const prioritisedStart = directions.slice(nextDirIdx)
        const prioritisedEnd = directions.slice(0, nextDirIdx)

        return [...prioritisedStart, ...prioritisedEnd]
    } else if (keepToSide === SideEnum.RIGHT) {
        let nextDirIdx = latestDirIdx + 2
        if (nextDirIdx > directions.length) nextDirIdx -= directions.length

        const prioritisedStart = directions.slice(nextDirIdx)
        const prioritisedEnd = directions.slice(0, nextDirIdx)

        return [...prioritisedStart, ...prioritisedEnd].reverse()
    } else {
        return shuffle(directions)
    }
}
