import { AppError } from '@utils/screens/appError'
import axios, { AxiosError } from 'axios'

const baseURL = process.env.API_ENDPOINT // 'http://your_local_ip:3333'

const api = axios.create({
  baseURL
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.data) {
      const errorResponse = error.response.data as AppError

      return Promise.reject(new AppError(errorResponse))
    }
  }
)

export { api }
