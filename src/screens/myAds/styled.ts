import styled, { css } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;

    padding: 32px 24px;
    background: ${theme.colors.gray[200]};
  `}
`

export const Header = styled.View`
  margin-bottom: 36px;
  flex-direction: row;
  align-items: center;
`

export const MyAdsQuantity = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
