const express = require('express')
const path = require('path')
const app = express()

const api = require('./src/server/routes/api')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', api)

const port = 3002
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})
