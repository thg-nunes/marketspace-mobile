import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    position: relative;
    flex: 1;
    background: ${theme.colors.gray[200]};
  `}
`

export const HomeHeader = styled.View`
  flex-direction: row;

  gap: 8px;

  align-items: center;
  justify-content: space-between;
`

export const ProductsAdsContainer = styled.View`
  gap: 12px;
  margin-top: 32px;
  margin-bottom: 24px;
`

export const ProductsAdsContent = styled.View`
  height: 66px;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 32px;
`

export const ProductsAdsBackground = styled.View`
  ${({ theme }) => css`
    position: absolute;
    background-color: ${theme.colors.blue.light};
    opacity: 0.1;
    width: 100%;
    height: 100%;
    border-radius: 6px;
  `}
`

export const ActiveProducts = styled.View`
  gap: 16px;
  flex-direction: row;
  align-items: center;
  margin-left: 16px;
`

export const LinkContainer = styled.Pressable`
  gap: 10px;
  flex-direction: row;
  margin-right: 20px;
`

export const LinkText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.sm}px;
    color: ${theme.colors.blue.dark};
    font-family: ${theme.font_familly.bold};
  `}
`

export const FilterInputSection = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    gap: 12px;

    padding: 12px 16px;
    border-radius: 6px;
    background: ${theme.colors.gray[100]};
  `}
`

export const SearchAdIcon = styled.Pressable`
  ${({ theme }) => css`
    padding-right: 12px;
    border-right-width: 1px;
    border-color: ${theme.colors.gray[400]};
  `}
`

export const FilterContainer = styled.View`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const FilterHeader = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const FiltersModalBackGround = styled.View`
  width: 100%;
  height: 100%;

  opacity: 0.6;
  background: black;
`

export const FiltersContent = styled.View`
  position: absolute;
  bottom: 0;

  align-items: center;
  padding: 12px 24px 32px;

  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  width: 100%;
  height: 582px;

  gap: 24px;

  background: white;
`

export const Divider = styled.View`
  ${({ theme }) => css`
    width: 56px;
    height: 4px;

    opacity: 0.3;

    margin-top: 12px;
    margin-bottom: 16px;
    background: ${theme.colors.gray[400]};
  `}
`
export const ProductCondition = styled.View`
  width: 100%;
  gap: 12px;
`
