import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/auth.routes'

import { Text } from '@components/text'

import * as Styled from './styled'

export const AdCreate = () => {
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()

  return (
    <Styled.Container>
      <Styled.Header>
        <Pressable onPress={goBack}>
          <Styled.GobackIcon />
        </Pressable>
        <Text
          color="700"
          size="xl"
          font="bold"
          text="Criar anúncio"
          style={{ flex: 1, textAlign: 'center' }}
        />
      </Styled.Header>
    </Styled.Container>
  )
}
