import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../utils/api'

const SelectedLanguage = (props) => {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className="languages">
      {languages.map((lang) => {
        return <li
          onClick={lang === props.selectedLanguage ? null : props.onSelect.bind(null, lang)}
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
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage = (lang) => {
    this.setState({
      selectedLanguage: lang,
      repos: null
    })

    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState({ repos })
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
