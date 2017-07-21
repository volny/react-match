import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../utils/api'

const SelectedLanguage = (props) => {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className="languages">
      {languages.map((lang) => {
        return <li
          onClick={props.onSelect.bind(null, lang)}
          style={lang === props.selectedLanguage ? { color: '#d0021b'} : null}
          key={lang}
          >{lang}</li>
      })}
    </ul>
  )
}

SelectedLanguage.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
}

export default class Popular extends Component {
  state = {
    selectedLanguage: 'All'
  }

  componentDidMount = () => {
    api.fetchPopularRepos(this.state.selectedLanguage)
      .then((repos) => {
        console.log(repos)
      })
  }

  updateLanguage = (lang) => {
    this.setState({
      selectedLanguage: lang
    })
  }

  render() {
    return (
      <SelectedLanguage
        onSelect={this.updateLanguage}
        selectedLanguage={this.state.selectedLanguage}
      />
    )
  }
}
