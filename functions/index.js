const getUserData = require('./api.js').getUserData

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.printFollowersCount = (req, res) => {
  // TODO replace this with production URL
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET')
  getUserData('jack')
    .then((data) => {
      res.status(200).send(`${data.name} has ${data.followers_count} followers`)
    })
}
