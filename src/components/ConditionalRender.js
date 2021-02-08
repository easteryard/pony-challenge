import React from 'react'

import Loading from './Loading'
import { Typography } from '@material-ui/core'

function ConditionalRender ({ children, dataArray, loadingArray, errorArray, errorMessage }) {
    if (loadingArray.some(element => !!element)) return <Loading />
    if (errorArray.some(element => !!element)) return <Typography>{errorMessage}</Typography>
    return children(dataArray)
}

export default ConditionalRender
