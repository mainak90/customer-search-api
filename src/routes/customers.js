const express = require('express')
const router = express.Router()
const customerSearch = require('../search')

router.get('/', async (req, res) => {
  try {
    const result = await customerSearch(req.query)
    res.send(result)
  } catch (e) {
    res.status(500).end()
  }
})

module.exports = router
