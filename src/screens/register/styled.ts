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

export const FormSection = styled.View`
  gap: 16px;

  margin-bottom: 24px;
`

export const GoSignSection = styled.View`
  align-items: center;
  justify-content: center;

  padding: 48px 0;
`
