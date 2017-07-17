const fetch = require('node-fetch')
const logger = require('../logger')

async function get (url) {
  try {
    const res = await fetch(url)
    switch (res.status) {
      case 200:
        return await res.json()
      case 400:
      case 404:
      case 500:
        const err = await res.json()
        logger.error('error calling ', url, err)
        throw new Error(err)
      default:
        throw new Error(`not handled error code ${res.status}`)
    }
  } catch (e) {
    logger.error(`error calling :  ${url} ,${e}`)
    throw e
  }
}

module.exports = {
  get: get
}
