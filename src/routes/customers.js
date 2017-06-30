const express = require('express')
const config = require('../../config')
const customerService = require('../services/cdb-customer.service')
const commonResponses = require('../common/response')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await
      customerService.search(config, req.query)
    const response = {message: [{searchCriteria: 'byName', result: result}]}
    res.send(response)
  } catch (e) {
    commonResponses.serverError(res, e)
  }
})

router.get('/accessNumber/:accessNumber', async (req, res) => {
  try {
    const result = await
      customerService.searchByAccessNumber(config, req.params)
    const response = {message: [{searchCriteria: 'byAccessNumber', result: result}]}
    res.send(response)
  } catch (e) {
    commonResponses.serverError(res, e)
  }
})

module.exports = router
