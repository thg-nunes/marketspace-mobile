import { SignInParams } from '@hooks/login'
import { api } from '@services/axios'

type UsersRoutes = {
  register: (data: FormData) => Promise<void>
  signIn: (
    data: SignInParams
  ) => Promise<{ token: string; refresh_token: string }>
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
  signIn: async ({
    email,
    password
  }: SignInParams): Promise<{ token: string; refresh_token: string }> => {
    try {
      const { data } = await api.post('/sessions', { email, password })

      return data
    } catch (error) {
      throw error
    }
  }
}

export { usersRoutes }
