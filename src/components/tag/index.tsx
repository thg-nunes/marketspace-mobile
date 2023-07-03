import { Text } from '@components/text'

import * as Styled from './styled'

type TagProps = {
  title: string
  type?: Styled.TagType
}

export const Tag = ({ type = 'NEW', title = '' }: TagProps) => {
  return (
    <Styled.Container type={type}>
      <Text
        text={title}
        size="sm"
        font="bold"
        color={type === 'NEW' ? '100' : '500'}
      />
      {type === 'NEW' && <Styled.RemoveIcon />}
    </Styled.Container>
  )
}
