import styled, { css } from 'styled-components/native'

export const Container = styled.Pressable<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => css`
    width: 111px;
    height: 34px;

    border-radius: 5px;
    border-width: 1px;
    border-color: ${isOpen ? theme.colors.gray[400] : theme.colors.gray[300]};
  `}
`

export const SelectContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;

  gap: 8px;
  padding: 8px 12px;
`

export const OptionsContainer = styled.View`
  ${({ theme }) => css`
    width: 100%;

    position: absolute;
    top: 100%;
    margin-top: 2px;

    gap: 12px;
    padding: 12px 12px;

    border-radius: 12px;
    background: ${theme.colors.gray[100]};
  `}
`
