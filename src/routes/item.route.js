const express = require('express')
const itemController = require('../controllers/item.controller')
const router = express.Router()

router.get('/test', async (req, res) => {
    const result = await itemController.readItem('1233435893')
    return res.json(result)
})

module.exports = router