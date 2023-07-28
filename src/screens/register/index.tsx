import { Controller } from 'react-hook-form'
import { useTheme } from 'styled-components/native'
import { ActivityIndicator, Image, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Logo from '@assets/logo/logo.png'
import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import {
  useFormRegister,
  useImageData,
  usePasswordControls
} from '@utils/screens/register'
import { useHandleSubmitForm, useHandleUserPhotoSelect } from '@hooks/register'

import { Text } from '@components/text'
import { Input } from '@components/input'
import { Button } from '@components/button'
import { UserPhoto } from '@components/userPhoto'

import * as Styled from './styled'
import { RegisterLogoSection } from './logoSection'
import { RegisterFormSection } from './formSection'
import { GoSignSection } from './goSignSection'

export type FormRegisterProps = {
  name: string
  email: string
  phone: string
  password: string
  password_confirm: string
}

export const Register = () => {
  const { colors } = useTheme()
  const stack = useNavigation<NativeStackRoutesScreenProps>()
  const image = useImageData()

  return (
    <Styled.Container>
      <ScrollView
        style={{ backgroundColor: colors.gray[200] }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          <Styled.Content>
            <RegisterLogoSection />

            <UserPhoto.Root size={'xl'} uri={image.imageURI}>
              <UserPhoto.Button
                onPress={() => useHandleUserPhotoSelect(image.setImageURI)}
              />
            </UserPhoto.Root>

            <RegisterFormSection stack={stack} />
          </Styled.Content>
          <GoSignSection stack={stack} />
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
