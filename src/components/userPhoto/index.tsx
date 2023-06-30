import { useTheme } from 'styled-components'
import { PencilSimpleLine, User } from 'phosphor-react-native'

import * as Styled from './styled'

type UserPhotoProps = {
  size: Styled.Size
  photoEdiIcontShow: boolean
}

const iconSize = {
  xl: 44,
  md: 28,
  sm: 14
}

export const UserPhoto = ({ size, photoEdiIcontShow }: UserPhotoProps) => {
  const { colors } = useTheme()

  return (
    <Styled.Container size={size}>
      <User size={iconSize[size]} color={colors.gray[400]} />

      {photoEdiIcontShow && (
        <Styled.Pencel activeOpacity={0.9}>
          <PencilSimpleLine size={16} color="#ffffff" />
        </Styled.Pencel>
      )}
    </Styled.Container>
  )
}
