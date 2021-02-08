import Maze from './pages/Maze'

function App() {
    const mazeId = '2b349e41-55b7-45b5-98f0-6048f37a763a'

    return (
        <div>
            <header>
                <p>
                    Go Rainbow Dash, go!
                </p>
                <Maze
                    labyrinthUrl={`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}/print`}
                    interval={3000}
                    shouldGetLabyrinth={true}
                />
            </header>
        </div>
    )
}

export default App
