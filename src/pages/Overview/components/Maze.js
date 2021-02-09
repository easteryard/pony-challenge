import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import useGetText from '../../../hooks/useGetText'
import ConditionalRender from '../../../components/ConditionalRender'

const useStyles = makeStyles(theme => ({
    outerGrid: {
        minWidth: theme.spacing(110),
        minHeight: theme.spacing(110)
    }
}))

function Overview ({ mazeId, dependencies, shouldGetMaze }) {
    const classes = useStyles()
    const [mazeData, isMazeLoading, mazeError] =
        useGetText(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}/print`, dependencies, shouldGetMaze)

    return (
        <Grid container justify='center' alignItems='center' className={classes.outerGrid}>
            <ConditionalRender
                dataArray={[mazeData]}
                loadingArray={[isMazeLoading]}
                errorArray={[mazeError]}
            >
                {([maze]) => (
                    <pre>
                        <code>
                            {maze}
                        </code>
                    </pre>
                )}
            </ConditionalRender>
        </Grid>
    )
}

export default Overview
