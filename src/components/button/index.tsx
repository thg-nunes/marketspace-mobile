import { ReactNode } from 'react'
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  TouchableOpacityProps
} from 'react-native'

import * as Styled from './styled'

type MyButtonProps = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
  isLoadingProps?: ActivityIndicatorProps
  children?: ReactNode
  type: Styled.ButtonStyle
}

export const Button = ({
  type,
  title = '',
  children,
  isLoading = false,
  isLoadingProps,
  ...rest
}: MyButtonProps) => {
  return (
    <Styled.Container type={type} activeOpacity={0.9} {...rest}>
      {children}
      {isLoading ? (
        <ActivityIndicator {...isLoadingProps} />
      ) : (
        <Styled.ButtonText type={type}>{title}</Styled.ButtonText>
      )}
    </Styled.Container>
  )
}
