import { XCircle } from 'phosphor-react-native'
import * as Styled from './styled'

type TagProps = {
  title: string
  type?: Styled.TagType
}

export const Tag = ({ type = 'NEW', title = '' }: TagProps) => {
  return (
    <Styled.Container type={type}>
      <Styled.TagText type={type}>{title}</Styled.TagText>
      {type === 'NEW' && <Styled.RemoveIcon />}
    </Styled.Container>
  )
}
