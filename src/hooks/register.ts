import { theme } from '../theme'
import { usersRoutes } from '@services/api/user'

import { myToast } from '@utils/toast'
import { AppError } from '@utils/screens/appError'

import { FormRegisterProps } from '@screens/register'

export type UseHandleSubmitFormParams = FormRegisterProps & { avatar: string }

async function useHandleSubmitForm(data: UseHandleSubmitFormParams) {
  try {
    const formData = new FormData()
    formData.append('tel', data.phone)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)

    const photoExtension = data.avatar.split('.').pop()

    const photoData = {
      uri: data.avatar,
      type: `image/${photoExtension}`,
      name: `${data.name}.${photoExtension}`.toLowerCase()
    } as any

    formData.append('avatar', photoData)

    await usersRoutes.register(formData)
  } catch (error) {
    if (error instanceof AppError) {
      myToast({
        message: error.message,
        background: theme.colors.red.light
      })
    }
  }
}

export { useHandleSubmitForm }
