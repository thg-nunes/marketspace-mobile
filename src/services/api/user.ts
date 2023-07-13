import { api } from '@services/axios'
import { UseHandleSubmitFormParams } from '@hooks/register'

type UsersRoutes = {
  register: (data: FormData) => Promise<void>
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
  }
}

export { usersRoutes }
