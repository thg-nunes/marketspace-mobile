import { SignInParams } from '@hooks/login'
import { api } from '@services/axios'
import { UserDTO } from '@dtos/user'
import { AdProductByFilterDTO, AdProductDTO } from '@dtos/product'

type UserServices = {
  register: (data: FormData) => Promise<void>
  signIn: (data: SignInParams) => Promise<Session>
  fetchMyProducts: () => Promise<AdProductDTO[]>
}

export type Session = {
  token: string
  refresh_token: string
  user: UserDTO
}

const userServices: UserServices = {
  register: async (data: FormData): Promise<void> => {
    try {
      await api.post('/users', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      throw error
    }
  },
  signIn: async ({ email, password }: SignInParams): Promise<Session> => {
    try {
      const { data } = await api.post<Session>('/sessions', { email, password })

      return data
    } catch (error) {
      throw error
    }
  },
  fetchMyProducts: async (): Promise<AdProductDTO[]> => {
    try {
      const { data } = await api.get<AdProductDTO[]>('/users/products')
      return data
    } catch (error) {
      throw error
    }
  }
}

export { userServices }
