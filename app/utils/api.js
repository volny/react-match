import axios from 'axios'
import Q from 'q'
import Codebird from 'codebird'
import { API_KEY, API_SECRET } from './twitterSecrets'

const codebird = new Codebird()
codebird.setConsumerKey(API_KEY, API_SECRET)

// NOTE
// of all the tries below, only the callback version seems to work
// it's such a hack anyways - forcing me to expose api secrets,
// and dealing with a low quality and outdated mess that is codebird

// callback version
// const getTwitterUserData = (player) => {
//   codebird.__call(
//     'users_show',
//     {screen_name: player},
//     (reply, rate, error) => {
//       const { name, followers_count, statuses_count, description, profile_image_url_https} = reply
//       error ? console.error({error}) : console.log(
//         {name},
//         {followers_count},
//         {statuses_count},
//         {description},
//         {profile_image_url_https}
//         )
//     }
//   )
// }

// promises version - needs a promises lib like Q to work
// const getTwitterUserData = (player) => {
//   codebird.__call(
//     'users_show',
//     {screen_name: player}
//   ).then((data) => {
//     return data.reply
//   }, (error) => {
//     handleError(error)
//   })
// }
// getTwitterUserData('jack').then((data) => console.log({data}))

// 'Q' returns a promise that can't be resolved ...
// const getTwitterUserData = (player) => {
//   return Q.fcall(codebird.__call(
//     'users_show',
//     {screen_name: player}
//   ))
//   .then(data => data.reply)
// }
// getTwitterUserData('jack').then(data => console.log(data))

// async version seems not to work
// const getTwitterUserData = async (player) => {
//   const data = await codebird.__call('user_show', {screen_name: player})
//   return data.reply
// }
// console.log('async:', getTwitterUserData('jack'))

const getProfile = async (username) => {
  const URI = `https://api.github.com/users/${encodeURIComponent(username)}`
  const user = await axios.get(URI)
  return user.data
}

const getRepos = (username) => {
  const URI = `https://api.github.com/users/${encodeURIComponent(username)}/repos`
  return axios.get(URI)
}

const getStarCount = (repos) => (
  repos.data.reduce((count, repo) => count + repo.stargazers_count
  , 0)
)

const calculateScore = (profile, repos) => {
  const followers = profile.followers
  const totalStars = getStarCount(repos)
  return followers * 3 + totalStars
}

const getUserData = async (player) => {
  const arrayOfPromises = [getProfile(player), getRepos(player)]

  // just setting up my twttr
  // getTwitterUserData(player)

  try {
    const data = await axios.all(arrayOfPromises)

    const profile = data[0]
    const repos = data[1]
    const score = calculateScore(profile, repos)
    return { profile, score }
  } catch (error) {
    handleError(error)
  }
}

const sortPlayers = (players) => (
  players.sort((a, b) => b.score - a.score)
)

const handleError = (error) => {
  console.warn(error)
  return null
}

export const battle = async (players) => {
  const arrayOfPromises = players.map(getUserData)
  try {
    const players = await axios.all(arrayOfPromises)
    return sortPlayers(players)
  } catch (error) {
    handleError(error)
  }
}

export const fetchPopularRepos = async (language) => {
  const URI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
  try {
    const response = await axios.get(URI)
    return response.data.items
  } catch (error) {
    handleError(error)
  }
}
