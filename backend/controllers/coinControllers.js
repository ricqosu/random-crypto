const Coin = require('../models/coinModel')
const mongoose = require('mongoose')

// get all coins
const getCoins = async (req, res) => {
  const coins = await Coin.find({}).sort({createdAt: -1})
  res.status(200).json(coins)
}

// get single coin
const getCoin = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({'error': 'no such coin'})
  }

  const coin = await Coin.findById(id)

  if (!coin) {
    return res.status(404).json({error: 'no such coin'})
  }

  res.status(200).json(coin)
}

// create coin
const createCoin = async (req, res) => {
  // can use req.body because of express.json() middleware
  const {rank, coinID, coinName, price} = req.body

  try {
    const coin = await Coin.create({rank, coinID, coinName, price})
    res.status(200).json(coin)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a coin
const deleteCoin = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({'error': 'no such coin'})
  }

  const coin = await Coin.findOneAndDelete({_id: id})

  if (!coin) {
    return res.status(400).json({error: 'no such coin'})
  }  

  res.status(200).json(coin)
}

module.exports = {
  createCoin,
  getCoins,
  getCoin,
  deleteCoin
}