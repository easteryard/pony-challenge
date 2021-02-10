import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import ConditionalRender from '../../components/ConditionalRender'
import Maze from './components/Maze'
import MazeStateImage from './components/MazeStateImage'
import MazeSettings from './components/MazeSettings'

import useGetJson from '../../hooks/useGetJson'
import useMovePony from '../../hooks/useMovePony'
import SideEnum from '../../utils/enums/SideEnum'
import MazeStateEnum from '../../utils/enums/MazeStateEnum'
import { toLowerCase } from '../../utils/helperMethods/textCapitalization'

const useStyles = makeStyles(() => ({
    outerGrid: {
        width: '100%'
    }
}))

function RunMaze () {
    const classes = useStyles
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
            return toLowerCase(mazeInfoData['game-state'].state) !== MazeStateEnum.ACTIVE
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
                <Grid container className={classes.outerGrid}>
                    <MazeSettings isMazeRunning={isMazeRunning} interval={interval} mazeState={mazeInfo['game-state'].state}
                                  isMazeOver={isMazeOver} handleMazeRun={handleMazeRun} handleInterval={handleInterval}
                                  getWallToFollowSwitchValue={isSwitchValueRight} handleWallToFollow={handleWallToFollow} />
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
