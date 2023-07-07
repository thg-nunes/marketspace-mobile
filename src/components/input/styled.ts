import { TextInput } from 'react-native'
import { Eye } from 'phosphor-react-native'
import styled, { css } from 'styled-components/native'

type ContainerPropsDTO = {
  inputInFocus: boolean
  inputHeight: number
}

export const Container = styled.View<ContainerPropsDTO>`
  ${({ theme, inputInFocus, inputHeight }) => css`
    width: 100%;
    height: ${inputHeight}px;
    max-height: ${inputHeight}px;

    padding: 12px 16px;
    flex-direction: row;
    align-items: center;
    border-radius: 6px;

    background: ${theme.colors.gray[100]};
    border: ${inputInFocus ? `1px solid ${theme.colors.gray[700]}` : 'none'};
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
