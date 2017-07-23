import React, { Component } from 'react'
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

export default class  extends Component {
  state = {

  }

  render() {
    return (
      <p style={styles.content}>{this.state.text}</p>
    )
  }
}
