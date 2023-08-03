import { useTheme } from 'styled-components/native'
import { ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { useImageData } from '@hooks/register'
import { useHandleUserPhotoSelect } from '@hooks/register'

import { GoSignSection } from './goSignSection'
import { UserPhoto } from '@components/userPhoto'
import { RegisterLogoSection } from './logoSection'
import { RegisterFormSection } from './formSection'

import * as Styled from './styled'

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
