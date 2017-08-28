const Twitter = require('twitter')
const secrets = require('./secrets')
const twitter = new Twitter(secrets)
const calculateScore = require('./functions').calculateScore
const formatImageUrl = require('./functions').formatImageUrl

const DEBUG = true

// twitter counts tweets first, then filters out retweets and replies
const numberOfTweets = 100

module.exports = {
  getUserData: (player) => {
    const timeline = twitter.get('statuses/user_timeline', {
      screen_name: player,
      // no retweets
      include_rts: false,
      // no replies
      exclude_replies: true,
      count: numberOfTweets,
      trim_user: true
    })

    const user = twitter.get('users/show', {screen_name: player})

    return Promise.all([timeline, user])
      .then(values => {
        const user = values[1]
        const timeline = values[0]
        if (DEBUG) {
          const debugVals = calculateScore(user, timeline, numberOfTweets, true)
          return {
            name:user.name,
            debug: debugVals,
            score: debugVals.score,
            description: user.description,
            image_url: formatImageUrl(user.profile_image_url_https)
          }
        }
        return {
          name: user.name,
          score: calculateScore(user, timeline, numberOfTweets),
          description: user.description,
          image_url: formatImageUrl(user.profile_image_url_https)
        }
      })
      .catch(error => console.log(error))
  }
}

