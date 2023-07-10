import { Pressable, PressableProps } from 'react-native'

import * as Styled from './styled'

type PasswordShowButtonProps = PressableProps & {}

export const PasswordShowButton = ({ ...rest }: PasswordShowButtonProps) => {
  return (
    <Pressable {...rest}>
      <Styled.PasswordInputEye />
    </Pressable>
  )
}
