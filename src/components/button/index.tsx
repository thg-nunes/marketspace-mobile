import { ReactNode } from 'react'
import { TouchableOpacityProps } from 'react-native'

import * as Styled from './styled'

type MyButtonProps = TouchableOpacityProps & {
  title: string
  children?: ReactNode
  type: Styled.ButtonStyle
}

export const Button = ({ type, title = '', children }: MyButtonProps) => {
  return (
    <Styled.Container type={type}>
      {children}
      <Styled.ButtonText type={type}>{title}</Styled.ButtonText>
    </Styled.Container>
  )
}
