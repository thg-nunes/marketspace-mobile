import { Image, View } from 'react-native'

import Logo from '@assets/logo/logo.png'

import { Input } from '@components/input'

import * as Styled from './styled'

type LoginProps = {}

export const Login = ({}: LoginProps) => {
  return (
    <Styled.Container>
      <Styled.LogoSection>
        <Image source={Logo} />
        <View style={{ alignItems: 'center' }}>
          <Styled.Heading>marketspace</Styled.Heading>
          <Styled.Description>Seu espaço de compra e venda</Styled.Description>
        </View>
      </Styled.LogoSection>

      <Styled.FormSection>
        <Styled.FormHeader>Acesse sua conta</Styled.FormHeader>
        <Input placeholder="E-mail" />
        <Input isPassword placeholder="Senha" returnKeyType="send" />
      </Styled.FormSection>
    </Styled.Container>
  )
}
