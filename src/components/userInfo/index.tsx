import { ReactNode } from 'react'
import * as Styled from './styled'

import { UserPhoto } from '@components/userPhoto'
import { Size } from '@components/userPhoto/styled'

type UserInfoProps = {
  photSize: Size
  children: ReactNode
}

export const UserInfo = ({ photSize, children }: UserInfoProps) => {
  return (
    <Styled.Container>
      <UserPhoto.Root size={photSize} />
      {children}
    </Styled.Container>
  )
}
