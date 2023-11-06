const mongoose = require('mongoose')

const Schema = mongoose.Schema

const coinSchema = new Schema({
  rank: Number,
  coinName: String,
  coinID: String,
  price: Number,
}, { timestamps: true })

module.exports = mongoose.model('Coin', coinSchema)