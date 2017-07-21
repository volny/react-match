import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Popular from './Popular';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Popular />
      </div>
    )
  }
}
