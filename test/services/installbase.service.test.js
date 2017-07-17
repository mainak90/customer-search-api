/* eslint-disable no-undef */
const simple = require('simple-mock')
const fetch = require('node-fetch')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

describe('installbase service', function () {

  afterEach(() => {
    simple.restore()
  })

  const config = {
    service: {
      cdbCustomer: {
        url: 'http://serviceurl'
      },
      installbase: {
        url: 'http://installbaseUrl'
      }
    }
  }
  describe('searchMobileSubscriptions', function () {
    const searchMobileSubs = require('../../src/services/installbase.service').search
    const searchParams = {msisdn: '0484567890'}

    // noinspection JSCheckFunctionSignatures
    it('should return found subscriptions when underlying service returns 200', (done) => {
      const response = {'status': 200}
      const subs = {
        mobileSubscriptions: [
          {
            msisdn: '0476200312',
            'pniAccount': '10387806'
          }]
      }

      simple.mock(response, 'json').resolveWith(subs)
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(response))

      searchMobileSubs(config, searchParams).should.eventually.equal(subs).notify(done)
    })

    it('should throw an error  when call to underlying service fails', (done) => {
      const err = new Error('my error')
      simple.mock(fetch, 'Promise').returnWith(Promise.reject(err))

      searchMobileSubs(config, searchParams).should.be.rejectedWith(err).notify(done)
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
      searchMobileSubs(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
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
      searchMobileSubs(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
    })

    it('should throw an error  when call to underlying service returns 404', (done) => {
      const errMsg = {stackTrace: 'Error stacktrace'}
      const response = {'status': 404}
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
      simple.mock(response, 'json').resolveWith(errMsg)
      searchMobileSubs(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
    })

    it('should throw an error when call to underlying service returns an unhandled code', (done) => {
      const errMsg = {stackTrace: 'Error stacktrace'}
      const response = {'status': 403}
      simple.mock(fetch, 'Promise').returnWith(Promise.resolve(Promise.resolve(response)))
      simple.mock(response, 'json').resolveWith(errMsg)
      searchMobileSubs(config, searchParams).should.be.rejectedWith(errMsg).notify(done)
    })
  })

})
