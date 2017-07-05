const express = require('express')
const config = require('../../config')
const customerService = require('../services/cdb-customer.service')
const commonResponses = require('../common/response')

const customersRoute = (validation) => {
  const router = express.Router()
  router.get('/', validation.validateQuery, async (req, res) => {
    try {
      const result = await
        customerService.search(config, req.query)
      const response = {message: [{searchCriteria: 'byName', customers: result.customers}]}
      res.send(response)
    } catch (e) {
      commonResponses.serverError(res, e)
    }
  })

  router.get('/accessNumber/:accessNumber', validation.validateReq, async (req, res) => {
    try {
      const result = await
        customerService.searchByAccessNumber(config, req.params)
      const response = {message: [{searchCriteria: 'byAccessNumber', customers: [result.message]}]}
      res.send(response)
    } catch (e) {
      commonResponses.serverError(res, e)
    }
  })
  return router
}

module.exports = customersRoute
