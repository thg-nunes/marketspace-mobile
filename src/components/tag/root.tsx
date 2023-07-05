import { ReactNode } from 'react'

import * as Styled from './styled'

type TagProps = {
  children: ReactNode
  type: Styled.TagType
  size: 'lg' | 'sm'
  hasTagIcon: boolean
}

export const TagRoot = ({
  type = 'BLUE',
  size = 'sm',
  hasTagIcon = false,
  children
}: TagProps) => {
  return (
    <Styled.Container type={type} hasTagIcon={hasTagIcon} size={size}>
      {children}
    </Styled.Container>
  )
}
