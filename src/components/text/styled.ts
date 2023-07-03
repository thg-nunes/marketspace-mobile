import styled, { css } from 'styled-components/native'

export type FontStyle = 'regular' | 'bold'
export type FontColor = '100' | '200' | '300' | '400' | '500' | '600' | '700'
export type FontSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

type TextProps = {
  font: FontStyle
  size: FontSize
  color: FontColor
}

export const Container = styled.Text<TextProps>`
  ${({ theme, font, size, color }) => css`
    color: ${theme.colors.gray[color]};
    font-size: ${theme.font_size[size]}px;
    font-family: ${font === 'regular'
      ? theme.font_familly.regular
      : theme.font_familly.bold};
  `}
`
