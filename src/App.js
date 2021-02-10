import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { SnackbarProvider } from 'notistack'

import NavBar from './components/NavBar'
import Home from './pages/Home/Home'
import CreateMaze from './pages/CreateMaze/CreateMaze'
import RunMaze from './pages/RunMaze/RunMaze'
import About from './pages/About/About'
import FourOhFour from './pages/FourOhFour'

function App() {
    return (
        <SnackbarProvider>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/maze/create' component={CreateMaze} />
                    <Route exact path='/maze/:mazeId' component={RunMaze} />
                    <Route exact path='/about' component={About} />
                    <Route path='*' component={FourOhFour} />
                </Switch>
            </Router>
        </SnackbarProvider>
    )
}

export default App
