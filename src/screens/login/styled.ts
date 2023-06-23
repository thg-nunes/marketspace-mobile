import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gray[200]};
`

export const LogoSection = styled.View`
  align-items: center;
  gap: 20px;

  margin-bottom: 76px;
`

export const Heading = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size['4xl']}px;
    color: ${theme.colors.gray[700]};
    font-family: ${theme.font_familly.bold};
  `}
`

export const Description = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.md}px;
    color: ${theme.colors.gray[500]};
    font-family: ${theme.font_familly.regular};
  `}
`

export const FormHeader = styled(Description)`
  ${({ theme }) => css`
    color: ${theme.colors.gray[600]};
  `}
`

export const FormSection = styled.View`
  ${({ theme }) => css`
    gap: 16px;
    align-items: center;
  `}
`
