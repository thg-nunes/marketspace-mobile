import { Image, Text } from 'react-native'

import Logo from '@assets/logo/logo.png'

import * as Styled from './styled'

type LoginProps = {}

export const Login = ({}: LoginProps) => {
  return (
    <Styled.Container>
      <Styled.LogoSection>
        <Image source={Logo} />
        <Styled.TextSection>
          <Styled.Heading>marketspace</Styled.Heading>
          <Styled.Description>Seu espaço de compra e venda</Styled.Description>
        </Styled.TextSection>
      </Styled.LogoSection>
    </Styled.Container>
  )
}
