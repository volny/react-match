import React, { Component } from 'react'
// aufgemerkt: `import BrowserRouter as Router` is buggy
// https://github.com/ReactTraining/react-router/issues/5114
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Battle from './Battle'
import Nav from './Nav'
import Results from './Results'

export default class App extends Component {
  render () {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Battle} />
            <Route path="/results" component={Results} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}
