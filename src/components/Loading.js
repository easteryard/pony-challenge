import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    outerGrid: {
        width: '100%',
        height: '50vh'
    }
}))

function Loading () {
    const classes = useStyles()

    return (
        <Grid container justify='center' alignItems='center' className={classes.outerGrid}>
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    )
}

export default Loading
