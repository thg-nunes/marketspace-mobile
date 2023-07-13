import { ReactNode } from 'react'
import * as Styled from './styled'

import { UserPhoto } from '@components/userPhoto'
import { Size } from '@components/userPhoto/styled'

type UserInfoProps = {
  uri?: string
  photSize: Size
  children: ReactNode
}

export const UserInfo = ({ photSize, children, uri }: UserInfoProps) => {
  return (
    <Styled.Container>
      <UserPhoto.Root size={photSize} uri={uri} />
      {children}
    </Styled.Container>
  )
}
