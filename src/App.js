import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MazeCreation from './pages/MazeCreation/MazeCreation'
import Overview from './pages/Overview/Overview'
import About from './pages/About/About'
import FourOhFour from './pages/FourOhFour'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/create' component={MazeCreation} />
                <Route exact path='/maze/:mazeId' component={Overview} />
                <Route exact path='/about' component={About} />
                <Route path='*' component={FourOhFour} />
            </Switch>
        </Router>
    )
}

export default App
