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

const RepoGrid = (props) => (
  <ul className='popular-list'>
    {props.repos.map((repo, index) => (
      <li key={repo.name} className='popular-item'>
        <div className="popular-rank">#{index + 1}</div>
        <ul className="space-list-items">
          <li>
            <img
              className="avatar"
              src={repo.owner.avatar_url}
              alt={`Avatar for ${repo.owner.login}`}
            />
          </li>
          <li><a href={repo.html_url}>{repo.name}</a></li>
          <li>@{repo.owner.login}</li>
          <li>{repo.stargazers_count} stars</li>
        </ul>
      </li>
    ))}
  </ul>
)

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
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
      <div>
        <SelectedLanguage
          onSelect={this.updateLanguage}
          selectedLanguage={this.state.selectedLanguage}
        />

        {!this.state.repos
          ? <p>Loading</p>
          : <RepoGrid repos={this.state.repos} />
        }


    </div>
    )
  }
}
