/* eslint-disable no-undef */
const simple = require('simple-mock')
const request = require('supertest')
const express = require('express')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const validationRoute = require('../../src/middlewares/validation')
const bodyParser = require('body-parser')
const validator = require('express-validator')

chai.use(chaiAsPromised)
chai.should()
let server
let app
describe('validation middleware', function () {
  beforeEach(() => {
    server = app.listen(3211)
  })

  afterEach(() => {
    server.close()
    simple.restore()
  })
  after(() => {
    simple.restore()
  })
  
  describe('validateQuery', () => {
    before(() => {
      app = express()
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({extended: false}))
      app.use(validator())
      const router = express.Router()
      router.get('/customers', validationRoute.validateQuery, async (req, res) => {
        res.send({result: 'ok'})
      })
      app.use(router)
    })

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
          checkResultErrorMessage(result, ['firstName should be one of alpha characters', 'name should be one of alpha characters'])
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
          result.reason.should.contain('firstName should be one of alpha characters')
          checkResultErrorMessage(result, ['firstName should be one of alpha characters'])
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
          checkResultErrorMessage(result, ['name should be one of alpha characters'])
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
          checkResultErrorMessage(result, ['name should be one of alpha characters'])
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
          checkResultErrorMessage(result, ['firstName should be one of alpha characters'])
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
          checkResultErrorMessage(result, ['name should be one of alpha characters'])
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
          checkResultErrorMessage(result, ['firstName should be one of alpha characters'])
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
          checkResultErrorMessage(result, ['name should have max length of 50'])
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
          checkResultErrorMessage(result, ['firstName should have max length of 50'])
          done()
        })
    })
    it('should return 200 if all query params are correct', (done) => {
      request(app)
        .get(`/customers?firstName=Jack&name=Daniels`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          done()
        })
    })

  })

  describe('validateReq', () => {
    before(() => {
      app = express()
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({extended: false}))
      app.use(validator())
      const router = express.Router()
      router.get('/customers/accessNumber/:accessNumber', validationRoute.validateReq, async (req, res) => {
        res.send({result: 'ok'})
      })
      app.use(router)
    })

    it('should return 404 when access number contains non-digits', (done) => {
      request(app)
        .get('/customers/accessNumber/a')
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          checkResultErrorMessage(result, ['accessNumber should contain only digits'])
          done()
        })
    })
    it('should return 200 if params are passing the validation', (done) => {
      request(app)
        .get('/customers/accessNumber/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, {body: result}) => {
          if (err) throw err
          done()
        })
    })
  })
  const checkResultErrorMessage = (result, reasons) => {
    result.should.have.property('message')
    result.should.have.property('reason')
    result.message.should.be.equals('request not accepted')
    reasons.forEach(reason => {
      result.reason.should.contain(reason)
    })

  }
})
