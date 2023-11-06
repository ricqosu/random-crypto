import { useState, useRef } from 'react'

const CoinDetails = ({ coin, handleNewCoinClick, addCoin }) => {
  let [buttonStatus, setButtonStatus] = useState(false)

  const toggleButtonStatus = () => {
    setButtonStatus(!buttonStatus)
  }

  return (
    <div>
      <h4>{coin.length !== 0 ? coin.name : ''}</h4>
      <p><strong>Market Cap Rank:</strong> {coin.market_cap_rank != null ? coin.market_cap_rank : 'N/A'}</p> 
      <p><strong>Price (USD):</strong> ${coin.length !== 0 ? coin.market_data.current_price.usd : ''}</p>
      <button onClick={() => {handleNewCoinClick(); if (buttonStatus === true ) {toggleButtonStatus()}}}>
        Show New Coin
      </button>
      <button disabled={buttonStatus} onClick={() => {addCoin(); toggleButtonStatus()}}>Add Coin to Favorites</button>
    </div>
  )
}

export default CoinDetails