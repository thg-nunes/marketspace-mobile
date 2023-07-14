import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { usersRoutes } from '@services/api/user'

import { myToast } from '@utils/toast'
import { userDataSave } from '@utils/storage/user'
import { AppError } from '@utils/screens/appError'
import { theme } from '../theme'
import { userTokenSave } from '@utils/storage/token'

export type SignInParams = {
  email: string
  password: string
}

function useHandleSignIn() {
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()
  const [isSign, setIsSign] = useState(false)

  async function handleSignIn({ email, password }: SignInParams) {
    try {
      setIsSign(true)

      const { user, token, refresh_token } = await usersRoutes.signIn({
        email,
        password
      })

      await userDataSave(user)
      await userTokenSave({ token, refresh_token })

      navigate('homeApp')
    } catch (error) {
      if (error instanceof AppError) {
        myToast({
          message: error.message,
          background: theme.colors.red.light
        })
      }
    } finally {
      setIsSign(false)
    }
  }

  return {
    isSign,
    handleSignIn
  }
}

export { useHandleSignIn }
