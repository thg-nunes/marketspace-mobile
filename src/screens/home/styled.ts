import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    padding: 16px 24px 0 24px;
    background: ${theme.colors.gray[200]};
  `}
`

export const HomeHeader = styled.View`
  flex-direction: row;

  gap: 8px;

  align-items: center;
  justify-content: space-between;
`

export const HomeHeaderUserPhoto = styled.View`
  ${({ theme }) => css`
    width: 45px;
    height: 45px;

    align-items: center;
    justify-content: center;

    border-radius: 9999px;
    background: ${theme.colors.gray[300]};
    border-width: 2px;
    border-color: ${theme.colors.blue.light};
  `}
`

export const Text = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.lg}px;
    font-family: ${theme.font_familly.regular};
  `}
`

export const Name = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.lg}px;
    font-family: ${theme.font_familly.bold};
  `}
`

export const Profile = styled.View`
  flex: 1;
  max-width: 180px;

  gap: 10px;

  flex-direction: row;
  align-items: center;
`

export const ProductsAdsContainer = styled.View`
  gap: 12px;
  margin-top: 32px;
  margin-bottom: 24px;
`

export const ProductsAdsText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.md}px;
    font-family: ${theme.font_familly.regular};

    color: ${theme.colors.gray[500]};
  `}
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
