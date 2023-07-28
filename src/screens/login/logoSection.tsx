import { Image, View } from 'react-native'

import Logo from '@assets/logo/logo.png'

import { Text } from '@components/text'

import * as Styled from './styled'

export const LogoSection = () => {
  return (
    <Styled.LogoSection>
      <Image source={Logo} />
      <View style={{ alignItems: 'center' }}>
        <Text text="marketspace" font="bold" size="4xl" color="700" />
        <Text
          text="Seu espaço de compra e venda"
          size="md"
          font="regular"
          color="500"
        />
      </View>
    </Styled.LogoSection>
  )
}
