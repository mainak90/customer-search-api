async function searchCustomer (query) {
  return Promise.resolve([
    {
      firstName: query.firstName,
      name: query.name
    }
  ])
}

module.exports = searchCustomer
