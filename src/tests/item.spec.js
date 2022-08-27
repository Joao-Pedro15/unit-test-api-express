const chai = require('chai')
const { describe, it, before, beforeEach, after, afterEach } = require('mocha')
const sinon = require('sinon')
const mongoose = require('mongoose')
const rewire = require('rewire')
chai.use(require('sinon-chai'))
const expect = chai.expect

const sandbox = sinon.createSandbox()
let itemController = rewire('../controllers/item.controller')

describe('Testing /item endpoint', () => {
    let sampleItemVal
    let findOneStub
    const sampleUniqueHash = '1234567891'

    beforeEach(() => {
        sampleItemVal = {
            name: 'sample item',
            price: 10,
            rating: '5',
            hash: sampleUniqueHash
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

        it('should succeed when called with hash', async () => {
            itemController
            .readItem('someRandomHash')
            .then((item) => {
                expect(item).to.equal(sampleItemVal);
            }).catch((err) => {
                throw new Error('⚠️ Unexpected failure!')
            })
        })
    })
    describe('/PUT', () => {
        let getUniqueHashStub, saveStub, result, sampleUpdatedItemVal;
        const sampleUpdatedHash = '9876543219'

        beforeEach(async () => {
            // focefully restore sandbox to allow re-write of findOneStub
            sandbox.restore()

            //Stub to mocj getUniqueHash´s Functionality
            getUniqueHashStub = sandbox.stub().returns(sampleUpdatedHash)

            sampleUpdatedItemVal = {
                ...sampleItemVal,
                hash: sampleUpdatedHash
            }
            // save stub to return updated item
            saveStub = sandbox.stub().returns(sampleUpdatedItemVal)
            
            //make findOneStub return save() method in addition to sampleItemVal
            findOneStub = sandbox.stub(mongoose.Model, 'findOne').resolves({
                ...sampleItemVal,
                save: saveStub
            })

            // Use rewire to modify itemControllers´s private method getUniqueHash
            itemController.__set__('getUniqueHash', getUniqueHashStub)
        })  
    })
})
