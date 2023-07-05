import styled, { css } from 'styled-components/native'

export type TagType = 'BLUE' | 'GRAY.300' | 'GRAY.400'

type TagStyleProps = {
  type: TagType
  size: 'lg' | 'sm'
  hasTagIcon?: boolean
}

export const Container = styled.View<TagStyleProps>`
  align-items: center;
  justify-content: center;

  ${({ size }) => css`
    height: ${size === 'sm' ? 17 : 28}px;
    padding-top: ${size === 'sm' ? 2 : 6}px;
    padding-bottom: ${size === 'sm' ? 2 : 6}px;
    padding-left: ${size === 'sm' ? 8 : 16}px;
    padding-right: ${size === 'sm' ? 8 : 16}px;
  `}

  padding-right: ${({ hasTagIcon, size }) =>
    hasTagIcon ? 6 : size === 'sm' ? 8 : 16}px;

  border-radius: 9999px;
  background: ${({ theme, type }) =>
    type === 'BLUE'
      ? theme.colors.blue.light
      : type === 'GRAY.300'
      ? theme.colors.gray[300]
      : theme.colors.gray[400]};

  flex-direction: row;
  gap: 6px;
`
