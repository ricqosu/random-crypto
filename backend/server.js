require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const coinRoutes = require('./routes/coins')

const app = express()

// middleware to log path and method to terminal
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(express.json())

// cors middleware
app.use(cors())

// routes
app.use('/api/coins', coinRoutes)

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server running on port', process.env.PORT)
      console.log('Connected to database')
    })
  })
  .catch(error => {
    console.log('error')
  })