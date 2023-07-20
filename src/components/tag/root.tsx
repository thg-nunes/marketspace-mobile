import { ReactNode } from 'react'

import * as Styled from './styled'
import { PressableProps } from 'react-native'

type TagProps = PressableProps & {
  children: ReactNode
  type: Styled.TagType
  size: 'lg' | 'sm'
  hasTagIcon?: boolean
}

export const TagRoot = ({
  type = 'BLUE',
  size = 'sm',
  hasTagIcon = false,
  children,
  ...rest
}: TagProps) => {
  return (
    <Styled.Container type={type} hasTagIcon={hasTagIcon} size={size} {...rest}>
      {children}
    </Styled.Container>
  )
}
