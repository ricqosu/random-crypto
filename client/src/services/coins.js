import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/coins/'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(res => res.data)
}

const remove = (coinID) => {
  const request = axios.delete(baseUrl + coinID)
  return request.then(res => res.data)
}

export default { getAll, create, remove }