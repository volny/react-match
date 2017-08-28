const Twitter = require('twitter')
const secrets = require('./secrets')
const twitter = new Twitter(secrets)

const calculateScore = (data) => {
  const user = data[0].user
  const userScore = user.followers_count * 3 + user.statuses_count

  const timelineSums = data.reduce((p, v) => ({
    retweet_count: p.retweet_count + v.retweet_count,
    favorite_count: p.favorite_count + v.favorite_count
  }))
  const timelineScore = timelineSums.retweet_count + timelineSums.favorite_count

  return Math.floor(Math.sqrt(userScore + timelineScore * 10))
}

const formatImageUrl = (url) => {
  const toReplace = 'normal'
  const replaceBy = '400x400'
  const index = url.lastIndexOf(toReplace)
  return url.substring(0, index) + replaceBy + url.substring(index + toReplace.length)
}

module.exports = {
  getUserData: (player) => {
    return twitter.get('statuses/user_timeline', {
      screen_name: player,
      include_rts: false,
      count: 30
    })
      .then(data => {
        const user = data[0].user
        return {
          name: user.name,
          score: calculateScore(data),
          description: user.description,
          image_url: formatImageUrl(user.profile_image_url_https)
        }
      })
      .catch(error => console.log(error))
  }
}

