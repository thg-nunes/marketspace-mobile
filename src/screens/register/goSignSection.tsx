import { View } from 'react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import { Text } from '@components/text'
import { Button } from '@components/button'

import * as Styled from './styled'

type GoSignSectionProps = {
  stack: NativeStackRoutesScreenProps
}

export const GoSignSection = ({ stack }: GoSignSectionProps) => {
  return (
    <Styled.GoSignSection>
      <View style={{ width: '100%', maxWidth: 279, gap: 16 }}>
        <Text
          text="Já tem uma conta?"
          color="600"
          font="bold"
          size="xl"
          style={{
            maxWidth: 279,
            textAlign: 'center',
            marginTop: 8
          }}
        />

        <Button.Root type="PRIMARY" onPress={stack.goBack}>
          <Text text="Ir para o login" font="bold" size="sm" color="600" />
        </Button.Root>
      </View>
    </Styled.GoSignSection>
  )
}
