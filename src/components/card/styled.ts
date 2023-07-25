import styled, { css } from 'styled-components/native'

export type ProductState = 'NEW' | 'USED'

type ProductStateProps = {
  type: ProductState
}

export const ProdutAdsContainer = styled.ImageBackground`
  position: relative;
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

export const ProductState = styled.Text<ProductStateProps>`
  ${({ theme, type }) => css`
    position: absolute;
    right: 0;
    margin: 4px 3px;
    padding: 1px 0;

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

export const InactiveAdsIndicatorContainer = styled.View`
  position: absolute;

  width: 153px;
  height: 100px;
  z-index: 1;
`

export const BackgroundInactiveAds = styled.View`
  ${({ theme }) => css`
    flex: 1;
    opacity: 0.45;
    background-color: ${theme.colors.gray[700]};
  `}
`
