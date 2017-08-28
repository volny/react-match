import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'

export default class PlayerInput extends Component {
  state = {
    username: '',
    loading: false
  }

  handleChange = (event) => {
    const value = event.target.value
    this.setState(() => ({
      username: value
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState(() => ({
      loading: true
    }))

    this.props.onSubmit(this.props.id, this.state.username)
      .then(() => {
        this.setState(() => ({
          loading: false
        }))
      })
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="header">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="Github Username"
          type="text"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        {this.props.error && this.state.username &&
        <p style={{color: '#d0021b'}}>{this.props.error}</p>
        }
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
      )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

