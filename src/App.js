import Maze from './pages/Maze'
import { getMovableDirections } from './utils/helperMethods'

function App() {
    const mazeId = '2b349e41-55b7-45b5-98f0-6048f37a763a'



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
