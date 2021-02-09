import { useCallback, useEffect, useState } from 'react'
import wretch from 'wretch'
import { isEmpty } from 'lodash'
import getDirectionToMove from '../utils/helperMethods/getDirectionToMove'

export default function useMovePony (mazeId, mazeInfo, getMazeInfo, wallToFollow, controllerRef, timeoutRef,
                                     interval = 3000, shouldGet = true) {
    const [latestDirection, setLatestDirection] = useState(null)

    const get = useCallback(() => {
        if (shouldGet && !isEmpty(mazeInfo)) {
            controllerRef.current = new AbortController()
            const directionToMove = getDirectionToMove(mazeInfo, latestDirection, wallToFollow)
            timeoutRef.current = window.setTimeout(() => {
                wretch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`)
                    .signal(controllerRef.current)
                    .post({
                        direction: directionToMove
                    })
                    .json()
                    .then(() => getMazeInfo())
                    .catch(err => console.error(err))

            }, interval)
            setLatestDirection(directionToMove)
        }
    }, [mazeId, mazeInfo, getMazeInfo, wallToFollow, controllerRef, timeoutRef, shouldGet])

    const cleanup = useCallback(() => {
        controllerRef.current?.abort()
        window.clearTimeout(timeoutRef.current)
    }, [controllerRef, timeoutRef])

    useEffect(() => {
        if (shouldGet) get()
        return cleanup
    }, [get, shouldGet, cleanup])
}
