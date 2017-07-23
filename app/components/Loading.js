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
    text: PropTypes.string,
    speed: PropTypes.number,
    animation: PropTypes.string,
  }

  static defaultProps = {
    text: 'Loading',
    speed: 200,
    animation: 'case',
  }

  state = {
    text: this.props.text,
    index: 0
  }

  animateCase = () => {
    const stopper = this.props.text.length
    this.interval = window.setInterval(() => {
      if (this.state.index === stopper) {
        this.setState(() => ({
          index: 0
        }))
      } else {
        const { index } = this.state
        const { text } = this.props
        const reversed = text.charCodeAt(index) >= 97
          ? text.charAt(index).toUpperCase()
          : text.charAt(index).toLowerCase()
        this.setState((prevState) => ({
          text: text.substr(0, index) + reversed + text.substr(index + 1),
          index: prevState.index + 1
        }))
      }
    }, this.props.speed)
  }

  animateDots = () => {
    const stopper = this.props.text + '...'
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => ({
          text: this.props.text
        }))
      } else {
        this.setState((prevState) => ({
          text: prevState.text + '.'
        }))
      }
    }, this.props.speed)
  }

  componentDidMount = () => {
    if (this.props.animation === 'case') {
      this.animateCase()
    } else if (this.props.animation === 'dots') {
      this.animateDots()
    }
  }

  componentWillUnmount = () => {
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <p style={styles.content}>{this.state.text}</p>
    )
  }
}
