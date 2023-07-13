import styled, { css } from 'styled-components/native'

export const imageSizes = {
  xl: 88,
  md: 45,
  sm: 24
}

export type Size = 'xl' | 'md' | 'sm'

type UerPhotoSize = {
  size: Size
}

export const Container = styled.View<UerPhotoSize>`
  ${({ theme, size }) => css`
    position: relative;

    width: ${imageSizes[size]}px;
    height: ${imageSizes[size]}px;

    align-items: center;
    justify-content: center;

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
