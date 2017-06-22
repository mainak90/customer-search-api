const express = require('express')
const router = express.Router()
const _ = require('lodash')
const config = require('../../config')
const searchCustomer = require('../services/cdb-cutomer.service')
const curriedSearchCustomer = _.curry(searchCustomer)(config)

router.get('/', async (req, res) => {
  try {
    // TODO validate query
    const result = await curriedSearchCustomer(req.query)
    const response = {message: [{searchCriteria: 'name', result: result}]}
    res.send(response)
  } catch (e) {
    res.status(500).end()
  }
})

module.exports = router
