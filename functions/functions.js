module.exports = {
  calculateScore: (user, timeline, numberOfTweets, DEBUG) => {
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
    const userToTimelineWeight = 1000 / numberOfTweets
    const squaredScore = userScore + (timelineScore * userToTimelineWeight)

    if (DEBUG) {
      return {
        followers: user.followers_count,
        statuses: user.statuses_count,
        userScore_squared: userScore,
        actual_tweets: `${timelineSums.tweets_count} out of ${numberOfTweets}`,
        total_retweets: timelineSums.retweet_count,
        total_favorites: timelineSums.favorite_count,
        tweetWeight: tweetWeight,
        timelineScore_unweighted_squared: timelineScore,
        userToTimelineWeight: userToTimelineWeight,
        score_squared: squaredScore,
        score_contributors: `user: ${Math.floor(Math.sqrt(userScore))}, timeline: ${Math.floor(Math.sqrt(timelineScore * userToTimelineWeight))}`,
        score: Math.floor(Math.sqrt(squaredScore))
      }
    }
    return Math.floor(Math.sqrt(squaredScore))
  },

  formatImageUrl: (url) => {
    const toReplace = 'normal'
    const replaceBy = '400x400'
    const index = url.lastIndexOf(toReplace)
    return url.substring(0, index) + replaceBy + url.substring(index + toReplace.length)
  }
}



