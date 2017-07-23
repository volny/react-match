import React, { Component } from 'react'
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

export default class Loading extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  static defaultProps = {
    text: 'Loading',
  }

  state = {
    text: this.props.text
  }

  render() {
    return (
      <p style={styles.content}>{this.state.text}</p>
    )
  }
}
