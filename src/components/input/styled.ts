import { TextInput } from 'react-native'
import { Eye } from 'phosphor-react-native'
import styled, { css } from 'styled-components/native'

type ContainerPropsDTO = {
  error: boolean
  inputHeight: number
  inputInFocus: boolean
}

export const Container = styled.View<ContainerPropsDTO>`
  ${({ theme, inputInFocus, inputHeight, error }) => css`
    position: relative;

    width: 100%;
    height: ${inputHeight}px;
    max-height: ${inputHeight}px;

    padding: 12px 16px;
    flex-direction: row;
    align-items: center;
    border-radius: 6px;

    background: ${theme.colors.gray[100]};
    border: ${error
      ? `1px solid ${theme.colors.red.light}`
      : inputInFocus
      ? `1px solid ${theme.colors.gray[700]}`
      : 'none'};
  `}
`

export const Input = styled(TextInput)`
  ${({ theme }) => css`
    flex: 1;

    color: ${theme.colors.gray[700]};
    font-size: ${theme.font_size.lg}px;
    font-family: ${theme.font_familly.regular};
  `}
`

export const PasswordInputEye = styled(Eye).attrs(({ theme }) => ({
  size: 20,
  color: theme.colors.gray[700]
}))``

export const InputErrorMessage = styled.Text`
  ${({ theme }) => css`
    position: absolute;
    bottom: -15px;

    color: ${theme.colors.red.light};
    font-family: ${theme.font_familly.bold};
    font-size: ${theme.font_size.sm}px;
  `}
`
