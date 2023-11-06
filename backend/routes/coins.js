const express = require('express')

// controller functions that the routes reference to
const { 
  createCoin,
  getCoins,
  getCoin, 
  deleteCoin
} = require('../controllers/coinControllers')

const router = express.Router()

// get all coins
router.get('/', getCoins)

// get single coin
router.get('/:id', getCoin)

// post/create a coin
router.post('/', createCoin)

router.delete('/:id', deleteCoin)

router.patch('/:id', (req, res) => {
  res.json({msg: 'UPDATE a coin'})
})


module.exports = router