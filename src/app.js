const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const userRouter = require('./users/users-route')
const repoRoute = require('./repos/repos-route')


const morganOption = (NODE_ENV === 'production')
? 'tiny'
: 'common';

app.use(cors())
app.use(morgan(morganOption))
app.use(helmet())

app.use('/api/repos', repoRoute)
app.use('/api/users', userRouter)
app.get('/', (req, res) => {
    res.send("Hello, world!")
})
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
    })

module.exports = app
