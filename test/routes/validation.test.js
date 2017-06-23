/* eslint-disable no-undef */
const simple = require('simple-mock')
const request = require('supertest')
const express = require('express')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const validationRoute = require('../../src/routes/validation')
const bodyParser = require('body-parser')
const validator = require('express-validator')

chai.use(chaiAsPromised)
chai.should()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(validator())

let server

describe('/customers', function () {
  before(() => {
    app.use(validationRoute)
  })

  beforeEach(() => {
    server = app.listen(3211)
  })

  afterEach(() => {
    server.close()
    simple.restore()
  })

  // noinspection JSCheckFunctionSignatures
  it('should return 404 no name & firstName defined', (done) => {
    request(app)
      .get('/customers')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, {body: result}) => {
        if (err) throw err
        result.should.have.property('message')
        result.should.have.property('reason')
        if (err) throw err
        result.message.should.be.equals('request not accepted')
        result.reason.should.contain('firstName should be one of alpha characters')
        result.reason.should.contain('name should be one of alpha characters')
        done()
      })
  })
  it('should return 404 no firstName defined', (done) => {
    request(app)
      .get('/customers?name=Jack')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, {body: result}) => {
        if (err) throw err
        result.message.should.be.equals('request not accepted')
        result.reason.should.contain('firstName should be one of alpha characters')
        done()
      })
  })
  it('should return 404 no name query param', (done) => {
    request(app)
      .get('/customers?firstName=Jack')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, {body: result}) => {
        if (err) throw err
        result.message.should.be.equals('request not accepted')
        result.reason.should.contain('name should be one of alpha characters')
        done()
      })

  })
  it('should return 404 name contains not allowed numeric  characters', (done) => {
    request(app)
      .get('/customers?firstName=Jack&name=Dan1')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, {body: result}) => {
        if (err) throw err
        result.message.should.be.equals('request not accepted')
        result.reason.should.contain('name should be one of alpha characters')
        done()
      })
  })
  it('should return 404 name contains not allowed numeric  characters', (done) => {
    request(app)
      .get('/customers?firstName=Jack1&name=Daniels')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, {body: result}) => {
        if (err) throw err
        result.message.should.be.equals('request not accepted')
        result.reason.should.contain('firstName should be one of alpha characters')
        done()
      })
  })
  it('should return 404 name contains not allowed \'_\'  character', (done) => {
    request(app)
      .get('/customers?firstName=Jack&name=Dan_')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, {body: result}) => {
        if (err) throw err
        result.message.should.be.equals('request not accepted')
        result.reason.should.contain('name should be one of alpha characters')
        done()
      })
  })
  it('should return 404 firstName contains not allowed \'_\'  character', (done) => {
    request(app)
      .get('/customers?firstName=Jack_&name=Daniels')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, {body: result}) => {
        if (err) throw err
        result.message.should.be.equals('request not accepted')
        result.reason.should.contain('firstName should be one of alpha characters')
        done()
      })
  })
  it('should return 404 name is >50 chars', (done) => {
    const looongName = Array(52).join('x')
    request(app)
      .get(`/customers?name=${looongName}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, {body: result}) => {
        if (err) throw err
        result.message.should.be.equals('request not accepted')
        result.reason.should.contain('name should have max length of 50')
        done()
      })
  })
  it('should return 404 name is >50 chars', (done) => {
    const looongFirstName = Array(52).join('x')
    request(app)
      .get(`/customers?firstName=${looongFirstName}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, {body: result}) => {
        if (err) throw err
        result.message.should.be.equals('request not accepted')
        result.reason.should.contain('firstName should have max length of 50')
        done()
      })
  })
})
