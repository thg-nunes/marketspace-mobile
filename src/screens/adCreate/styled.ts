import { AntDesign } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    padding: 0 24px;
    background: ${theme.colors.gray[200]};
  `}
`

export const Header = styled.View`
  margin: 20px 0;
  gap: 8px;
  align-items: center;
  flex-direction: row;
`

export const GobackIcon = styled(AntDesign).attrs(({ theme }) => ({
  name: 'arrowleft',
  size: 24,
  color: theme.colors.gray[700]
}))``
