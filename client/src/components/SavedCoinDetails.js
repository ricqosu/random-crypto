import axios from 'axios'
import {useState, useEffect} from 'react'
import coinService from '../services/coins'

const SavedCoinDetails = ({ coin, deleteSavedCoin }) => {
  const [savedCoin, setSavedCoin] = useState(null)

  console.log('coin prop in savedcoindetailed component is', coin)

  useEffect(() =>{
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin.coinID}`)
      .then(res => {
        console.log('saved coin detail from component is', res.data)
        setSavedCoin(res.data)
      })
      .catch('Error')
  }
  , [])

  return (
    <div>
      <h2>{savedCoin && savedCoin.name}</h2>
      <p><strong>Market Cap Rank:</strong> {savedCoin && savedCoin.market_cap_rank !== null ? savedCoin.market_cap_rank : 'N/A' }</p>
      <p><strong>Price (USD):</strong> ${savedCoin && savedCoin.market_data.current_price.usd}</p>
      <span onClick={() => deleteSavedCoin(coin._id)}>Remove</span>
    </div>
  )
}

export default SavedCoinDetails