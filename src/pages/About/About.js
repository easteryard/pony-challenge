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
    },
    unsortedList: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
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
                <Typography>How to escape a maze:</Typography>
                <ul className={classes.unsortedList}>
                    <li><Typography>put one hand on the wall to your left or right and keep it there</Typography></li>
                    <li><Typography>start walking</Typography></li>
                </ul>
                <Typography>It might take some time but you'll escape the maze none the less.</Typography>
                <Typography variant='caption'>(except if the Domokun gets to you of course)</Typography>
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
