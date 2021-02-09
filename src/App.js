import Maze from './components/Maze'
import useGetJson from './hooks/useGetJson'
import { isEmpty } from 'lodash'
import getMovableDirections from './utils/helperMethods/getMovableDirections'
import getPrioritisedDirections from './utils/helperMethods/getPrioritisedDirections'
import getDirectionToMove from './utils/helperMethods/getDirectionToMove'
import useGetJsonWithInterval from './hooks/useGetJsonWithInterval'

function App() {
    const mazeId = '2b349e41-55b7-45b5-98f0-6048f37a763a'

    const [mazeInfoData, isMazeInfoLoading, mazeInfoError] = useGetJsonWithInterval(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`, 1000, [mazeId], !!mazeId
    )

    if (!isEmpty(mazeInfoData)) {
        const movableDirections = getMovableDirections(mazeInfoData.data, mazeInfoData.pony[0], mazeInfoData.size[0])
        const prioritisedDirections = getPrioritisedDirections('east', 'right')
        const dirToMove = getDirectionToMove(prioritisedDirections, movableDirections)
        console.log('movableDirections: ', movableDirections)
        console.log('prioritisedDirections: ', prioritisedDirections)
        console.log('dirToMove: ', dirToMove)
    }

    return (
        <div>
            <header>
                <p>
                    Go Rainbow Dash, go!
                </p>
                <Maze mazeId='2b349e41-55b7-45b5-98f0-6048f37a763a' interval={3000} shouldGetLabyrinth={true} />
            </header>
        </div>
    )
}

export default App
