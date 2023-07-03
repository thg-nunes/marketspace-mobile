import { View } from 'react-native'
import { User } from 'phosphor-react-native'
import { useTheme } from 'styled-components'

import { Text } from '@components/text'

import * as Styled from './styled'

type CardProps = {}

export const Card = ({}: CardProps) => {
  const { colors } = useTheme()

  return (
    <View>
      <Styled.ProdutAdsContainer
        source={{
          uri: 'https://anjuss.vteximg.com.br/arquivos/ids/163322/Tenis-Preto-e-Branco-Ride-Anjuss--PADRAO-33.jpg?v=637288059392900000'
        }}
      >
        <Styled.AdvertiserPhotoContainer>
          <User
            size={18}
            color={colors.gray[400]}
            style={{
              position: 'absolute'
            }}
          />
        </Styled.AdvertiserPhotoContainer>
        <Styled.ProductState type="NEW">Usado</Styled.ProductState>
      </Styled.ProdutAdsContainer>
      <View>
        <Text text="Tênis vermelho" color="600" size="md" font="regular" />
        <View
          style={{
            height: 21,
            flexDirection: 'row',
            gap: 2
          }}
        >
          <Text color="700" font="bold" size="sm" text="R$" />
          <Text text="59,90" font="bold" color="700" size="lg" />
        </View>
      </View>
    </View>
  )
}
