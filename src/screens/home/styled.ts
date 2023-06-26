import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    padding-top: 16px;
    background: ${theme.colors.gray[200]};
  `}
`

export const HomeHeader = styled.View`
  flex-direction: row;

  gap: 8px;

  align-items: center;
  justify-content: space-evenly;
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
