const _ = require('lodash')
// extracted from @proximus/middle-js
let badRequest = (res, reason) => {
  res.status(400)
    .json({message: 'request not accepted', reason: reason})
    .end()
}

let noAccess = (res, reason) => {
  res.status(401)
    .json({message: 'no access', reason: reason})
    .end()
}

let serverError = (res, err) => {
  res.status(500)
    .json({message: 'server error', reason: err.message})
    .end()
}

let _validateString = (param) => {
  return (!param) ? false : /^(-|\w)+$/.test(param)
}

let _validateObject = (obj) => {
  return _.isObject(obj) && !_.find(_.keys(obj), key => !_validateString(key)) && !_.find(_.values(obj), value => !validate(value))
}

let _validateArray = (arr) => {
  return _.isArray(arr) && !_.find(arr, item => !validate(item))
}

let validate = (obj) => {
  if (_.isString(obj)) {
    return _validateString(obj)
  }
  if (_.isArray(obj)) {
    return _validateArray(obj)
  }
  if (_.isObject(obj)) {
    return _validateObject(obj)
  }
  if (_.isNumber(obj)) {
    return true
  }
  return _.isBoolean(obj)
}

module.exports = {
  badRequest: badRequest,
  noAccess: noAccess,
  serverError: serverError,
  paramValidation: validate
}
