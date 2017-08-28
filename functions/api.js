const Twitter = require('twitter')
const secrets = require('./secrets')
const twitter = new Twitter(secrets)

// TODO put this in a file ./algo.js
const calculateScore = (user, timeline) => {
  const userScore = user.followers_count * 3 + user.statuses_count

  const timelineSums = timeline.reduce((p, v) => ({
    retweet_count: p.retweet_count + v.retweet_count,
    favorite_count: p.favorite_count + v.favorite_count
    // TODO: correct for people with lots of replies/retweets, which means they have fewer tweets returned from twitter api
    // add a count var that increments for each tweet.
    // then in timelineScore do (...)*(30/tweets)
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
    const timeline = twitter.get('statuses/user_timeline', {
      screen_name: player,
      // no retweets
      include_rts: false,
      // no replies
      exclude_replies: true,
      count: 30,
      // no user info which 10x's the size of the response
      trim_user: true
    })

    const user = twitter.get('users/show', {screen_name: player})

    return Promise.all([timeline, user])
      .then(values => {
        const user = values[1]
        const timeline = values[0]
        return {
          name: user.name,
          score: calculateScore(user, timeline),
          description: user.description,
          image_url: formatImageUrl(user.profile_image_url_https)
        }
      })
      .catch(error => console.log(error))
  }
}

