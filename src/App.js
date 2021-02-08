import Maze from './pages/Maze'
import { getMovableDirections } from './utils/helperMethods/getMovableDirections'
import useGetJson from './hooks/useGetJson'
import { isEmpty } from 'lodash'

function App() {
    const mazeId = '2b349e41-55b7-45b5-98f0-6048f37a763a'

    const [mazeInfoData, isMazeInfoLoading, mazeInfoError] = useGetJson(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`, [mazeId]
    )

    if (!isEmpty(mazeInfoData)) {
        const getMovDir = getMovableDirections(mazeInfoData.data, mazeInfoData.pony[0], mazeInfoData.size[0])
        console.log('getMovDir: ', getMovDir)
    }

    // TODO: Set default path to API in webpack

    return (
        <div>
            <header>
                <p>
                    Go Rainbow Dash, go!
                </p>
                <Maze
                    mazeId='2b349e41-55b7-45b5-98f0-6048f37a763a'
                    interval={3000}
                    shouldGetLabyrinth={true}
                />
            </header>
        </div>
    )
}

export default App
