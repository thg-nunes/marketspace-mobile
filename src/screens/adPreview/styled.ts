import { SafeAreaView } from 'react-native-safe-area-context'
import { css } from 'styled-components'
import styled from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    background: ${theme.colors.blue.light};
  `}
`
