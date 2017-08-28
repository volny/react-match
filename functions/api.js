const Twitter = require('twitter')
const secrets = require('./secrets')
const twitter = new Twitter(secrets)

const calculateScore = (data) => {
  const count = data.followers_count * 3 + data.statuses_count
  return Math.floor(Math.sqrt(count))
}

module.exports = {
  getUserData: (player) => {
    const formatImageUrl = (url) => {
      const toReplace = 'normal'
      const replaceBy = '400x400'
      const index = url.lastIndexOf(toReplace)
      return url.substring(0, index) + replaceBy + url.substring(index + toReplace.length)
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

