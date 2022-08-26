const express = require('express')
const cors = require('cors')
const healthRoute = require('./routes/health.route')
const itemRoute = require('./routes/item.route')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/health', healthRoute)
app.use('/item', itemRoute)

let mongoDB = process.env.MONGODB_URL || "mongodb://localhost:27017/express-api-unit-test-starter";
mongoose.connect(mongoDB, {
	useNewUrlParser: true
});
mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, '❌❌❌ MongoDB Connection Error ❌❌❌'));


module.exports = app

// https://betterprogramming.pub/unit-testing-essentials-for-express-api-a-step-by-step-guide-ab4950d3763b

