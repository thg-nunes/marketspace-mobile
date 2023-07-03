import { AntDesign, Feather } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  gap: 11px;
`

export const CheckedBoxIcon = styled(AntDesign).attrs(({ theme }) => ({
  size: 18,
  name: 'checksquare',
  color: theme.colors.blue.light
}))``

export const UncheckedBoxIcon = styled(Feather).attrs(({ theme }) => ({
  size: 18,
  name: 'square',
  color: theme.colors.gray[400]
}))``
