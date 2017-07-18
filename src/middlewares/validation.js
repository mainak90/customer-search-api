const util = require('util')
const responses = require('../common/response')
const validationRegexp = require('../common/validation-regexp')

const validateQuery = async (req, res, next) => {
  req.checkQuery(['name'], 'name should be one of alpha characters').matches(validationRegexp.alphaWithDashAndQuote, 'i')
  req.checkQuery('firstName', 'firstName should be one of alpha characters').matches(validationRegexp.alphaWithDashAndQuote, 'i')
  req.checkQuery('name', 'name should have max length of 50').isLength({max: 50})
  req.checkQuery('firstName', 'firstName should have max length of 50').isLength({max: 50})
  await treatValidationResult(req, res, next)
}
const validateAccessNumber = async (req, res, next) => {
  req.checkParams(['accessNumber'], 'accessNumber should contain only digits').isNumeric()
  await treatValidationResult(req, res, next)
}

const validateMsisdn = async (req, res, next) => {
  req.checkParams(['msisdn'], 'msisdn should be a BE mobile phone').matches(validationRegexp.mobilePhone, 'i')
  await treatValidationResult(req, res, next)
}

const treatValidationResult = async (req, res, next) => {
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      responses.badRequest(res, 'There have been validation errors: ' + util.inspect(result.array()))
    } else {
      next()
    }
  })
}

module.exports = {
  validateQuery: validateQuery,
  validateAccessNumber: validateAccessNumber,
  validateMsisdn: validateMsisdn
}
