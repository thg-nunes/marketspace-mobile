import { AntDesign } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PencilSimpleLine } from 'phosphor-react-native'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    background: ${theme.colors.gray[200]};
  `}
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 12px 24px;
`

export const GobackIcon = styled(AntDesign).attrs(({ theme }) => ({
  name: 'arrowleft',
  size: 24,
  color: theme.colors.gray[700]
}))``

export const EditAdIcon = styled(PencilSimpleLine).attrs(({ theme }) => ({
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
  position: relative;
  width: 100%;
`

export const InactiveAd = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
`

export const AmountIndicator = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.md}px;
    font-family: ${theme.font_familly.bold};
    color: ${theme.colors.blue.light};
  `}
`

export const Amount = styled(AmountIndicator)`
  ${({ theme }) => css`
    font-size: ${theme.font_size.xl}px;
    color: ${theme.colors.blue.light};
  `}
`

export const RowCenterItems = styled.View`
  gap: 8px;
  align-items: center;
  flex-direction: row;

  padding-left: 24px;
  padding-right: 24px;
`

export const ColumnCenterItems = styled(RowCenterItems)`
  align-items: stretch;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 17px;
  flex-direction: column;
`

export const AdContent = styled.View`
  flex: 1;
  gap: 8px;
  margin: 24px 0;

  align-items: flex-start;

  padding-left: 24px;
  padding-right: 24px;
`
