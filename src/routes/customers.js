const express = require('express')
const config = require('../../config')
const customerService = require('../services/cdb-customer.service')
const installbaseService = require('../services/installbase.service')
const commonResponses = require('../common/response')
const _ = require('lodash')

const customersRoute = (validation) => {
  const router = express.Router()
  router.get('/', validation.validateQuery, async (req, res) => {
    try {
      const result = await customerService.search(config, req.query)
      res.send({message: [{searchCriteria: 'byName', result: result}]})
    } catch (e) {
      commonResponses.serverError(res, e)
    }
  })

  router.get('/accessNumber/:accessNumber', validation.validateAccessNumber, async (req, res) => {
    try {
      const result = await customerService.searchByAccessNumber(config, req.params)
      res.send({message: [{searchCriteria: 'byAccessNumber', result: result}]})
    } catch (e) {
      commonResponses.serverError(res, e)
    }
  })

  router.get('/msisdn/:msisdn', validation.validateMsisdn, async (req, res) => {
    try {
      const subs = await installbaseService.search(config, req.params)
      if (_.isArray(subs.mobileSubscriptions) &&
        subs.mobileSubscriptions.length > 0 &&
        subs.mobileSubscriptions[0].pniAccount) {
        const result = await customerService.searchByPni(config, subs.mobileSubscriptions[0].pniAccount)
        res.send({message: [{searchCriteria: 'byMsisdn', result: result}]})
      } else {
        res.send({message: [{searchCriteria: 'byMsisdn', result: []}]})
      }
    } catch (e) {
      commonResponses.serverError(res, e)
    }
  })

  return router
}

module.exports = customersRoute
