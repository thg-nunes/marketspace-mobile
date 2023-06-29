import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export type ButtonStyle = 'PRIMARY' | 'SECONDARY' | 'TERTIARY'

type ButtonTypeStylePropsDTO = {
  type: ButtonStyle
}

export const Container = styled(TouchableOpacity)<ButtonTypeStylePropsDTO>`
  ${({ theme, type }) => css`
    flex: 1;
    max-width: 276px;
    height: 42px;
    max-height: 42px;

    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;

    border-radius: 6px;
    padding: 12px;

    font-size: ${theme.font_size.md}px;
    font-family: ${theme.font_familly.bold};

    background: ${type === 'PRIMARY'
      ? theme.colors.gray[300]
      : type === 'SECONDARY'
      ? theme.colors.gray[700]
      : theme.colors.blue.light};
  `}
`

export const ButtonText = styled.Text<ButtonTypeStylePropsDTO>`
  ${({ theme, type }) => css`
    font-family: ${theme.font_familly.bold};
    color: ${type === 'PRIMARY'
      ? theme.colors.gray[600]
      : theme.colors.gray[100]};
  `}
`
