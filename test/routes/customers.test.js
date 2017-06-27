/* eslint-disable no-undef */
const simple = require('simple-mock')
const request = require('supertest')
const express = require('express')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const customersRoute = require('../../src/routes/customers')
const bodyParser = require('body-parser')
const customerService = require('../../src/services/cdb-customer.service')

chai.use(chaiAsPromised)
chai.should()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
let server

describe('/customers', function () {
  before(() => {
    app.use('/customers', customersRoute)
  })

  beforeEach(() => {
    server = app.listen(3211)
  })

  afterEach(() => {
    server.close()
    simple.restore()
  })

  // noinspection JSCheckFunctionSignatures
  it('should return 200 with customers when cdb service returns results', (done) => {
    const cdbResponse = {'customers': [{'customerId': 1}]}
    const expectedResponse = {message: [{searchCriteria: 'name', result: cdbResponse}]}
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
