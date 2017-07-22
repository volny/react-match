import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PlayerInput extends Component {
  state = {
    username: ''
  }

  handleChange = (event) => {
    const value = event.target.value
    this.setState(() => ({
      username: value
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.props.id, this.state.username)
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="header">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="Github Username"
          type="text"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button className="button" type="submit" disabled={!this.state.username}>
          Submit
        </button>
      </form>
      )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default class Battle extends Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null,
  }

  handleSubmit = (id, username) => {
    this.setState(() => {
      const newState = {}
      newState[id + 'Name'] = username
      newState[id + 'Image'] = `https://github.com/${username}.png?size=200`
      return newState
    })
  }

  render() {
    //{ playerOneName, playerTwoName } = this.state
    //const [playerOneName, playerTwoName] = { this.state }
    const [playerOneName, playerTwoName] = [this.state.playerOneName, this.state.playerTwoName]
    console.log('1', playerOneName, playerTwoName, '2')
    return (
      <div>
        <div className="row">
          {/* shorthand if statement */}
          {!playerOneName && <PlayerInput
            id="playerOne"
            label="Player One"
            onSubmit={this.handleSubmit} />}
          {!playerTwoName && <PlayerInput
            id="playerTwo"
            label="Player Two"
            onSubmit={this.handleSubmit} />}
        </div>
      </div>
    )
  }
}
