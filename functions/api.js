// TODO: save-dev twitter
const Twitter = require('twitter')
const secrets = require('./secrets').secrets

const twitter = new Twitter(secrets)

const calculateScore = (data) => {
  return data.followers_count * 3 + data.statuses_count
}

module.exports = {
  getUserData: (player) => {
    const formatImageUrl = (url) => {
      const index = url.lastIndexOf('normal')
      return url.substring(0, index) + '400x400.jpg'
    }
    return twitter.get('users/show', {screen_name: player})
      .then(data => (
        {
          name: data.name,
          score: calculateScore(data),
          description: data.description,
          image_url: formatImageUrl(data.profile_image_url_https)
        }
      ))
      .catch(error => console.log(error))
  }
}

