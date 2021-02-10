import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { Button, FormControl, FormLabel, Grid, Slider, Switch, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    outerGrid: {
        width: 'auto'
    },
    intervalFormControl: {
        width: '100%',
        alignItems: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    mazeState: {
        marginTop: theme.spacing(1)
    }
}))

function MazeSettings ({ isMazeRunning, interval, mazeState, isMazeOver, handleMazeRun, handleInterval, getWallToFollowSwitchValue, handleWallToFollow }) {
    const classes = useStyles()

    return (
        <Grid container justify='center'>
            <Grid container direction='column' alignItems='center' className={classes.outerGrid}>
                <Button onClick={() => handleMazeRun()} disabled={isMazeOver} variant='contained' color='primary'>
                    {isMazeRunning ? 'Stop the maze' : 'Start the maze'}
                </Button>
                <Typography className={classes.mazeState}>Maze state: {mazeState}</Typography>
                <FormControl className={classes.intervalFormControl}>
                    <FormLabel>Interval: {interval} ms</FormLabel>
                    <Slider value={interval} onChange={(event, value) => handleInterval(value)}
                            min={500} max={5000} step={500} marks />
                </FormControl>
                <Grid component='label' container justify='center' alignItems='center' spacing={1}>
                    <Typography>Left</Typography>
                    <Switch
                        value={getWallToFollowSwitchValue()}
                        onChange={(event, checked) => handleWallToFollow(checked)}
                        color='default'
                    />
                    <Typography>Right</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

MazeSettings.propTypes = {
    getWallToFollowSwitchValue: PropTypes.func.isRequired,
    handleInterval: PropTypes.func.isRequired,
    handleMazeRun: PropTypes.func.isRequired,
    handleWallToFollow: PropTypes.func.isRequired,
    interval: PropTypes.number.isRequired,
    isMazeOver: PropTypes.bool.isRequired,
    isMazeRunning: PropTypes.bool.isRequired,
    mazeState: PropTypes.string.isRequired
}

export default MazeSettings
