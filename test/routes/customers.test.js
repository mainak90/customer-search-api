/* eslint-disable no-undef */
const simple = require('simple-mock')
const request = require('supertest')
const express = require('express')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const validation = require('../../src/middlewares/validation')

const bodyParser = require('body-parser')
const customerService = require('../../src/services/cdb-customer.service')
const installBaseService = require('../../src/services/installbase.service')

const customersRoute = require('../../src/routes/customers')

chai.use(chaiAsPromised)
chai.should()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
let server

describe('/customers', function () {
  before(() => {
    const validationSpy = simple.spy((req, res, next) => { next() })
    simple.mock(validation, 'validateQuery').callFn(validationSpy)
    simple.mock(validation, 'validateAccessNumber').callFn(validationSpy)
    simple.mock(validation, 'validateMsisdn').callFn(validationSpy)
    app.use('/customers', customersRoute(validation))
  })

  beforeEach(() => {
    server = app.listen(3211)
  })

  afterEach(() => {
    server.close()
    simple.restore()
  })
  describe('GET /customers by name & firstname ', function () {
    // noinspection JSCheckFunctionSignatures
    it('should return 200 with customers when cdb service returns results', (done) => {
      const cdbResponse = {customers: [{'customerId': 1}]}
      const expectedResponse = {message: [{searchCriteria: 'byName', customers: cdbResponse.customers}]}
      simple.mock(customerService, 'search').resolveWith(cdbResponse)

      request(app)
        .get('/customers?firstName=Jack&name=Daniels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          result.should.have.property('message')
          result.should.be.deep.equals(expectedResponse)
          done()
        })

    })

    it('should return 500 with error message when service throws an error', (done) => {
      const err = new Error('my error')
      const expectedResponse = {message: 'server error', reason: err.message}
      simple.mock(customerService, 'search').rejectWith(err)

      request(app)
        .get('/customers?firstName=Jack&name=Daniels')
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          result.should.be.deep.equals(expectedResponse)
          done()
        })
    })
  })
  describe('GET /customers/accessNumber', function () {
    // noinspection JSCheckFunctionSignatures
    it('should return 200 with customers when cdb service returns results', (done) => {
      const cdbResponse = {message: {customerId: 1}}
      const expectedResponse = {message: [{searchCriteria: 'byAccessNumber', customers: [cdbResponse.message]}]}
      simple.mock(customerService, 'searchByAccessNumber').resolveWith(cdbResponse)

      request(app)
        .get('/customers/accessNumber/026737599')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          result.should.have.property('message')
          result.should.be.deep.equals(expectedResponse)
          done()
        })
    })

    it('should return 500 with error message when service throws an error', (done) => {
      const err = new Error('my error')
      const expectedResponse = {message: 'server error', reason: err.message}
      simple.mock(customerService, 'searchByAccessNumber').rejectWith(err)

      request(app)
        .get('/customers/accessNumber/026737599')
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          result.should.be.deep.equals(expectedResponse)
          done()
        })
    })
  })

  describe('GET /customers/msisdn', function () {
    it('should return 200 with empty customer array when installbase service doesn\'t return subscriptions ', (done) => {
      const installBaseResponse = {mobileSubscriptions: []}
      const expectedResponse = {message: [{searchCriteria: 'byMsisdn', customers: []}]}
      simple.mock(installBaseService, 'search').resolveWith(installBaseResponse)

      request(app)
        .get('/customers/msisdn/0478898989')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          result.should.have.property('message')
          result.should.be.deep.equals(expectedResponse)
          done()
        })
    })

    it('should return 200 with empty customer array when installbase service returns subscriptions but no pniAccount', (done) => {
      const installBaseResponse = {
        mobileSubscriptions: [{
          msisdn: '0476200312'
        }]
      }
      const expectedResponse = {message: [{searchCriteria: 'byMsisdn', customers: []}]}
      simple.mock(installBaseService, 'search').resolveWith(installBaseResponse)

      request(app)
        .get('/customers/msisdn/0478898989')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          result.should.have.property('message')
          result.should.be.deep.equals(expectedResponse)
          done()
        })
    })

    it('should return 200 with customers installbase service returns subscriptions & cdb customer returns a customer by pniAccount', (done) => {
      const installBaseResponse = {
        mobileSubscriptions: [{
          msisdn: '0476200312',
          pniAccount: '10387806'
        }]
      }
      const cdbResponse = {'message': {'customerId': 1}}
      const expectedResponse = {message: [{searchCriteria: 'byMsisdn', customers: [cdbResponse.message]}]}
      simple.mock(installBaseService, 'search').resolveWith(installBaseResponse)
      simple.mock(customerService, 'searchByPni').resolveWith(cdbResponse)

      request(app)
        .get('/customers/msisdn/0478898989')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          result.should.have.property('message')
          result.should.be.deep.equals(expectedResponse)
          done()
        })
    })

    it('should return 500 with error message when installbase service throws an error', (done) => {
      const err = new Error('my error')
      const expectedResponse = {message: 'server error', reason: err.message}
      simple.mock(installBaseService, 'search').rejectWith(err)

      request(app)
        .get('/customers/msisdn/0478898989')
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          result.should.be.deep.equals(expectedResponse)
          done()
        })
    })
    it('should return 500 with error message when customerService throws an error', (done) => {
      const err = new Error('my error')
      const expectedResponse = {message: 'server error', reason: err.message}
      const installBaseResponse = {
        mobileSubscriptions: [{
          msisdn: '0476200312',
          pniAccount: '10387806'
        }]
      }
      simple.mock(installBaseService, 'search').resolveWith(installBaseResponse)
      simple.mock(customerService, 'searchByAccessNumber').rejectWith(err)

      request(app)
        .get('/customers/accessNumber/026737599')
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          result.should.be.deep.equals(expectedResponse)
          done()
        })
    })
  })
})
