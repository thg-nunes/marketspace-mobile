import { useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import { Text } from '@components/text'
import { Button } from '@components/button'

import * as Styled from './styled'

export const RegisterSectionContent = () => {
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()

  function handleRegisterScreen() {
    navigate('register')
  }

  return (
    <Styled.RegisterSectionContent>
      <Text
        text="Ainda não tem acesso?"
        size="md"
        font="regular"
        color="600"
        style={{ textAlign: 'center' }}
      />

      <Button.Root type="PRIMARY" onPress={handleRegisterScreen}>
        <Text text="Criar uma conta" size="md" font="bold" color="700" />
      </Button.Root>
    </Styled.RegisterSectionContent>
  )
}
