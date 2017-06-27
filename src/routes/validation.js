const util = require('util')
const responses = require('../common/response')
const validationRegexp = require('../common/validation-regexp')

const validate = async (req, res, next) => {
  req.checkQuery(['name'], 'name should be one of alpha characters').matches(validationRegexp.alphaWithDashAndQuote, 'i')
  req.checkQuery('firstName', 'firstName should be one of alpha characters').matches(validationRegexp.alphaWithDashAndQuote, 'i')
  req.checkQuery('name', 'name should have max length of 50').isLength({max: 50})
  req.checkQuery('firstName', 'firstName should have max length of 50').isLength({max: 50})

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      responses.badRequest(res, 'There have been validation errors: ' + util.inspect(result.array()))
    } else {
      next()
    }
  })
}

module.exports = validate
