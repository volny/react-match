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

  componentDidMount = () => {
    const stopper = this.props.text + '...'
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => ({
          text: this.props.text
        }))
      } else {
        // one advantage of passing a func into setState is you can access the
        //PREVIOUS STATE as the first argument
        this.setState((prevState) => ({
          text: prevState.text + '.'
        }))
      }
    }, 300)
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
