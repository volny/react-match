import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'
import { fetchPopularRepos } from '../utils/api'

const SelectedLanguage = ({ selectedLanguage, onSelect }) => {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className="languages">
      {languages.map((lang) => {
        return <li
          onClick={lang === selectedLanguage ? null : onSelect.bind(null, lang)}
          style={lang === selectedLanguage ? { color: '#d0021b'} : null}
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

const RepoGrid = ({ repos }) => (
  <ul className='popular-list'>
    {repos.map((repo, index) => (
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
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }))

    fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => ({ repos }))
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
          ? <Loading speed={100}/>
          : <RepoGrid repos={this.state.repos} />
        }
    </div>
    )
  }
}
