import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SelectedLanguage extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedLanguage: PropTypes.string.isRequired,
  }
  render() {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
      <ul className="languages">
        {languages.map((lang) => {
          return <li
            onClick={this.props.onSelect.bind(null, lang)}
            style={lang === this.props.selectedLanguage ? { color: '#d0021b'} : null}
            key={lang}
            >{lang}</li>
        })}
      </ul>
    )
  }
}

export default class Popular extends Component {
  state = {
    selectedLanguage: 'All'
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
