const { expect } = require('chai')
const { describe, it, before, beforeEach, after, afterEach } = require('mocha')
const { healthCheckAsync, healthCheckSync } = require('../controllers/health.controller')

describe('Test /health', () => {

    before('before', () => {
        console.log('this log referring a before all tests in describe Test /health')
    })

    after('after', () => {
        console.log('this log referring a after all tests in describe Test /health')
    })

    beforeEach('beforeEach', () => {
        console.log('this log in running before on all blocks it in describe');
    })

    afterEach('afterEach', () => {
        console.log('this log in running after on all blocks it in describe');
    })


   describe('Health check on /sync', () => {
    it('health should be okey', () => {
        const actualResult = healthCheckSync()
        expect(actualResult).to.equal('OK')
    })
   })

   describe('Health check on /async', () => {
    it('health should be okay', async () => {
        const actualResult = await healthCheckSync()
        expect(actualResult).to.equal('OK')
    })
   })
})