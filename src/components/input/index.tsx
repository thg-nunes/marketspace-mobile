import { useState } from 'react'
import { Pressable, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import * as Styled from './styled'

type InputProps = TextInputProps & {
  placeholder: string
  isPassword?: boolean
  inputHeight?: number
}

export const Input = ({
  isPassword = false,
  placeholder = '',
  inputHeight = 45,
  ...rest
}: InputProps) => {
  const { colors } = useTheme()
  const [inputInFocus, setInputInFocus] = useState(false)
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  return (
    <Styled.Container inputInFocus={inputInFocus} inputHeight={inputHeight}>
      <Styled.Input
        placeholder={placeholder}
        secureTextEntry={isPassword && secureTextEntry}
        onFocus={() => setInputInFocus(true)}
        onBlur={() => setInputInFocus(false)}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
      {isPassword && (
        <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Styled.PasswordInputEye />
        </Pressable>
      )}
    </Styled.Container>
  )
}
