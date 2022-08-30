const { expect } = require("chai");
const { describe, beforeEach } = require("mocha");
const Item = require('../models/Item.model')

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
})