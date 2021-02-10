import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'

import NavBar from './components/NavBar'
import Home from './pages/Home/Home'
import CreateMaze from './pages/CreateMaze/CreateMaze'
import RunMaze from './pages/RunMaze/RunMaze'
import About from './pages/About/About'
import FourOhFour from './pages/FourOhFour'
import { pink } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: pink[400]
        }
    }
})

function ParentProviders ({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </ThemeProvider>
    )
}

function App () {
    return (
        <ParentProviders>
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
        </ParentProviders>
    )
}

const AppWithProviders = () => <ParentProviders><App /></ParentProviders>

export default AppWithProviders
