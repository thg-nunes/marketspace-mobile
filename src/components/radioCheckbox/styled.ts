import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View`
  align-items: center;
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
