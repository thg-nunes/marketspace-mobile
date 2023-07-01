import { useState } from 'react'
import { useTheme } from 'styled-components/native'
import { Image, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Logo from '@assets/logo/logo.png'

import { NativeStackRoutesScreenProps } from '@routes/auth.routes'

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
                <Styled.Heading>marketspace</Styled.Heading>
                <Styled.Description>
                  Seu espaço de compra e venda
                </Styled.Description>
              </View>
            </Styled.LogoSection>

            <Styled.RegisterSectionContent>
              <Styled.FormSection>
                <Styled.FormHeader>Acesse sua conta</Styled.FormHeader>
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
              <Styled.FormHeader>Ainda não tem acesso?</Styled.FormHeader>
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
