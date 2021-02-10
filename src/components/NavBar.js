import React from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    appBar: {
        marginBottom: theme.spacing(3)
    }
}))

function NavBar () {
    const classes = useStyles()
    const history = useHistory()

    function handleRedirect (path) {
        history.push(path)
    }

    return (
        <AppBar position='sticky' className={classes.appBar}>
            <Toolbar>
                <Button onClick={() => handleRedirect('/')}>Home</Button>
                <Button onClick={() => handleRedirect('/maze/create')}>Create maze</Button>
                <Button onClick={() => handleRedirect('/about')}>About</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
