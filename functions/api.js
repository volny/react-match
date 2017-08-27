// TODO: save-dev twitter
const Twitter = require('twitter')
const secrets = require('./secrets').secrets

const twitter = new Twitter(secrets)

const calculateScore = (data) => {
  return data.followers_count * 3 + data.statuses_count
}

module.exports = {
  getUserData: (player) => {
    return twitter.get('users/show', {screen_name: player})
      .then(data => (
        {
          name: data.name,
          score: calculateScore(data),
          description: data.description,
          // TODO replace the "normal" in the URL with "400x400"
          image_url: data.profile_image_url_https
        } 
      ))
      .catch(error => console.log(error))
  }
}

