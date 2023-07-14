import { ReactNode, useState } from 'react'
import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import * as Styled from './styled'

type RootInputProps = TextInputProps & {
  placeholder: string
  inputHeight?: number
  error?: string
  children?: ReactNode
}

export const RootInput = ({
  placeholder = '',
  inputHeight = 45,
  error = '',
  children,
  ...rest
}: RootInputProps) => {
  const { colors } = useTheme()
  const [inputInFocus, setInputInFocus] = useState(false)

  return (
    <Styled.Container
      inputInFocus={inputInFocus}
      inputHeight={inputHeight}
      error={!!error}
    >
      <Styled.Input
        placeholder={placeholder}
        onFocus={() => setInputInFocus(true)}
        onBlur={() => setInputInFocus(false)}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
      {children}
    </Styled.Container>
  )
}
