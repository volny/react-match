import React, { Component } from 'react'

export default class Popular extends Component {
  render() {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
      <ul className="languages">
        {languages.map((lang) => <li key={lang}>{lang}</li>)}
      </ul>
    )
  }
}
