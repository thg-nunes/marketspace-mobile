import styled, { css } from 'styled-components/native'

export const Container = styled.Pressable<{ switchEnabled: boolean }>`
  ${({ theme, switchEnabled }) => css`
    width: 50px;
    height: 28px;

    padding: 2px;
    align-items: ${switchEnabled ? 'flex-end' : 'flex-start'};

    border-radius: 999px;
    background: ${switchEnabled
      ? theme.colors.blue.light
      : theme.colors.gray[300]};
  `}
`

export const SwitchCircle = styled.View<{ switchEnabled: boolean }>`
  width: 24px;
  height: 24px;

  border-radius: 999px;
  background: white;
`
