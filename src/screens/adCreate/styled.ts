import { AntDesign } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Plus, XCircle } from 'phosphor-react-native'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    background: ${theme.colors.gray[200]};
  `}
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

export const ProductPhotoSelected = styled.ImageBackground`
  width: 100px;
  height: 100px;

  padding: 4px;
  align-items: flex-end;

  overflow: hidden;
  border-radius: 6px;
`

export const PlusIcon = styled(Plus).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.gray[400]
}))``

export const ButtonSection = styled.View`
  ${({ theme }) => css`
    flex-direction: row;

    gap: 12px;
    padding: 20px 24px 28px;
    background: ${theme.colors.gray[100]};
  `}
`

export const RemoveImageIcons = styled(XCircle).attrs(({ theme }) => ({
  size: 16,
  weight: 'fill',
  color: theme.colors.gray[600]
}))``
