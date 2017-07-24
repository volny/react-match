import axios from 'axios'

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
  const array_of_promises = [getProfile(player), getRepos(player)]
  try {
    const data = await axios.all(array_of_promises)

    const profile = data[0]
    const repos = data[1]
    const score = calculateScore(profile, repos)
    return { profile, score }
  } catch (error) {
    handleError(error)
  }
}

const sortPlayers = (players) => (
  players.sort((a,b) => b.score - a.score)
)

const handleError = (error) => {
  console.warn(error)
  return null
}

export const battle = async (players) => {
  const array_of_promises = players.map(getUserData)
  try {
    const players = await axios.all(array_of_promises)
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
