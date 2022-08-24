const { expect } = require('chai')
const { describe, it, before, beforeEach, after, afterEach } = require('mocha')
const sinon = require('sinon')
const mongoose = require('mongoose')
const rewire = require('rewire')

const sandbox = sinon.createSandbox()
let itemController = rewire('../controllers/item.controller')

describe('Testing /item endpoint', () => {
    let sampleItemVal
    let findOneStub
    let itemController = rewire('../controllers/item.controller')

    beforeEach(() => {
        sampleItemVal = {
            name: 'sample item',
            price: 10,
            rating: '5',
            hash: '123456891'
        }
        findOneStub = sandbox.stub(mongoose.Model, 'findOne').resolves(sampleItemVal)
    });

    afterEach(() => {
        itemController = rewire('../controllers/item.controller')
        sandbox.restore()
    });

    describe('GET /', () => {
        it('should return error when called withou hash', async () => {
            itemController.readItem()
            .then(() => {
                throw new Error('⚠️ Unexpected success!')
            }).catch((err) => {
                expect(result).to.be.instanceOf(Error)
                expect(err.message).to.equal('Invalid item id')
            })
        })
    })
})
