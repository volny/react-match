import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default (props) => (
  <ul className="nav">
      <li>
        <NavLink exact activeClassName="active" to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to='/battle'>Battle</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to='/popular'>Popular</NavLink>
      </li>

  </ul>
)
