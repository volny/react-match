import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PlayerPreview from './PlayerPreview'
import PlayerInput from './PlayerInput'

import { getFromTwitter } from '../utils/api'


export default class Battle extends Component {
  state = {
    playerOneData: {},
    playerTwoData: {},
    playerOneError: null,
    playerTwoError: null,
  }

  handleSubmit = async (id, username) => {
    try {
      const twitterData = await getFromTwitter(username)
      const newState = {}

      if (twitterData === '') {
        newState[id + 'Error'] = 'Seems like the user doesn\'t exist or was suspended'
      } else if (!twitterData) {
        newState[id + 'Error'] = "😱 - no or wrong data returned from Twitter"
      } else if (twitterData.protected) {
        newState[id + 'Error'] = "Sorry, we can't read this users tweets"
      } else {
        newState[id + 'Data'] = twitterData
        newState[id + 'Error'] = null
      }

      this.setState(() => ({
        ...newState
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
    const { playerOneData, playerTwoData, playerOneError, playerTwoError} = this.state

    return (
      <div>
        <div className="row">
          {/* shorthand if statement */}
          {!playerOneData.name && <PlayerInput
            id="playerOne"
            label="Player One"
            error={playerOneError}
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
            error={playerTwoError}
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

Battle.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  })
}

