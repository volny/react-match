import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

class Users extends Component {
  render() {
    const friends = this.props.list.filter((user) => user.friend === true)
    const nonFriends = this.props.list.filter((user) => user.friend !== true)
    return (
      <div>
        <h2>Friends</h2>
        <ul>
          {friends.map((user) => <li key={user.name}>{user.name}</li>)}
        </ul>
        <h2>Non-friends</h2>
        <ul>
          {nonFriends.map((user) => <li key={user.name}>{user.name}</li>)}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <Users list={[
    { name: 'Tyler', friend: true },
    { name: 'Ryan', friend: true },
    { name: 'Michael', friend: false },
    { name: 'Mikenzi', friend: false },
    { name: 'Jessica', friend: true },
    { name: 'Dan', friend: false } ]}
  />,
  document.getElementById('app')
)
