import React, { useEffect, useRef, useState } from 'react'

import { isEmpty } from 'lodash'
import { useParams } from 'react-router-dom'

import ConditionalRender from '../../components/ConditionalRender'
import Maze from './components/Maze'

import useGetJson from '../../hooks/useGetJson'
import SideEnum from '../../utils/enums/SideEnum'
import { Button, Grid, Slider } from '@material-ui/core'
import useMovePony from '../../hooks/useMovePony'

function Overview () {
    const { mazeId } = useParams()
    const [isRunningMaze, setIsRunningMaze] = useState(true)
    const [interval, setInterval] = useState(2000)
    const [wallToFollow, setWallToFollow] = useState(SideEnum.LEFT)

    const controllerRef = useRef(null)
    const timeoutRef = useRef(null)

    const [mazeInfoData, isMazeInfoLoading, mazeInfoError, getMazeInfo] = useGetJson(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`,[mazeId], isRunningMaze
    )

    useMovePony(mazeId, mazeInfoData, getMazeInfo, wallToFollow, controllerRef, timeoutRef, interval, isRunningMaze)

    function handleMazeRun () {
        if (controllerRef.current) controllerRef.current.abort()
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
        setIsRunningMaze(!isRunningMaze)
    }

    function handleInterval (value) {
        setInterval(value)
    }

    console.log('mazeInfo: ', mazeInfoData)

    return (
        <ConditionalRender
            dataArray={[mazeInfoData]}
            loadingArray={[isMazeInfoLoading]}
            errorArray={[mazeInfoError]}
            errorMessage='An error occurred while fetching the maze info.'
        >
            {([mazeInfo]) => (
                <Grid container style={{ width: '100%'}}>
                    <Grid>
                        <Button onClick={handleMazeRun} variant='contained' color='primary'>
                            {isRunningMaze ? 'Stop the maze' : 'Start the maze'}
                        </Button>
                        <Slider value={interval} onChange={(event, value) => handleInterval(value)}
                                min={500} max={5000} step={500} marks valueLabelDisplay='auto' />
                    </Grid>
                    <Maze mazeId={mazeId} dependencies={[mazeId, mazeInfo.pony[0]]} shouldGetMaze={!isEmpty(mazeInfoData)} />
                    {/*<img src={'https://ponychallenge.trustpilot.com/eW91X3NhdmVkX3RoZV9wb255.jpg'} alt='finish' style={{ width: 'inherit' }} />*/}
                    {/*<img src={'https://ponychallenge.trustpilot.com/eW91X2tpbGxlZF90aGVfcG9ueQ==.jpg'} alt='finish' style={{ width: 'inherit' }} />*/}
                </Grid>
            )}
        </ConditionalRender>
    )
}

export default Overview

// const [latestDirection, setLatestDirection] = useState(DirectionEnum.NORTH)
//
// useEffect(() => {
//     if (!isEmpty(mazeInfoData)) {
//         const directionToMove = getDirectionToMove(mazeInfoData, latestDirection, SideEnum.LEFT)
//         setTimeout(() => {
//             movePony(mazeId, directionToMove)
//                 .then(() => getMazeInfo())
//         }, 2000)
//         console.log('newLatestDirection: ', directionToMove)
//         setLatestDirection(directionToMove)
//     }
// }, [mazeId, mazeInfoData, getMazeInfo])

// if (!isEmpty(mazeInfoData)) {
//     const movableDirections = getMovableDirections(mazeInfoData.data, mazeInfoData.pony[0], mazeInfoData.size[0])
//     const prioritisedDirections = getPrioritisedDirections('east', 'right')
//     const dirToMove = getDirectionToMove(prioritisedDirections, movableDirections)
// }