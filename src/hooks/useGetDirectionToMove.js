import { useCallback, useEffect, useState } from 'react'
import getMovableDirections from '../utils/helperMethods/getMovableDirections'
import getPrioritisedDirections from '../utils/helperMethods/getPrioritisedDirections'
import getDirectionToMove from '../utils/helperMethods/getDirectionToMove'
import DirectionEnum from '../utils/enums/DirectionEnum'
import { isEmpty } from 'lodash'

export function useGetDirectionToMove (mazeInfo, keepToSide, shouldUpdate = true) {
    const [directionToMove, setDirectionToMove] = useState(DirectionEnum.NORTH)

    const updateDirectionToMove = useCallback(() => {
        const movableDirections = getMovableDirections(mazeInfo.data, mazeInfo.pony[0], mazeInfo.size[0])
        const prioritisedDirections = getPrioritisedDirections(directionToMove, keepToSide)
        setDirectionToMove(getDirectionToMove(prioritisedDirections, movableDirections))
    }, [mazeInfo, keepToSide, directionToMove])

    useEffect(() => {
        if (shouldUpdate && !isEmpty(mazeInfo)) updateDirectionToMove()
    }, [mazeInfo, shouldUpdate, updateDirectionToMove])

    return directionToMove
}
