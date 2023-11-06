import axios from 'axios'
import { useState, useEffect } from 'react'

import CoinDetails from './components/CoinDetails'
import SavedCoinDetails from './components/SavedCoinDetails'

import coinService from './services/coins'

const App = () => {
  const [coin, setCoin] = useState([])
  const [coinIDListState, setCoinIDListState] = useState([])
  const [savedCoins, setSavedCoins] = useState(null)
  let coinIDList = []

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/list?include_platform=false')
      .then(res => {
        coinIDList = res.data.map(coin => coin.id)
        setCoinIDListState(coinIDList)
        console.log('coinIDList', coinIDList)
        const randomNumber = Math.floor(Math.random() * 12912)
        const randomCoinID = coinIDList[randomNumber]
        axios
          .get(`https://api.coingecko.com/api/v3/coins/${randomCoinID}`)
          .then(res => {
            console.log('coin to be set is', res.data)
            setCoin(res.data)
          })
      })
      .catch(error => console.log('Error fetching'))

    coinService
      .getAll()
      .then(initialCoins=> {
        setSavedCoins(initialCoins)
      })
      .catch(error => {
        console.log('Error fetching initially saved coins')
      })
  }, [])

  const handleNewCoinClick = () => {
    const randomCoinID = coinIDListState[Math.floor(Math.random() * 12912)]
    console.log('handleNewCoinClick() new coin ID is', randomCoinID)
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${randomCoinID}`)
      .then(res => {
        setCoin(res.data)
      })
  }

  const addCoin = (e) => {
    console.log('the event object after hitting add coin', e)
    let coinObject = null

    if (coin.length !== 0) {
      coinObject = {
      rank: coin.market_cap_rank,
      coinID: coin.id,
      coinName: coin.name,
      coinPrice: coin.market_data.current_price.usd
      }

      coinService
      .create(coinObject)
      .then(returnedCoin => {
        setSavedCoins(savedCoins.concat(returnedCoin))
      })
    }
  }

  const deleteSavedCoin = (coinID) => {
    axios
      .delete('http://localhost:3001/api/coins/' + coinID)
      .then(deletedCoin => {
        setSavedCoins(savedCoins.filter((coin) => (
          coin._id !== deletedCoin.data._id
        )))
        console.log('deleted coin is', deletedCoin)
      })
  }

  return (
    <div className="home">
      <div>
        <CoinDetails coin={coin} handleNewCoinClick={handleNewCoinClick} addCoin={addCoin}/>
      </div>
      <div className="savedCoins">
        {savedCoins && savedCoins.map((savedCoin => (
          <SavedCoinDetails key={savedCoin._id} coin={savedCoin} deleteSavedCoin={deleteSavedCoin} />
        )))}
      </div>
    </div>
  )
}

export default App
