import { MaterialIcons } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  gap: 11px;
`

export const CheckedRadioIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 18,
  name: 'radio-button-checked',
  color: theme.colors.blue.light
}))``

export const UncheckedRadioIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 18,
  name: 'radio-button-unchecked',
  color: theme.colors.gray[400]
}))``

export const CheckboxText = styled.Text`
  ${({ theme }) => css`
    text-transform: capitalize;

    color: ${theme.colors.gray[600]};
    font-size: ${theme.font_size.lg}px;
    font-family: ${theme.font_familly.regular};
  `}
`
