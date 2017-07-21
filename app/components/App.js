import React, { Component } from 'react'
//import ReactRouter, { BrowserRouter as Router, Route } from 'react-router-dom'
const ReactRouter = require('react-router-dom')
const Router = ReactRouter.BrowserRouter
const Route = ReactRouter.Route

import Home from './Home';
import Popular from './Popular';
import Battle from './Battle';
import Nav from './Nav';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/battle" component={Battle}></Route>
          <Route path="/popular" component={Popular} />
        </div>
      </Router>
    )
  }
}
