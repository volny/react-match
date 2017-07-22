import React, { Component } from 'react'
import queryString from 'query-string'
import { battle } from '../utils/api'
import { Link } from 'react-router-dom'

export default class Results extends Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  }

  componentDidMount = () => {
    const players = queryString.parse(this.props.location.search)
    battle([
      players.playerOneName, players.playerTwoName
    ]).then((results) => {
      if (results === null) {
        return this.setState(() => {
          const error = 'Looks like there was an error. Check that both users exist on Github'
          return {
            error,
            loading: false
          }
        })
      }
      this.setState(() => ({
        error: null,
        winner: results[0],
        loser: results[1],
        loading: false
      }))
    })
  }

  render() {
    const { error, winner, loser, loading } = this.state
    if (loading === true) {
      return <p>Loading</p>
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
      <div>{JSON.stringify(this.state, null, 2)}</div>
    )
  }
}
