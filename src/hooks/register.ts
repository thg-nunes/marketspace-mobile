import * as yup from 'yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
import { yupResolver } from '@hookform/resolvers/yup'

import { theme } from '../theme'
import { userServices } from '@services/api/user'

import { myToast } from '@utils/toast'
import { AppError } from '@utils/screens/appError'

import { FormRegisterProps } from '@screens/register'
import { userTokenSave } from '@utils/storage/token'
import { userDataSave } from '@utils/storage/user'

export type UseRegisterUserParams = FormRegisterProps & { avatar: string }

type UseHandleSubmitFormParams = {
  imageURI: string
  data: FormRegisterProps
  setIsRegistering: (param: boolean) => void
  navigate: (screen: string) => void
}

async function useRegisterUser(data: UseRegisterUserParams) {
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

    await userServices.register(formData)
  } catch (error) {
    if (error instanceof AppError) {
      myToast({
        message: error.message,
        background: theme.colors.red.light
      })
    }
  }
}

async function useHandleUserPhotoSelect(
  setImageURI: React.Dispatch<React.SetStateAction<string>>
) {
  const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    selectionLimit: 1,
    aspect: [4, 4]
  })

  if (canceled) return

  if (assets) {
    return setImageURI(assets[0].uri)
  }
}

async function useHandleSubmitForm({
  data,
  imageURI,
  navigate,
  setIsRegistering
}: UseHandleSubmitFormParams): Promise<void> {
  try {
    if (!imageURI) {
      throw new AppError({
        status: 'error',
        message: 'Uma imagem é necessária para o cadastro.'
      })
    }

    setIsRegistering(true)

    await useRegisterUser({
      ...data,
      avatar: imageURI
    })
    const { token, refresh_token, user } = await userServices.signIn({
      email: data.email,
      password: data.password
    })

    await userTokenSave({ token, refresh_token })
    await userDataSave(user)
    navigate('homeApp')
  } catch (error) {
    if (error instanceof AppError) {
      myToast({
        message: error.message,
        background: theme.colors.red.light
      })
    }
  } finally {
    setIsRegistering(false)
  }
}

const useFormRegister = () => {
  const registerSchema = yup.object({
    name: yup.string().required('Informe um nome de usuário.'),
    email: yup
      .string()
      .email('Informe um email válido.')
      .required('Informe um email para se cadastrar.'),
    phone: yup
      .string()
      .matches(/^(\d{2})9[6-9]{1}\d{3}[-\s]?\d{4}$/, {
        message: 'Número de comtato inválido.'
      })
      .min(11, 'A quantidade mínima é de 11 dígitos.')
      .required('Informe um número para contato com o DDD.'),
    password: yup
      .string()
      .required('Informe uma senha para seu cadastro.')
      .matches(/^[A-Z](?=.*\d)(?![^a-zA-Z0-9])/, {
        message: 'Siga o exemplo: Senha@123'
      })
      .min(8, 'A senha deve conter pelo menos 8 caracteries.'),
    password_confirm: yup
      .string()
      .required('Informe a confirmação de senha.')
      .oneOf([yup.ref('password')], 'As senhas não convergem.')
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormRegisterProps>({
    resolver: yupResolver(registerSchema)
  })

  return {
    errors,
    control,
    handleSubmit
  }
}

const usePasswordControls = () => {
  const [passwordShow, setPasswordShow] = useState(true)
  const [passwordConfirmShow, setPasswordConfirmShow] = useState(true)

  return {
    passwordShow,
    setPasswordShow,
    passwordConfirmShow,
    setPasswordConfirmShow
  }
}

const useImageData = () => {
  const [imageURI, setImageURI] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  return {
    imageURI,
    setImageURI,
    isRegistering,
    setIsRegistering
  }
}

export {
  useRegisterUser,
  useHandleUserPhotoSelect,
  useHandleSubmitForm,
  useImageData,
  useFormRegister,
  usePasswordControls
}
