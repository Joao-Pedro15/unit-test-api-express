const { describe, afterEach, beforeEach, it } = require("mocha");
const chai = require('chai')
const expect = chai.expect
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const rewire = require("rewire");
const sinon = require('sinon')
const request = require('supertest')

const healthCheckController = require('../controllers/health.controller')
const itemController = require('../controllers/item.controller')

const sandbox = sinon.createSandbox()
let app = rewire('../app')

describe('Testing express app routes', () => {
    afterEach(() => {
        app = rewire('../app')
        sandbox.restore()
    })

    describe('Testing /item route', () => {
        let sampleItem, hash;

        beforeEach(() => {
            hash = '1234567891'
            sampleItem = {
                name: 'sample item',
                price: 10,
                rating: '5',
                hash
            }
            sandbox.stub(itemController, 'readItem').resolves(sampleItem)
            sandbox.stub(itemController, 'createItem').resolves(sampleItem)
            sandbox.stub(itemController, 'updateItemHash').resolves(sampleItem)
        })

        it('GET /:hash should successfully return item', (done) => {
            request(app)
            .get(`/item/${hash}`)
            .expect(200)
            .end((err, response) => {
                expect(response.body).to.have.property('message').to.equal('Item read successfully!')
                expect(response.body).to.have.property('item')
                .to.have.property('name')
                .to.equal('sample item')
                expect(response.body).to.have.property('item').to.have.property('price').to.equal(10)
                expect(response.body).to.have.property('item').to.have.property('rating').to.equal('5')
                expect(response.body).to.have.property('item').to.have.property('hash').to.equal(hash)
                done(err) // err is null in success scenario
            })
        })

        it('POST / should successfully create a new item', (done) => {
            request(app)
            .post('/item/')
            .send(sampleItem)
            .expect(200)
            .end((err, response) => {
                expect(response.body).to.have.property('message').to.equal('Item created successfully!')
                expect(response.body).to.have.property('item').to.have.property('name').to.equal('sample item')
                expect(response.body).to.have.property('item').to.have.property('price').to.equal(10)
                expect(response.body).to.have.property('item').to.have.property('rating').to.equal('5')
                expect(response.body).to.have.property('item').to.have.property('hash').to.equal(hash)
                done(err)
            })
        })
    })
})