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

        
    })
})