import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import useGetText from '../../../hooks/useGetText'
import ConditionalRender from '../../../components/ConditionalRender'

const useStyles = makeStyles(theme => ({
    outerGrid: {
        minWidth: 'auto',
        minHeight: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
}))

function Overview ({ mazeId, dependencies, shouldGetMaze }) {
    const classes = useStyles()
    const [mazeData, isMazeLoading, mazeError] =
        useGetText(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}/print`, dependencies, shouldGetMaze)

    return (
        <ConditionalRender
            dataArray={[mazeData]}
            loadingArray={[isMazeLoading]}
            errorArray={[mazeError]}
        >
            {([maze]) => (
                <Grid container justify='center' className={classes.outerGrid}>
                    <pre>
                        <code>
                            {maze}
                        </code>
                    </pre>
                </Grid>
            )}
        </ConditionalRender>
    )
}

export default Overview
