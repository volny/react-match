const getUserData = require('./api.js').getUserData

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.getTwitterScore = (req, res) => {
  // TODO replace this with production URL
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET')
  // TODO protect against malicious/wrong user input (e.g. ?user=ev&user=felix currently crashes to app)
  // what should happen is that anything thats not <URL>?username=<string> should return proper JSON that says query is not valid
  getUserData(req.query.username)
    .then(data => res.status(200).send(data))
}
