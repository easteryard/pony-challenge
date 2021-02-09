import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({

}))

function About (props) {
    const classes = useStyles()
    const history = useHistory()

    function goToMaze () {
        history.push('/maze/927e1ea5-e926-48f6-95c9-d51ea06c8c17')
    }

    return (
        <>
            <p>About page</p>
            <Button onClick={goToMaze}>Go to maze</Button>
        </>
    )
}

About.propTypes = {

}

export default About
