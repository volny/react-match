import React, { Component } from 'react'
import PropTypes from 'prop-types'

const PlayerPreview = (props) => (
  <div>
    <div className="column">
      <img src={props.avatar} alt={`Avatar for ${props.username}`} className="avatar"/>
      <h2 className="username">@{props.username}</h2>
    </div>
    <button
      className="reset"
      onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>
  </div>
)

PlayerPreview.proptypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
}

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

  handleReset = (id) => {
    this.setState(() => {
      const newState = {}
      newState[id + 'Name'] = ''
      newState[id + 'Image'] = null
      return newState
    })
  }

  render() {
    const {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage,
    } = this.state

    return (
      <div>
        <div className="row">
          {/* Instead of the hack with `&&` why not test if a name has been submitted? */}
          {/* {playerOneName.length > 0
            ? <PlayerPreview />
            : <PlayerInput />
          } */}

          {/* shorthand if statement */}
          {!playerOneName && <PlayerInput
            id="playerOne"
            label="Player One"
            onSubmit={this.handleSubmit} />
          }

          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id="playerOne" />
          }

          {!playerTwoName && <PlayerInput
            id="playerTwo"
            label="Player Two"
            onSubmit={this.handleSubmit} />
          }

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
              id="playerTwo" />
          }
        </div>
      </div>
    )
  }
}
