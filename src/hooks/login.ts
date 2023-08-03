import * as yup from 'yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { userServices } from '@services/api/user'

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

      const { user, token, refresh_token } = await userServices.signIn({
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

const useSigninForm = () => {
  const signinSchema = yup.object({
    email: yup
      .string()
      .email('O email é inválido.')
      .required('Informe o email para logar no app.'),

    password: yup
      .string()
      .required('Informe a senha para logar no app.')
      .matches(/^[A-Z](?=.*\d)(?![^a-zA-Z0-9])/, {
        message: 'A senha é no padrão: Senha@123'
      })
      .min(8, 'A senha contém pelo menos 8 caracteries.')
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<{
    email: string
    password: string
  }>({
    resolver: yupResolver(signinSchema)
  })

  return {
    errors,
    control,
    handleSubmit
  }
}

export { useHandleSignIn, useSigninForm }
