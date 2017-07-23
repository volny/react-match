import React, { Component } from 'react'
// aufgemerkt: `import BrowserRouter as Router` is buggy
//https://github.com/ReactTraining/react-router/issues/5114
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home';
import Popular from './Popular';
import Battle from './Battle';
import Nav from './Nav';
import Results from './Results';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/battle" component={Battle}></Route>
              <Route path="/battle/results" component={Results}></Route>
              <Route path="/popular" component={Popular} />
              <Route render={() => <p>Not Found</p>} />
            </Switch>
        </div>
      </Router>
    )
  }
}
