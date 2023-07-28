import { View, Image } from 'react-native'

import Logo from '@assets/logo/logo.png'

import { Text } from '@components/text'

import * as Styled from './styled'

export const RegisterLogoSection = () => {
  return (
    <Styled.LogoSection>
      <Image source={Logo} style={{ width: 60, height: 40 }} />
      <View style={{ alignItems: 'center' }}>
        <Text text="Boas vindas!" color="700" font="bold" size="xl" />
        <Text
          text="Crie sua conta e use o espaço para comprar itens variados e vender seus produtos"
          size="md"
          color="500"
          font="regular"
          style={{
            maxWidth: 279,
            textAlign: 'center',
            marginTop: 8
          }}
        />
      </View>
    </Styled.LogoSection>
  )
}
