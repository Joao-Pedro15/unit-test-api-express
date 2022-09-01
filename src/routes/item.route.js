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

router.post('/', async (req, res) => {
    try {
        const { name, rating, price, hash } = req.body
        const item = await itemController.createItem({name, rating, price, hash})
        res.json({
            item,
            status: 200,
            message: 'Item created successfully!'
        })
    } catch (err) {
        res.json({
            item: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while creating new item!'
        })
    }
})

router.put('/', async (req, res) => {
    try {
        const { hash } = req.body
        const item = await itemController.updateItemHash(hash)
        res.json({
            item,
            status: 200,
            message: 'Item updated successfully!'
        })
    } catch (err) {
        res.json({
            item: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while updating item hash'
        })
    }
})

module.exports = router