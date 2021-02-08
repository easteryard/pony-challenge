import React from 'react'

import useGetTextWithInterval from '../../hooks/useGetTextWithInterval'
import ConditionalRender from '../../components/ConditionalRender'
import { getMovableDirections } from '../../utils/helperMethods'

function Maze ({ mazeId, interval, shouldGetLabyrinth }) {
    const { data: mazeData, loading: isMazeLoading, error: mazeError } =
        useGetTextWithInterval(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}/print`, interval,
        [mazeId], shouldGetLabyrinth)

    console.log('mazeData: ', mazeData)
    if (mazeData) {
        const test = getMovableDirections(mazeData.data, mazeData.pony, mazeData?.size[0])
        console.log('test: ', test)
    }

    return (
        <ConditionalRender
            dataArray={[mazeData]}
            loadingArray={[isMazeLoading]}
            errorArray={[mazeError]}
            errorMessage='An error occurred while fetching the maze.'
        >
            {([maze]) => (
                <pre>
                    <code>
                        {maze}
                    </code>
                </pre>
            )}
        </ConditionalRender>
    )
}

export default Maze
