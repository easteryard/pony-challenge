import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import wretch from 'wretch'

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(1)
    },
    contentGrid: {
        maxWidth: theme.spacing(45)
    },
    textField: {
        marginBottom: theme.spacing(1)
    }
}))

function CreateMaze () {
    const classes = useStyles()
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()
    const [mazeDetails, setMazeDetails] = useState({
        playerName: '',
        mazeWidth: 15,
        mazeHeight: 15,
        difficulty: 3
    })

    function handleMazeChange (key, value) {
        setMazeDetails(prev => ({
            ...prev,
            [key]: value
        }))
    }

    function createMaze () {
        wretch('https://ponychallenge.trustpilot.com/pony-challenge/maze')
            .post({
                'maze-player-name': mazeDetails.playerName,
                'maze-width': mazeDetails.mazeWidth,
                'maze-height': mazeDetails.mazeHeight,
                'difficulty': mazeDetails.difficulty
            })
            .json(res => {
                history.push(`/maze/${res['maze_id']}`)
                enqueueSnackbar('Maze has been created', { variant: 'success' })
            })
            .catch(() => enqueueSnackbar('Couldn\'t create the maze - check field requirements', { variant: 'error' }))
    }

    return (
        <Grid container direction='column'>
            <Typography variant='h4' className={classes.title}>Create maze</Typography>
            <form onSubmit={event => { event.preventDefault(); createMaze(event) }}>
                <Grid container direction='column' justify='space-between' className={classes.contentGrid}>
                    <TextField value={mazeDetails.playerName} onChange={event => handleMazeChange('playerName', event.target.value)}
                               label='Pony name' helperText='A valid pony name' variant='filled' className={classes.textField} />
                    <TextField value={mazeDetails.mazeWidth} onChange={event => handleMazeChange('mazeWidth', event.target.value)}
                               type='number' label='Width' helperText='Dimensions: 15 - 25' variant='filled' className={classes.textField} />
                    <TextField value={mazeDetails.mazeHeight} onChange={event => handleMazeChange('mazeHeight', event.target.value)}
                               type='number' label='Height' helperText='Dimensions: 15 - 25' variant='filled' className={classes.textField} />
                    <TextField value={mazeDetails.difficulty} onChange={event => handleMazeChange('difficulty', event.target.value)}
                               type='number' label='Difficulty' variant='filled' className={classes.textField} />
                    <Button type='submit' variant='contained' color='primary'>
                        Create maze
                    </Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default CreateMaze
