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
    // playerOneName: '',
    // playerTwoName: '',
    // playerOneImage: null,
    // playerTwoImage: null,
    playerOneData: {},
    playerTwoData: {},
  }

  handleSubmit = async (id, username) => {
    const twitterdata = await getFromTwitter(username)

    this.setState(() => {
      const newState = {}
      //newState[id + 'Name'] = username
      //newState[id + 'Image'] = `https://github.com/${username}.png?size=200`

      // newState[id + 'Name'] = twitterdata.name
      // newState[id + 'Image'] = twitterdata.image_url

      newState[id + 'Data'] = twitterdata
      return newState
    })
  }

  handleReset = (id) => {
    this.setState(() => {
      const newState = {}
      // newState[id + 'Name'] = ''
      // newState[id + 'Image'] = null
      newState[id + 'Data'] = {}
      return newState
    })
  }

  render() {
    const {
      // playerOneName,
      // playerTwoName,
      // playerOneImage,
      // playerTwoImage,
      playerOneData,
      playerTwoData,
    } = this.state

    return (
      <div>
        <div className="row">
          {/* shorthand if statement */}
          {!playerOneData.name && <PlayerInput
            id="playerOne"
            label="Player One"
            onSubmit={this.handleSubmit} />
          }
          {playerOneData.image_url !== undefined &&
            <PlayerPreview
              avatar={playerOneData.image_url}
              username={playerOneData.name}>
              <button
                className="reset"
                onClick={this.handleReset.bind(null, 'playerOne')}>
                  Reset
              </button>
            </PlayerPreview>
          }
          {!playerTwoData.name && <PlayerInput
            id="playerTwo"
            label="Player Two"
            onSubmit={this.handleSubmit} />
          }
          {playerTwoData.image_url !== undefined &&
            <PlayerPreview
              avatar={playerTwoData.image_url}
              username={playerTwoData.name}>
              <button
                className="reset"
                onClick={this.handleReset.bind(null, 'playerTwo')}>
                  Reset
              </button>
            </PlayerPreview>
          }
        </div>

        {playerOneData.image_url && playerTwoData.image_url &&
          <Link
            className="button"
            to={{
              pathname: `${this.props.match.url}/results`,
              //search: `?playerOneName=${playerOneData.name}&playerTwoName=${playerTwoData.name}`,
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
