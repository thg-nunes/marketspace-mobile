import { ReactNode } from 'react'
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  TouchableOpacityProps
} from 'react-native'

import { Text } from '@components/text'

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
        <Text
          text={title}
          color={type === 'PRIMARY' ? '600' : '100'}
          font="bold"
          size="md"
        />
      )}
    </Styled.Container>
  )
}
