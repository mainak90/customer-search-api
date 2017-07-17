/* eslint-disable no-undef */
const simple = require('simple-mock')
const fetch = require('node-fetch')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

describe('request.handler', function () {

  afterEach(() => {
    simple.restore()
  })

  describe('get', function () {
    const handlerGet = require('../../src/common/request.handler').get
    const url = 'http://someurl'
    const customers = {customers: [{customerId: '0476200312'}]}

    // noinspection JSCheckFunctionSignatures
    it('should return 200 with response if  underlying url returns 200', (done) => {
      const response = {'status': 200}
      simple.mock(response, 'json').resolveWith(customers)
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(response))

      handlerGet(url).should.eventually.equal(customers).notify(done)
    })

    it('should throw an error  when call to underlying url fails', (done) => {
      const err = new Error('my error')
      simple.mock(fetch, 'Promise').returnWith(Promise.reject(err))

      handlerGet(url).should.be.rejectedWith(err).notify(done)
    })

    it('should throw an error when call to underlying url returns 500', (done) => {
      const errMsg = {
        uuid: '02fb8fbf-d321-44d3-b4b0-8836421e302f',
        exceptionType: 'NoSuchElementException',
        stackTrace: 'Error stacktrace'
      }
      const response = {'status': 500}
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
      simple.mock(response, 'json').resolveWith(errMsg)
      handlerGet(url).should.be.rejectedWith(errMsg).notify(done)
    })

    it('should throw an error  when call to underlying url returns 400', (done) => {
      const errMsg = {
        uuid: '02fb8fbf-d321-44d3-b4b0-8836421e302f',
        exceptionType: 'NoSuchElementException',
        stackTrace: 'Error stacktrace'
      }
      const response = {'status': 400}
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
      simple.mock(response, 'json').resolveWith(errMsg)
      handlerGet(url).should.be.rejectedWith(errMsg).notify(done)
    })

    it('should throw an error  when call to underlying service returns 404', (done) => {
      const errMsg = {stackTrace: 'Error stacktrace'}
      const response = {'status': 404}
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
      simple.mock(response, 'json').resolveWith(errMsg)
      handlerGet(url).should.be.rejectedWith(errMsg).notify(done)
    })

    it('should throw an error when call to underlying service returns an unhandled code', (done) => {
      const errMsg = {stackTrace: 'Error stacktrace'}
      const response = {'status': 403}
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
      simple.mock(response, 'json').resolveWith(errMsg)
      handlerGet(url).should.be.rejectedWith(errMsg).notify(done)
    })
  })

})
