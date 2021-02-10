import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { Button, FormControl, FormLabel, Grid, Slider, Switch, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    outerGrid: {
        width: 'auto'
    },
    intervalFormControl: {
        maxWidth: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}))

function MazeSettings ({ isMazeRunning, interval, handleMazeRun, handleInterval, getWallToFollowSwitchValue, handleWallToFollow }) {
    const classes = useStyles()

    return (
        <Grid container justify='center'>
            <Grid container direction='column' className={classes.outerGrid}>
                <Button onClick={handleMazeRun} variant='contained' color='primary'>
                    {isMazeRunning ? 'Stop the maze' : 'Start the maze'}
                </Button>
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
    handleWallToFollow: PropTypes.func,
    interval: PropTypes.number.isRequired,
    isMazeRunning: PropTypes.bool.isRequired
}

export default MazeSettings
