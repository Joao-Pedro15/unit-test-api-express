const express = require('express')
const itemController = require('../controllers/item.controller')
const router = express.Router()

router.get('/:hash', async (req, res) => {
    try{
        const { hash } = req.params
        const item = await itemController.readItem(hash)
        res.json({
            item,
            status: 200,
            message: 'Item read successfully!'
        })
    }catch(err){
        res.json({
            item: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while reading item from DB!'
        })
    }
})

router.get('/test', async (req, res) => {
    const result = await itemController.readItem('1233435893')
    return res.json(result)
})

router.put('/test', async (req, res) => {
    const result = await itemController.updateItemHash('1233445894')
    return res.json(result)
})

module.exports = router