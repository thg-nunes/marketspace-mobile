import { PressableProps } from 'react-native'
import * as Styled from './styled'

type SwitchProps = PressableProps & {
  switchEnabled: boolean
}

export const Switch = ({ switchEnabled = false, ...rest }: SwitchProps) => {
  return (
    <Styled.Container switchEnabled={switchEnabled} {...rest}>
      <Styled.SwitchCircle switchEnabled={switchEnabled} />
    </Styled.Container>
  )
}
