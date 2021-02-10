import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Divider, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(1)
    },
    contentGrid: {
        width: 'fit-content'
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}))

function About () {
    const classes = useStyles()
    const sourceCodeLink = 'https://github.com/easteryard/pony-challenge'

    return (
        <Grid container direction='column'>
            <Typography variant='h4' className={classes.title}>About</Typography>
            <Grid container direction='column' className={classes.contentGrid}>
                <Typography>Attempt to save the pony from the evil Domokun!</Typography>
                <Typography>Whether you're going to prevail or not is up to you and your skills (almost)!</Typography>
                <Divider className={classes.divider} />
                <Typography>To see the source code go to:</Typography>
                <Typography component='a' href={sourceCodeLink} target='_blank'>{sourceCodeLink}</Typography>
            </Grid>
        </Grid>
    )
}

About.propTypes = {

}

export default About
