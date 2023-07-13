import { SignInParams } from '@hooks/login'
import { api } from '@services/axios'
import { UserDTO } from 'src/dtos/user'

type UsersRoutes = {
  register: (data: FormData) => Promise<void>
  signIn: (data: SignInParams) => Promise<Session>
}

export type Session = {
  token: string
  refresh_token: string
  user: UserDTO
}

const usersRoutes: UsersRoutes = {
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
      const { data } = await api.post('/sessions', { email, password })

      return data
    } catch (error) {
      throw error
    }
  }
}

export { usersRoutes }
