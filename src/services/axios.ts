import axios from 'axios'

const baseURL = process.env.API_ENDPOINT // 'http://your_local_ip:3333'

const api = axios.create({
  baseURL
})

export { api }
