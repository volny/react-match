import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import './index.css'

ReactDOM.render(
  <App />, document.getElementById('app')
)

//class Badge extends Component {
//  render() {
//    return (
//      <div>
//        <img
//          src={this.props.img}
//          alt='Avatar'
//          style={{width: 100, height: 100}}
//        />
//        <h1>Name: {this.props.name}</h1>
//        <h3>Username: {this.props.username}</h3>
//      </div>
//    )
//  }
//}

//Badge.propTypes = {
//  img: PropTypes.string.isRequired,
//  name: PropTypes.string.isRequired,
//  username: PropTypes.string.isRequired
//}

//ReactDOM.render(
//  <Badge
//    name="Felix Volny"
//    username="volny"
//    img='https://avatars3.githubusercontent.com/u/10927774?v=4&s=460'
//  />,
//  document.getElementById('app')
//)

//class Users extends Component {
//  render() {
//    const friends = this.props.list.filter((user) => user.friend === true)
//    const nonFriends = this.props.list.filter((user) => user.friend !== true)
//    return (
//      <div>
//        <h2>Friends</h2>
//        <ul>
//          {friends.map((user) => <li key={user.name}>{user.name}</li>)}
//        </ul>
//        <h2>Non-friends</h2>
//        <ul>
//          {nonFriends.map((user) => <li key={user.name}>{user.name}</li>)}
//        </ul>
//      </div>
//    )
//  }
//}

//Users.propTypes = {
//  list: PropTypes.arrayOf(PropTypes.shape({
//    name: PropTypes.string.isRequired,
//    friend: PropTypes.bool.isRequired,
//  })),
//}

//ReactDOM.render(
//  <div style={{fontFamily: 'Helvetica Neue'}}>
//    <Users list={[
//      { name: 'Tyler', friend: true },
//      { name: 'Ryan', friend: true },
//      { name: 'Michael', friend: false },
//      { name: 'Mikenzi', friend: false },
//      { name: 'Jessica', friend: true },
//      { name: 'Dan', friend: false } ]}
//    />
//    <hr/>
//    <Badge
//      name="Felix Volny"
//      username="volny"
//      img='https://avatars3.githubusercontent.com/u/10927774?v=4&s=460'
//    />
//  </div>,
//  document.getElementById('app')
//)
