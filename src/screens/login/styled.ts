import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
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

  margin-bottom: 76px;
`

export const FormSection = styled.View`
  gap: 16px;
  align-items: center;

  margin-bottom: 32px;
`

export const RegisterSection = styled.View`
  align-items: center;
  justify-content: center;

  padding: 56px 48px;
`

export const RegisterSectionContent = styled.View`
  width: 100%;
  gap: 16px;
  max-width: 279px;
`
