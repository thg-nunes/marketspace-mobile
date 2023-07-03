import { TextProps } from 'react-native'

import * as Styled from './styled'

type TextComponentProps = TextProps & {
  text: string
  size: Styled.FontSize
  font: Styled.FontStyle
  color: Styled.FontColor
}

export const Text = ({
  font = 'regurlar',
  size = 'sm',
  text = '',
  color = '100',
  ...rest
}: TextComponentProps) => {
  return (
    <Styled.Container font={font} size={size} color={color} {...rest}>
      {text}
    </Styled.Container>
  )
}
