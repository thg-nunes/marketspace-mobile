import { Image, View } from 'react-native'

import Logo from '@assets/logo/logo.png'

import { Input } from '@components/input'
import { Button } from '@components/button'

import * as Styled from './styled'

type LoginProps = {}

export const Login = ({}: LoginProps) => {
  return (
    <Styled.Container>
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
    </Styled.Container>
  )
}
