import React, { useCallback, useEffect, useRef, useState } from 'react'

import { isEmpty } from 'lodash'
import { useParams } from 'react-router-dom'

import ConditionalRender from '../../components/ConditionalRender'
import Maze from './components/Maze'

import useGetJson from '../../hooks/useGetJson'
import SideEnum from '../../utils/enums/SideEnum'
import { Grid } from '@material-ui/core'
import useMovePony from '../../hooks/useMovePony'
import MazeSettings from './components/MazeSettings'
import MazeStateEnum from '../../utils/enums/MazeStateEnum'
import MazeStateImage from './components/MazeStateImage'

function RunMaze () {
    const { mazeId } = useParams()
    const [isMazeRunning, setIsMazeRunning] = useState(false)
    const [isMazeOver, setIsMazeOver] = useState(false)
    const [interval, setInterval] = useState(2000)
    const [wallToFollow, setWallToFollow] = useState(SideEnum.LEFT)

    const controllerRef = useRef(null)
    const timeoutRef = useRef(null)

    const [mazeInfoData, isMazeInfoLoading, mazeInfoError, getMazeInfo] = useGetJson(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`,[mazeId], !isMazeOver
    )

    useMovePony(mazeId, mazeInfoData, getMazeInfo, wallToFollow, controllerRef, timeoutRef, interval, isMazeRunning)

    const isMazeStateOver = useCallback(() => {
        if (!isEmpty(mazeInfoData)) {
            return mazeInfoData['game-state'].state === MazeStateEnum.OVER
        }
    }, [mazeInfoData])

    const handleMazeRun = useCallback(newIsMazeRunningValue => {
        if (controllerRef.current) controllerRef.current.abort()
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
        setIsMazeRunning(newIsMazeRunningValue ?? !isMazeRunning)
    }, [isMazeRunning])

    useEffect(() => {
        if (isMazeStateOver()) {
            handleMazeRun(false)
            setIsMazeOver(true)
        }
    }, [handleMazeRun, isMazeStateOver, mazeInfoData])

    function handleInterval (value) {
        setInterval(value)
    }

    function isSwitchValueRight () {
        return wallToFollow === SideEnum.RIGHT
    }

    function handleWallToFollow (value) {
        value ? setWallToFollow(SideEnum.RIGHT) : setWallToFollow(SideEnum.LEFT)
    }

    return (
        <ConditionalRender
            dataArray={[mazeInfoData]}
            loadingArray={[isMazeInfoLoading]}
            errorArray={[mazeInfoError]}
            errorMessage='An error occurred while fetching the maze info.'
        >
            {([mazeInfo]) => (
                <Grid container style={{ width: '100%'}}>
                    <MazeSettings isMazeRunning={isMazeRunning} interval={interval} handleMazeRun={handleMazeRun}
                                  handleInterval={handleInterval} getWallToFollowSwitchValue={isSwitchValueRight}
                                  handleWallToFollow={handleWallToFollow} />
                    <Maze mazeId={mazeId} dependencies={[mazeId, mazeInfo.pony[0]]} shouldGetMaze={!isEmpty(mazeInfo)} />
                    {mazeInfo['game-state']['hidden-url'] && (
                        <MazeStateImage path={mazeInfo['game-state']['hidden-url']} />
                    )}
                </Grid>
            )}
        </ConditionalRender>
    )
}

export default RunMaze
