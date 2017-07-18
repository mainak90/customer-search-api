/* eslint-disable no-undef */
const simple = require('simple-mock')
const reqHandler = require('../../src/common/request.handler')
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
      installbase: {
        url: 'http://installbaseUrl'
      }
    }
  }
  describe('searchMobileSubscriptions', function () {
    const searchMobileSubs = require('../../src/services/installbase.service').search
    const searchParams = {msisdn: '0484567890'}

    // noinspection JSCheckFunctionSignatures
    it('should return found subscriptions when underlying utrl call returns subscriptions', (done) => {
      const subs = {
        mobileSubscriptions: [
          {
            msisdn: '0476200312',
            'pniAccount': '10387806'
          }]
      }

      simple.mock(reqHandler, 'get').returnWith(subs)

      searchMobileSubs(config, searchParams).should.eventually.equal(subs).notify(done)
    })

    it('should throw an error  when call to underlying service fails', (done) => {
      const err = new Error('my error')
      simple.mock(reqHandler, 'get').throwWith(err)

      searchMobileSubs(config, searchParams).should.be.rejectedWith(err).notify(done)
    })

  })

})
