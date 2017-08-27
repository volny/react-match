import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'

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
    if (this.props.loading && this.state.username) {
      return <Loading />
    }

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
        {this.props.error && this.state.username &&
        <p style={{color: '#d0021b'}}>{this.props.error}</p>
        }
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
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default class Battle extends Component {
  state = {
    error: null,
    loading: false,
    playerOneData: {},
    playerTwoData: {},
  }

  handleSubmit = async (id, username) => {
    this.setState(() => ({
      loading: true
    }))

    try {
      const twitterData = await getFromTwitter(username)
      const newState = {}
      let error

      if (twitterData === '') {
        error = 'Seems like the user doesn\'t exist or was suspended'
      } else if (!twitterData) {
        error = "😱 - no or wrong data returned from Twitter"
      } else {
        newState[id + 'Data'] = twitterData
        error = null
      }

      this.setState(() => ({
        ...newState,
        loading: false,
        error
      }))

    } catch (error) {
      console.warn('Something went wrong with API call:\n', error)
    }
  }

  handleReset = (id) => {
    this.setState(() => {
      const newState = {}
      newState[id + 'Data'] = {}
      return newState
    })
  }

  render() {
    const { playerOneData, playerTwoData, error, loading} = this.state

    return (
      <div>
        <div className="row">
          {/* shorthand if statement */}
          {!playerOneData.name && <PlayerInput
            id="playerOne"
            label="Player One"
            error={error}
            loading={loading}
            onSubmit={this.handleSubmit}
          />
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
            error={error}
            loading={loading}
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
