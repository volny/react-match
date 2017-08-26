// TODO: save-dev twitter
const Twitter = require('twitter')
const secrets = require('./secrets').secrets

const twitter = new Twitter(secrets)

module.exports = {
  getUserData: (player) => {
    return twitter.get('users/show', {screen_name: player})
      .then(data => data)
      .catch(error => console.log(error))
  }
}
