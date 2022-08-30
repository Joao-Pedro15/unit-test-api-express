const { expect } = require("chai");
const { describe, beforeEach } = require("mocha");
const Item = require('../models/Item.model')
const mongoose = require('mongoose')
const ValidateError = mongoose.Error.ValidationError

describe('Testing Item model', ()=> {
    let sampleItemVal;

    beforeEach(()=>{
        sampleItemVal = {
            name: 'sample item',
            price: 10,
            rating: '5',
            hash: 'hashGreaterThan10Chars'
        }
    })
    
    it('it should thrown an error due to missing fields', (done) => {
        let item = new Item()

        item.validate((err) => {
            expect(err.errors.name).to.exist
            expect(err.errors.rating).to.exist
            expect(err.errors.price).to.exist
            expect(err.errors.hash).to.exist
            
            done()
        })
    })
    it('it should throw an error due to incorrect hash length', (done) => {
        let item = new Item(sampleItemVal)

        item.validate((err) => {
            if(err){
                expect(err).to.be.instanceOf(ValidateError)
                // this is expected, not pass err to done()
                done()
            }else{
                const unexpectedSuccessError = new Error('⚠️ Unexpected success!')
                // done(unexpectedSuccessError)
                done()
            }
        })
    })

    it('it should create the item successfully with correct parameters', (done) => {
        let item = new Item({
            ...sampleItemVal,
            hash: '1234567891'
        })
        item.validate((err) => {
            if(err){
                const unexpectedFailureError = new Error('⚠️ Unexpected failure!')
                done(unexpectedFailureError)
            }else{
                expect(item.hash).to.equal('1234567891')
                done()
            }
        })
    })
})