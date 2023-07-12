import { theme } from '../theme'
import { usersRoutes } from '@services/api/user'

import { myToast } from '@utils/toast'
import { AppError } from '@utils/screens/appError'

import { FormRegisterProps } from '@screens/register'

async function useHandleSubmitForm(data: FormRegisterProps) {
  try {
    await usersRoutes.register(data)
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
