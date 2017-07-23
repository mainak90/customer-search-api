const logger = require('../logger')
const reqHandler = require('../common/request.handler')

async function searchCustomer (config, searchParams) {
  let url = `${config.service.cdbCustomer.url}/cdbCustomer?firstName=${searchParams.firstName}&name=${searchParams.name}`
  if (searchParams.zip) {
    url = `${url}&zip=${searchParams.zip}`
  }
  if (searchParams.houseNumber) {
    url = `${url}&houseNumber=${searchParams.houseNumber}`
  }
  logger.info(`cdb-customer-service::will call ${url}`)
  return reqHandler.get(url)
}

async function searchCustomerByAccessNumber (config, searchParams) {
  const url = `${config.service.cdbCustomer.url}/accessNumber/${searchParams.accessNumber}/cdbCustomer`
  logger.info(`cdb-customer-service::will call ${url}`)
  return reqHandler.get(url)
}

async function searchCustomerByPni (config, pniAccount) {
  const url = `${config.service.cdbCustomer.url}/pniAccount/${pniAccount}/cdbCustomer`
  logger.info(`cdb-customer-service::will call ${url}`)
  return reqHandler.get(url)
}

module.exports = {
  search: searchCustomer,
  searchByAccessNumber: searchCustomerByAccessNumber,
  searchByPni: searchCustomerByPni
}
