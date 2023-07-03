import { XCircle } from 'phosphor-react-native'
import styled from 'styled-components/native'

export type TagType = 'NEW' | 'USED'

type TagStyleProps = {
  type: TagType
}

export const Container = styled.View<TagStyleProps>`
  height: 28px;

  align-items: center;
  justify-content: center;

  padding: 6px 16px;
  border-radius: 9999px;
  background: ${({ theme, type }) =>
    type === 'NEW' ? theme.colors.blue.light : theme.colors.gray[300]};

  flex-direction: row;
  gap: 6px;
`

export const RemoveIcon = styled(XCircle).attrs(() => ({
  size: 13,
  color: '#ffffff',
  weight: 'fill'
}))``
