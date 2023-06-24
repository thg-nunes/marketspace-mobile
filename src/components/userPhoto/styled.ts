import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  ${({ theme }) => css`
    position: relative;

    width: 88px;
    height: 88px;

    align-items: center;
    justify-content: center;

    margin-bottom: 16px;

    border-radius: 9999px;
    background: ${theme.colors.gray[300]};
    border-width: 2px;
    border-color: ${theme.colors.blue.light};
  `}
`

export const Pencel = styled.TouchableOpacity`
  ${({ theme }) => css`
    position: absolute;

    width: 40px;
    height: 40px;

    align-items: center;
    justify-content: center;

    top: 44px;
    left: 54px;

    border-radius: 9999px;
    background: ${theme.colors.blue.light};
  `}
`
