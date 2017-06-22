const simple = require('simple-mock')
const commonReponse = require('../src/common/common-response')
const searchCustomer = require('../src/services/cdb-cutomer.service')
const fetch = require('node-fetch')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

describe('cdb-customer search service', function () {
  const config = {
    service: {
      cdbCustomer: {
        url: 'http://serviceurl'
      }
    }
  }
  const searchParams = {
    firstName: 'Jack',
    name: 'Daniels'
  }

  // noinspection JSCheckFunctionSignatures
  it('should return found customers when underlying service returns 200', (done) => {

    const response = {'status': 200}
    const customers = {'customers': [{'customerId': 1}]}
    simple.mock(response, 'json').resolveWith(customers)
    simple.mock(fetch, 'Promise').returnWith(Promise.resolve(response))

    searchCustomer(config, searchParams).should.eventually.equal(customers).notify(done)
  })

  it('should throw an error  when call to underlying service fails', (done) => {
    const err = new Error('my error')
    simple.mock(fetch, 'Promise').returnWith(Promise.reject(err))

    searchCustomer(config, searchParams).should.be.rejectedWith(err).notify(done)
  })

  it('should throw an error when call to underlying service returns 500', (done) => {
    const errMsg = {
      uuid: '02fb8fbf-d321-44d3-b4b0-8836421e302f',
      exceptionType: 'NoSuchElementException',
      stackTrace: 'Error stacktrace'
    }
    const response = {'status': 500}
    simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
    simple.mock(response, 'json').resolveWith(errMsg)
    searchCustomer(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
  })
  it('should throw an error  when call to underlying service returns 400', (done) => {
    const errMsg = {
      uuid: '02fb8fbf-d321-44d3-b4b0-8836421e302f',
      exceptionType: 'NoSuchElementException',
      stackTrace: 'Error stacktrace'
    }
    const response = {'status': 400}
    simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
    simple.mock(response, 'json').resolveWith(errMsg)
    searchCustomer(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
  })

  it('should throw an error  when call to underlying service returns 404', (done) => {
    const errMsg = {stackTrace: 'Error stacktrace'}
    const response = {'status': 404}
    simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
    simple.mock(response, 'json').resolveWith(errMsg)
    searchCustomer(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
  })

  it('should throw an error when call to underlying service returns an unhandled code', (done) => {
    const errMsg = {stackTrace: 'Error stacktrace'}
    const response = {'status': 403}
    simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
    simple.mock(response, 'json').resolveWith(errMsg)
    searchCustomer(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
  })
})
