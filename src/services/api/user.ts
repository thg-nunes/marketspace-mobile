import { api } from '@services/axios'
import { FormRegisterProps } from '@screens/register'

type UsersRoutes = {
  register: (data: FormRegisterProps) => Promise<void>
}

const usersRoutes: UsersRoutes = {
  register: async (data: FormRegisterProps): Promise<void> => {
    const formData = new FormData()
    formData.append('tel', data.phone)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)

    try {
      await api.post('/users', formData, {
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
