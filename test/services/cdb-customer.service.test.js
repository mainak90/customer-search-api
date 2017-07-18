/* eslint-disable no-undef */
const simple = require('simple-mock')
const fetch = require('node-fetch')
const reqHandler = require('../../src/common/request.handler')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

describe('cdb-customer search service', function () {

  afterEach(() => {
    simple.restore()
  })

  const config = {
    service: {
      cdbCustomer: {
        url: 'http://serviceurl'
      }
    }
  }

  describe('searchCustomer', function () {
    const searchCustomer = require('../../src/services/cdb-customer.service').search

    const searchParams = {
      firstName: 'Jack',
      name: 'Daniels'
    }

    // noinspection JSCheckFunctionSignatures
    it('should return found customers when call to urn returns results', (done) => {
      const customers = {'customers': [{'customerId': 1}]}
      simple.mock(reqHandler, 'get').returnWith(customers)

      searchCustomer(config, searchParams).should.eventually.equal(customers).notify(done)
    })

    it('should throw an error  when call to underlying service fails', (done) => {
      const err = new Error('my error')
      simple.mock(reqHandler, 'get').throwWith(err)

      searchCustomer(config, searchParams).should.be.rejectedWith(err).notify(done)
    })

  })

  describe('searchCustomerByAccessNumber', function () {
    const searchCustomerByAccessNumber = require('../../src/services/cdb-customer.service').searchByAccessNumber
    const searchParams = {accessNumber: '026737599'}

    // noinspection JSCheckFunctionSignatures
    it('should return found customers when underlying service returns 200', (done) => {
      const customers = {'customers': [{'customerId': 1}]}
      simple.mock(reqHandler, 'get').returnWith(customers)

      searchCustomerByAccessNumber(config, searchParams).should.eventually.equal(customers).notify(done)
    })

    it('should throw an error  when call to underlying service fails', (done) => {
      const err = new Error('my error')
      simple.mock(reqHandler, 'get').throwWith(err)

      searchCustomerByAccessNumber(config, searchParams).should.be.rejectedWith(err).notify(done)
    })

    it('should throw an error when call to underlying service returns an unhandled code', (done) => {
      const errMsg = {stackTrace: 'Error stacktrace'}
      const response = {'status': 403}
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
      simple.mock(response, 'json').resolveWith(errMsg)
      searchCustomerByAccessNumber(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
    })
  })

  describe('searchCustomerByPni', function () {
    const searchCustomerByPni = require('../../src/services/cdb-customer.service').searchByPni
    const pniAccount = '10387806'

    // noinspection JSCheckFunctionSignatures
    it('should return response of a underlying call to url returns results', (done) => {
      const customers = {'customers': [{'customerId': 1}]}
      simple.mock(reqHandler, 'get').returnWith(customers)
      searchCustomerByPni(config, pniAccount).should.eventually.equal(customers).notify(done)
    })

    it('should throw an error  when call to underlying service fails', (done) => {
      const err = new Error('my error')
      simple.mock(reqHandler, 'get').throwWith(err)
      searchCustomerByPni(config, pniAccount).should.be.rejectedWith(err).notify(done)
    })
  })
})
