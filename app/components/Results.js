import React, { Component } from 'react'
import queryString from 'query-string'
import { battle } from '../utils/api'

export default class Results extends Component {
  componentDidMount = () => {
    const players = queryString.parse(this.props.location.search)
    battle([
      players.playerOneName, players.playerTwoName
    ]).then((results) => console.log(results))
  }

  render() {
    return (
      <div></div>
    )
  }
}
