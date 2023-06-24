import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    padding-top: 16px;
    background: ${theme.colors.gray[200]};
  `}
`

export const Content = styled.View`
  min-height: 556px;

  flex: 1;
  align-items: center;
  justify-content: center;

  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  background: ${({ theme }) => theme.colors.gray[200]};
`

export const LogoSection = styled.View`
  align-items: center;
  gap: 20px;

  margin-bottom: 32px;
`

export const Heading = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size['xl']}px;
    color: ${theme.colors.gray[700]};
    font-family: ${theme.font_familly.bold};
  `}
`

export const Description = styled.Text`
  ${({ theme }) => css`
    max-width: 279px;
    text-align: center;

    margin-top: 8px;

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
  width: 100%;
  max-width: 279px;

  gap: 16px;
  align-items: center;

  margin-bottom: 24px;
`

export const RegisterSection = styled.View`
  width: 100%;

  align-items: center;
  justify-content: center;

  gap: 16px;
  padding: 48px 0;
`
