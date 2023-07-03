import { useState } from 'react'
import { useTheme } from 'styled-components/native'
import { Image, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Logo from '@assets/logo/logo.png'

import { NativeStackRoutesScreenProps } from '@routes/auth.routes'

import { Text } from '@components/text'
import { Input } from '@components/input'
import { Button } from '@components/button'

import * as Styled from './styled'

type LoginProps = {}

export const Login = ({}: LoginProps) => {
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()
  const { colors } = useTheme()
  const [isSign, setIsSign] = useState(false)

  function handleRegisterScreen() {
    navigate('register')
  }

  function handleSignIn() {
    setIsSign(true)
    setTimeout(() => {
      navigate('homeApp')
      setIsSign(false)
    }, 500)
  }

  return (
    <Styled.Container>
      <ScrollView
        style={{ backgroundColor: colors.gray[100] }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          <Styled.Content>
            <Styled.LogoSection>
              <Image source={Logo} />
              <View style={{ alignItems: 'center' }}>
                <Text text="marketspace" font="bold" size="4xl" color="700" />
                <Text
                  text="Seu espaço de compra e venda"
                  size="md"
                  font="regurlar"
                  color="500"
                />
              </View>
            </Styled.LogoSection>

            <Styled.RegisterSectionContent>
              <Styled.FormSection>
                <Text
                  text="Acesse sua conta"
                  size="md"
                  font="regurlar"
                  color="600"
                />
                <Input placeholder="E-mail" />
                <Input isPassword placeholder="Senha" returnKeyType="send" />
              </Styled.FormSection>

              <Button
                title="Entrar"
                type="TERTIARY"
                isLoading={isSign}
                onPress={handleSignIn}
                isLoadingProps={{ color: 'white' }}
              />
            </Styled.RegisterSectionContent>
          </Styled.Content>

          <Styled.RegisterSection>
            <Styled.RegisterSectionContent>
              <Text
                text="Ainda não tem acesso?"
                size="md"
                font="regurlar"
                color="600"
                style={{ textAlign: 'center' }}
              />
              <Button
                title="Criar uma conta"
                type="PRIMARY"
                onPress={handleRegisterScreen}
              />
            </Styled.RegisterSectionContent>
          </Styled.RegisterSection>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
