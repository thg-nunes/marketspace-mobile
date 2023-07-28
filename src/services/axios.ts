import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'

import { AppError } from '@utils/screens/appError'
import { userTokenFetch, userTokenUpdate } from '@utils/storage/token'
import { userSignOut } from '@utils/storage/user'

const baseURL = process.env.API_ENDPOINT

type APIInstance = AxiosInstance & {
  registerInterceptTokenManager: (signOut: () => void) => () => void
}

type FailureRequestsProps = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let isUpdatingToken = false
const failureRequests: FailureRequestsProps[] = []

const api = axios.create({
  baseURL,
  timeout: 5000
}) as APIInstance

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const errorResponse = error.response.data as AppError

      if (
        errorResponse.message === 'Este e-mail já está em uso.' ||
        errorResponse.message === 'Este telefone já está em uso.'
      ) {
        return Promise.reject(new AppError(errorResponse))
      }

      const { refresh_token } = await userTokenFetch()

      if (!refresh_token) {
        await userSignOut()

        return Promise.reject(error)
      }

      const requestConfig = error.config as InternalAxiosRequestConfig<any>

      if (isUpdatingToken) {
        return new Promise((resolve, reject) => {
          failureRequests.push({
            onSuccess: (token: string) => {
              requestConfig.headers.Authorization = 'Bearer ' + token
              resolve(api(requestConfig))
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            }
          })
        })
      }

      isUpdatingToken = true

      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await api.post<{ token: string }>(
            '/sessions/refresh-token',
            {
              refresh_token
            }
          )

          await userTokenUpdate(data.token)

          if (requestConfig && requestConfig.data) {
            requestConfig.data = JSON.parse(requestConfig.data)
          }

          requestConfig.headers.Authorization = 'Bearer ' + data.token
          api.defaults.headers.common['Authorization'] = 'Bearer ' + data.token

          failureRequests.forEach((request) => {
            request.onSuccess(data.token)
          })

          resolve(api(requestConfig))
        } catch (error: any) {
          failureRequests.forEach((request) => {
            request.onFailure(error)
          })

          await userSignOut()
          reject(error)
        } finally {
          isUpdatingToken = false
        }
      })
    }

    if (error.response && error.response.data) {
      const errorResponse = error.response.data as AppError

      return Promise.reject(new AppError(errorResponse))
    }

    return Promise.reject(error)
  }
)

export { api }
