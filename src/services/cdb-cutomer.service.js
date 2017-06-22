const fetch = require('node-fetch')

async function searchCustomer (config, searchParams) {
  const url = config.service.cdbCustomer.url + '?firstName=' + searchParams.firstName + '&name=' + searchParams.name
  try {
    const res = await fetch(url)
    switch (res.status) {
      case 200:
        return await res.json()
      case 400:
      case 404:
      case 500:
        const err = await res.json()
        console.error(`error calling :  ${url} ,${err}`)
        throw new Error(err)
      default:
        throw new Error(`not handled error code ${res.status}`)
    }
  } catch (e) {
    console.error(`error calling :  ${url} ,${e}`)
    throw e
  }
}
module.exports = searchCustomer
