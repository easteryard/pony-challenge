import React from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    outerGrid: {
        marginTop: theme.spacing(3)
    },
    middleText: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}))

function FourOhFour () {
    const classes = useStyles()
    const history = useHistory()

    function goToHome () {
        history.push('/')
    }

    return (
        <Grid container direction='column' alignItems='center' className={classes.outerGrid}>
            <Typography variant='h4' align='center'>You're at the wrong place at the wrong time!</Typography>
            <Typography variant='h6' align='center' className={classes.middleText}>Better head back unless you want to face the Domokun</Typography>
            <Button onClick={goToHome} variant='contained' color='primary'>Go to a safe place</Button>
        </Grid>
    )
}

FourOhFour.propTypes = {

}

export default FourOhFour
