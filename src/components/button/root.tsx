import { ReactNode } from 'react'
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  TouchableOpacityProps
} from 'react-native'

import { Text } from '@components/text'

import * as Styled from './styled'

type MyButtonProps = TouchableOpacityProps & {
  children?: ReactNode
  type: Styled.ButtonStyle
}

export const ButtonRoot = ({ type, children, ...rest }: MyButtonProps) => {
  return (
    <Styled.Container type={type} activeOpacity={0.9} {...rest}>
      {children}
    </Styled.Container>
  )
}
