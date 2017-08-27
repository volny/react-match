import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PlayerPreview from './PlayerPreview'

import { getFromTwitter } from '../utils/api'

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
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >
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
    playerOneData: null,
    playerTwoData: null,
  }

  handleSubmit = async (id, username) => {
    const twitterdata = await getFromTwitter(username)

    this.setState(() => {
      const newState = {}
      //newState[id + 'Name'] = username
      newState[id + 'Name'] = twitterdata.name
      //newState[id + 'Image'] = `https://github.com/${username}.png?size=200`
      newState[id + 'Image'] = twitterdata.image_url
      newState[id + 'Data'] = twitterdata
      return newState
    })
  }

  handleReset = (id) => {
    this.setState(() => {
      const newState = {}
      newState[id + 'Name'] = ''
      newState[id + 'Image'] = null
      newState[id + 'Data'] = null
      return newState
    })
  }

  render() {
    const {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage,
      playerOneData,
      playerTwoData,
    } = this.state

    return (
      <div>
        <div className="row">
          {/* shorthand if statement */}
          {!playerOneName && <PlayerInput
            id="playerOne"
            label="Player One"
            onSubmit={this.handleSubmit} />
          }
          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}>
              <button
                className="reset"
                onClick={this.handleReset.bind(null, 'playerOne')}>
                  Reset
              </button>
            </PlayerPreview>
          }
          {!playerTwoName && <PlayerInput
            id="playerTwo"
            label="Player Two"
            onSubmit={this.handleSubmit} />
          }
          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>
              <button
                className="reset"
                onClick={this.handleReset.bind(null, 'playerTwo')}>
                  Reset
              </button>
            </PlayerPreview>
          }
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className="button"
            to={{
              pathname: `${this.props.match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
              state: {
                playerOneData,
                playerTwoData
              }

            }}
            > Battle </Link>
        }

      </div>
    )
  }
}
