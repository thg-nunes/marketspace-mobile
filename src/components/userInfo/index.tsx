import { ReactNode } from 'react'
import * as Styled from './styled'

import { UserPhoto } from '@components/userPhoto'
import { Size } from '@components/userPhoto/styled'

type UserInfoProps = {
  photSize: Size
  photoEdiIcontShow: boolean
  children: ReactNode
}

export const UserInfo = ({
  photSize,
  photoEdiIcontShow,
  children
}: UserInfoProps) => {
  return (
    <Styled.Container>
      <UserPhoto size={photSize} photoEdiIcontShow={photoEdiIcontShow} />
      {children}
    </Styled.Container>
  )
}
