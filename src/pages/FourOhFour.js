import React from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({

}))

function FourOhFour () {
    const history = useHistory()

    function goToAbout () {
        history.push('/about')
    }

    return (
        <Grid container direction='column' alignItems='center'>
            <Typography variant='h3'>You're at the wrong place at the wrong time.</Typography>
            <Typography>Better head back unless you want to face the Domokun!</Typography>
            <Button onClick={goToAbout} variant='contained' color='primary'>Go to a safe place</Button>
        </Grid>
    )
}

FourOhFour.propTypes = {

}

export default FourOhFour
