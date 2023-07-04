import { AntDesign } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    background: ${theme.colors.gray[100]};
  `}
`

export const GobackButton = styled.Pressable`
  width: 28px;
  max-width: 28px;
  margin: 12px 24px;
`

export const GobackIcon = styled(AntDesign).attrs(({ theme }) => ({
  name: 'arrowleft',
  size: 24,
  color: theme.colors.gray[700]
}))``

export const ImageCounter = styled.View<{ isActive: boolean }>`
  ${({ theme, isActive }) => css`
    width: 121px;
    height: 3px;

    opacity: ${isActive ? 100 / 100 : 50 / 100};
    background: ${theme.colors.gray[100]};
    border-radius: 9999px;
  `}
`

export const ImageListContainer = styled.View`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
  `}
`

export const AmountIndicator = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.sm}px;
    font-family: ${theme.font_familly.bold};
    color: ${theme.colors.blue.light};
  `}
`

export const Amount = styled(AmountIndicator)`
  ${({ theme }) => css`
    font-size: ${theme.font_size.md}px;
    color: ${theme.colors.blue.light};
  `}
`
