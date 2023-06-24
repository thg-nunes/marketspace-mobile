import { Image, ScrollView, Text, View } from 'react-native'

import Logo from '@assets/logo/logo.png'

import { Input } from '@components/input'
import { Button } from '@components/button'

import * as Styled from './styled'
import { useTheme } from 'styled-components/native'

type LoginProps = {}

export const Login = ({}: LoginProps) => {
  const { colors } = useTheme()

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

            <Styled.FormSection>
              <Styled.FormHeader>Acesse sua conta</Styled.FormHeader>
              <Input placeholder="E-mail" />
              <Input isPassword placeholder="Senha" returnKeyType="send" />
            </Styled.FormSection>

            <Button title="Entrar" type="TERTIARY" />
          </Styled.Content>

          <Styled.RegisterSection>
            <Styled.FormHeader>Ainda não tem acesso?</Styled.FormHeader>
            <Button title="Criar uma conta" type="PRIMARY" />
          </Styled.RegisterSection>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
