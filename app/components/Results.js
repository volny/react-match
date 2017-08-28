import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import { sortPlayers } from '../utils/api'
import PlayerPreview from './PlayerPreview'

const Profile = ({ info }) => {
  return (
    <PlayerPreview
      avatar={info.image_url}
      username={info.name}
    >
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.description && <li>{info.description}</li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

const Player = ({ label, profile }) => (
  <div>
    <h1 className="header">{label}</h1>
    <h3 style={{textAlign: 'center'}}>Score: {profile.score}</h3>
    <Profile info={profile}/>
  </div>
)

Player.propTypes = {
  label: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
}

export default class Results extends Component {
  constructor(props) {
    super(props)
    const { playerOneData, playerTwoData } = this.props.location.state
    const [winner, loser] = sortPlayers([playerOneData, playerTwoData])
    this.state = {
      winner,
      loser
    }
  }

  render() {
    const { winner, loser } = this.state
    return (
      <div>
        <div className="row">
          <Player
            label='Winner'
            profile={winner}
          />
          <Player
            label='Loser'
            profile={loser}
          />
        </div>

        <Link
          className="button"
          to={{pathname: `/`}}
        > Start Over </Link>

    </div>
    )
  }
}

