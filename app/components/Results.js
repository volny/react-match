import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import { sortPlayers } from '../utils/api'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'

const Profile = ({ info }) => {
  return (
    <PlayerPreview

      avatar={info.image_url}
      username={info.name}>

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
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  }

  componentDidMount = () => {
    console.log('location state', this.props.location.state)
    const sortPlayers = (players) => (
      players.sort((a, b) => b.score - a.score)
    )

    const { playerOneData, playerTwoData } = this.props.location.state
    const [winner, loser] = sortPlayers([playerOneData, playerTwoData])

    this.setState(() => ({
      // TODO error is not needed anymore
      error: null,
      winner,
      loser,
      loading: false
    }))


    //const players = queryString.parse(this.props.location.search)

    //try {
    //  const results = await battle([players.playerOneName, players.playerTwoName])
    //  if (results === null) {
    //    return this.setState(() => {
    //      const error = 'Looks like there was an error. Check that both users exist on Github'
    //      return {
    //        error,
    //        loading: false
    //      }
    //    })
    //  }
    //  this.setState(() => ({
    //    error: null,
    //    winner: results[0],
    //    loser: results[1],
    //    loading: false
    //  }))
    //} catch (error) {
    //  console.warn({ error })
    //}
  }

  render() {
    const { error, winner, loser, loading } = this.state
    if (loading === true) {
      return <Loading />
    }
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }
    return (
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
    )
  }
}
