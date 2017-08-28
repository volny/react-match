const Twitter = require('twitter')
const secrets = require('./secrets')
const twitter = new Twitter(secrets)

// twitter counts tweets first, then filters out retweets and replies
// therefore this is a theorical upper limit for how many tweets are fetched
// the higher the number the more 'accurate' the result, but more data needs to be fetched and iterated over
// you can change this number and the score should be 'weighted' relatively, meaning
// fewer tweets just treats those as proportionally more important
const numberOfTweets = 100

// TODO put this in a file ./calculateScore.js

const calculateScore = (user, timeline) => {
  const userScore = user.followers_count * 3 + user.statuses_count

  const timelineSums = timeline.reduce((p, v, i) => ({
    retweet_count: p.retweet_count + v.retweet_count,
    favorite_count: p.favorite_count + v.favorite_count,
    tweets_count: i + 1
  }), {
    retweet_count: 0,
    favorite_count: 0,
    tweets_count: 0
  })

  // users with more replies/retweets have less tweets fetched and shouldn't be punished for that
  const tweetWeight = numberOfTweets / timelineSums.tweets_count
  const timelineScore = (timelineSums.retweet_count + timelineSums.favorite_count) * tweetWeight
  // how influencial should userScore / timelineScore be
  const userToTimelineWeight = 300 / numberOfTweets
  const squaredScore = userScore + timelineScore * userToTimelineWeight
  return Math.floor(Math.sqrt(squaredScore))
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
      count: numberOfTweets,
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

//const calculateScore = (timeline) => {
//  const numberOfTweets = 10
//  const timelineSums = timeline.reduce((p, v, i) => ({
//    retweet_count: p.retweet_count + v.retweet_count,
//    favorite_count: p.favorite_count + v.favorite_count,
//    tweets_count: i + 1
//  }), {
//    retweet_count: 0,
//    favorite_count: 0,
//    tweets_count: 0
//  })
//
//  // users with more replies/retweets have less tweets fetched and shouldn't be punished for that
//  const tweetWeight = numberOfTweets / timelineSums.tweets_count
//  const timelineScore = (timelineSums.retweet_count + timelineSums.favorite_count) * tweetWeight
//  // how influencial should userScore / timelineScore be
//  const userToTimelineWeight = 300 / numberOfTweets
//  const squaredScore = timelineScore * userToTimelineWeight
//  //return Math.floor(Math.sqrt(squaredScore))
//  return {
//    tweetWeight: tweetWeight,
//    retweets: timelineSums.retweet_count,
//    favorites: timelineSums.favorite_count,
//    timelineScore: timelineScore,
//    squaredScore: squaredScore
//  }
//}


