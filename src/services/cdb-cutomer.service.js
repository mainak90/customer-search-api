const fetch = require('node-fetch')

async function searchCustomer (searchParams) {
  try {
    const res = await fetch('http://el3923.bc:8496/cdb-customer-provider/cdbCustomer?name=Dupont&firstName=Rene')
    if (res.status === 200) {
      const json = await res.json()
      return json.customers
    } else return []
  } catch (e) {
    console.error(`error calling cdb endpoint,${e}`)
  }
}
module.exports = searchCustomer
