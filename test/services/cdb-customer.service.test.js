/* eslint-disable no-undef */
const simple = require('simple-mock')
const fetch = require('node-fetch')
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

  describe('searchCustomerByAccessNumber', function () {
    const searchCustomerByAccessNumber = require('../../src/services/cdb-customer.service').searchByAccessNumber
    const searchParams = {accessNumber: '026737599'}

    // noinspection JSCheckFunctionSignatures
    it('should return found customers when underlying service returns 200', (done) => {
      const response = {'status': 200}
      const customers = {'customers': [{'customerId': 1}]}
      simple.mock(response, 'json').resolveWith(customers)
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(response))

      searchCustomerByAccessNumber(config, searchParams).should.eventually.equal(customers).notify(done)
    })

    it('should throw an error  when call to underlying service fails', (done) => {
      const err = new Error('my error')
      simple.mock(fetch, 'Promise').returnWith(Promise.reject(err))

      searchCustomerByAccessNumber(config, searchParams).should.be.rejectedWith(err).notify(done)
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
      searchCustomerByAccessNumber(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
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
      searchCustomerByAccessNumber(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
    })

    it('should throw an error  when call to underlying service returns 404', (done) => {
      const errMsg = {stackTrace: 'Error stacktrace'}
      const response = {'status': 404}
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
      simple.mock(response, 'json').resolveWith(errMsg)
      searchCustomerByAccessNumber(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
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
    it('should return found customers when underlying service returns 200', (done) => {
      const response = {'status': 200}
      const customers = {'customers': [{'customerId': 1}]}
      simple.mock(response, 'json').resolveWith(customers)
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(response))

      searchCustomerByPni(config, pniAccount).should.eventually.equal(customers).notify(done)
    })

    it('should throw an error  when call to underlying service fails', (done) => {
      const err = new Error('my error')
      simple.mock(fetch, 'Promise').returnWith(Promise.reject(err))

      searchCustomerByPni(config, '10387806').should.be.rejectedWith(err).notify(done)
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
      searchCustomerByPni(config, '10387806').should.be.rejectedWith(errMsg).notify(done)
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
      searchCustomerByPni(config, '10387806').should.be.rejectedWith(errMsg).notify(done)
    })

    it('should throw an error  when call to underlying service returns 404', (done) => {
      const errMsg = {stackTrace: 'Error stacktrace'}
      const response = {'status': 404}
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
      simple.mock(response, 'json').resolveWith(errMsg)
      searchCustomerByPni(config, '10387806').should.be.rejectedWith(errMsg).notify(done)
    })

    it('should throw an error when call to underlying service returns an unhandled code', (done) => {
      const errMsg = {stackTrace: 'Error stacktrace'}
      const response = {'status': 403}
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
      simple.mock(response, 'json').resolveWith(errMsg)
      searchCustomerByPni(config, '10387806').should.be.rejectedWith(errMsg).notify(done)
    })
  })
})
