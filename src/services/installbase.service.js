const logger = require('../logger')
const reqHandler = require('../common/request.handler')

async function searchMobileSubscriptions (config, searchParams) {
  const url = `${config.service.installbase.url}/mobile-subscriptions?msisdn=${searchParams.msisdn}`
  logger.info(`installbase.service::will call ${url}`)
  return reqHandler.get(url)
}

module.exports = {
  search: searchMobileSubscriptions
}
