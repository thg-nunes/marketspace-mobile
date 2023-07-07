import { AntDesign } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Plus } from 'phosphor-react-native'

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

export const ProductPhotoSelector = styled.TouchableOpacity`
  width: 100px;
  height: 100px;

  align-items: center;
  justify-content: center;

  border-radius: 6px;
  background: ${({ theme }) => theme.colors.gray[300]};
`

export const ProductPhotoSelected = styled.Image`
  width: 100px;
  height: 100px;

  border-width: 1px;
  border-radius: 6px;
`

export const PlusIcon = styled(Plus).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.gray[400]
}))``
