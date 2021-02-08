import React from 'react'

import useGetTextWithInterval from '../../hooks/useGetTextWithInterval'
import ConditionalRender from '../../components/ConditionalRender'

function Maze ({ labyrinthUrl, interval, shouldGetLabyrinth }) {
    const { data: mazeData, loading: isMazeLoading, error: mazeError } = useGetTextWithInterval(labyrinthUrl, interval,
        [labyrinthUrl], shouldGetLabyrinth)

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
