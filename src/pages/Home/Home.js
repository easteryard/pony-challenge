import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import wretch from 'wretch'

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(1)
    },
    searchGrid: {
        maxWidth: theme.spacing(45)
    },
    actionGrid: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    buttonSpacing: {
        marginLeft: theme.spacing(1)
    }
}))

function Home () {
    const classes = useStyles()
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()
    const [mazeId, setMazeId] = useState('')
    const [dataOnUpdate, setDataOnUpdate] = useState({
        isGoToDisabled: true,
        mazeState: ''
    })

    useEffect(() => {
        setDataOnUpdate({
            isGoToDisabled: true,
            mazeState: ''
        })
    }, [mazeId])

    function handleMazeId (value) {
        setMazeId(value)
    }

    function findMaze () {
        wretch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`)
            .get()
            .json(res => {
                setDataOnUpdate({
                    isGoToDisabled: false,
                    mazeState: res['game-state'].state
                })
                enqueueSnackbar('Found the maze', { variant: 'success' })
            })
            .catch(() => enqueueSnackbar('Couldn\'t find the maze', { variant: 'error' }))
    }

    function handleClear () {
        setMazeId('')
    }

    function handleRedirect () {
        history.push(`/maze/${mazeId}`)
    }

    return (
        <Grid container direction='column'>
            <Typography variant='h4' className={classes.title}>Find maze</Typography>
            <Grid container direction='column' justify='space-between' className={classes.searchGrid}>
                <form onSubmit={event => { event.preventDefault(); findMaze() }}>
                    <TextField value={mazeId} onChange={event => handleMazeId(event.target.value)} label='Maze ID'
                               variant='filled' />
                    <Grid container justify='space-between' className={classes.actionGrid}>
                        <div>
                            <Button onClick={handleClear} variant='outlined' color='primary'>Clear</Button>
                            <Button type='submit' variant='contained' color='primary' className={classes.buttonSpacing}>
                                Search
                            </Button>
                        </div>
                        <Button onClick={handleRedirect} disabled={dataOnUpdate.isGoToDisabled} variant='contained' color='primary'>
                            Go to maze
                        </Button>
                    </Grid>
                </form>
                <Typography>Maze state: {dataOnUpdate.mazeState}</Typography>
            </Grid>
        </Grid>
    )
}

export default Home
