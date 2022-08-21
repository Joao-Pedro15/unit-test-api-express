const { expect } = require('chai')
const { describe, it } = require('mocha')
const { healthCheckAsync, healthCheckSync } = require('../controllers/health.controller')

describe('Test /health', () => {
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