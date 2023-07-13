import { ReactNode } from 'react'
import { Image } from 'react-native'
import { useTheme } from 'styled-components'
import { User } from 'phosphor-react-native'

import * as Styled from './styled'
import { api } from '@services/axios'

type UserPhotoRootProps = {
  uri?: string
  size: Styled.Size
  children?: ReactNode
}

const iconSize = {
  xl: 44,
  md: 28,
  sm: 14
}

export const UserPhotoRoot = ({
  size,
  children,
  uri = ''
}: UserPhotoRootProps) => {
  const { colors } = useTheme()

  return (
    <Styled.Container size={size}>
      {uri ? (
        <Image
          source={{
            uri: `${api.defaults.baseURL}/images/${uri}`,
            width: Styled.imageSizes[size] - 4,
            height: Styled.imageSizes[size] - 4
          }}
          style={{ borderRadius: 9999 }}
        />
      ) : (
        <User size={iconSize[size]} color={colors.gray[400]} />
      )}
      {children}
    </Styled.Container>
  )
}
