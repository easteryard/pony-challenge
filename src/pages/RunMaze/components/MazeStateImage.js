import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    image: {
        width: 'inherit'
    }
}))

function MazeStateImage ({ path }) {
    const classes = useStyles()

    return (
        <img src={`https://ponychallenge.trustpilot.com/${path}`} alt='maze-state' className={classes.image} />
    )
}

MazeStateImage.propTypes = {
    path: PropTypes.string.isRequired
}

export default MazeStateImage
