import * as ImagePicker from 'expo-image-picker'

import { theme } from '../theme'
import { usersRoutes } from '@services/api/user'

import { myToast } from '@utils/toast'
import { AppError } from '@utils/screens/appError'

import { FormRegisterProps } from '@screens/register'
import { userTokenSave } from '@utils/storage/token'

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
    const { token, refresh_token } = await usersRoutes.signIn({
      email: data.email,
      password: data.password
    })

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
    setIsRegistering(false)
  }
}

export { useRegisterUser, useHandleUserPhotoSelect, useHandleSubmitForm }
