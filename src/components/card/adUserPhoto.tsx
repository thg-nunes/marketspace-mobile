import { useTheme } from 'styled-components'
import { User } from 'phosphor-react-native'

import * as Styled from './styled'

export const AdUserPhoto = () => {
  const { colors } = useTheme()

  return (
    <Styled.AdvertiserPhotoContainer>
      <User
        size={18}
        color={colors.gray[400]}
        style={{
          position: 'absolute'
        }}
      />
    </Styled.AdvertiserPhotoContainer>
  )
}
