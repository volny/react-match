import axios from 'axios'

const url = 'https://us-central1-twitter-scorecard-177703.cloudfunctions.net/getTwitterScore'

export const getFromTwitter = async (username) => {
  try {
    const data = await axios.get(`${url}?username=${username}`)
    return data.data
  } catch (error) {
    handleError(error)
  }
}

export const sortPlayers = (players) => (
  players.sort((a, b) => b.score - a.score)
)

const handleError = (error) => {
  console.warn(error)
  return null
}

