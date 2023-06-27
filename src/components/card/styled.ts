import styled, { css } from 'styled-components/native'

type ProductState = 'NEW' | 'USED'

type ProductStateProps = {
  type: ProductState
}

export const Container = styled.View`
  ${({ theme }) => css``}
`

export const ProdutAdsContainer = styled.ImageBackground`
  flex-direction: row;
  justify-content: space-between;

  padding: 4px 3px;

  width: 153px;
  height: 100px;

  border-radius: 6px;
  overflow: hidden;
`

export const AdvertiserPhotoContainer = styled.View`
  ${({ theme }) => css`
    width: 24px;
    height: 24px;

    background: ${theme.colors.gray[300]};

    position: relative;
    align-items: center;
    justify-content: center;

    border-width: 1px;
    border-color: ${theme.colors.gray[100]};
    border-radius: 9999px;
  `}
`

export const ProductTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.gray[600]};
    font-size: ${theme.font_size.md}px;
  `}
`

export const ProductAmountIndicator = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_familly.bold};
    color: ${theme.colors.gray[700]};
    font-size: 12px;
  `}
`

export const ProductAmountValue = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font_familly.bold};
    color: ${theme.colors.gray[700]};
    font-size: ${theme.font_size.lg}px;
  `}
`

export const ProductState = styled.Text<ProductStateProps>`
  ${({ theme, type }) => css`
    width: 43px;
    height: 17px;

    text-align: center;

    border-radius: 9999px;
    color: ${theme.colors.gray[100]};
    background: ${type === 'NEW'
      ? theme.colors.blue.dark
      : theme.colors.gray[600]};

    font-size: 10px;
    font-family: ${theme.font_familly.bold};
  `}
`
