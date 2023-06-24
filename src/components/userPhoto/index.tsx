import { useTheme } from 'styled-components'
import { PencilSimpleLine, User } from 'phosphor-react-native'

import * as Styled from './styled'

type UserPhotoProps = {}

export const UserPhoto = ({}: UserPhotoProps) => {
  const { colors } = useTheme()

  return (
    <Styled.Container>
      <User size={44} color={colors.gray[400]} />

      <Styled.Pencel activeOpacity={0.9}>
        <PencilSimpleLine size={16} color="#ffffff" />
      </Styled.Pencel>
    </Styled.Container>
  )
}
