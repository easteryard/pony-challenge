import React from 'react'

import useGetTextWithInterval from '../hooks/useGetTextWithInterval'
import ConditionalRender from './ConditionalRender'

function Maze ({ mazeId, interval, shouldGetLabyrinth }) {
    const [mazeData, isMazeLoading, mazeError] =
        useGetTextWithInterval(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}/print`, interval,
        [mazeId], shouldGetLabyrinth)

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
