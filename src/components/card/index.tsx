import { View } from 'react-native'
import { User } from 'phosphor-react-native'
import { useTheme } from 'styled-components'

import { Text } from '@components/text'

import * as Styled from './styled'

type CardProps = {
  showUserPhoto?: boolean
  productType: Styled.ProductState
  cardType: 'ACTIVE' | 'INACTIVE'
}

export const Card = ({
  productType = 'NEW',
  cardType = 'ACTIVE',
  showUserPhoto = true
}: CardProps) => {
  const { colors } = useTheme()

  return (
    <View>
      <Styled.ProdutAdsContainer
        source={{
          uri: 'https://anjuss.vteximg.com.br/arquivos/ids/163322/Tenis-Preto-e-Branco-Ride-Anjuss--PADRAO-33.jpg?v=637288059392900000'
        }}
      >
        {cardType === 'INACTIVE' && (
          <Styled.InactiveAdsIndicatorContainer>
            <Styled.BackgroundInactiveAds />
            <Text
              text="Anúncio desativado"
              color="100"
              font="bold"
              size="sm"
              style={{
                textTransform: 'uppercase',
                margin: 8,
                position: 'absolute',
                bottom: 0
              }}
            />
          </Styled.InactiveAdsIndicatorContainer>
        )}
        {showUserPhoto && (
          <Styled.AdvertiserPhotoContainer>
            <User
              size={18}
              color={colors.gray[400]}
              style={{
                position: 'absolute'
              }}
            />
          </Styled.AdvertiserPhotoContainer>
        )}
        <Styled.ProductState type={productType}>Usado</Styled.ProductState>
      </Styled.ProdutAdsContainer>
      <View>
        <Text
          text="Tênis vermelho"
          color={cardType === 'ACTIVE' ? '600' : '400'}
          size="md"
          font="regular"
        />
        <View
          style={{
            height: 21,
            flexDirection: 'row',
            gap: 2
          }}
        >
          <Text
            color={cardType === 'ACTIVE' ? '700' : '400'}
            font="bold"
            size="sm"
            text="R$"
          />
          <Text
            text="59,90"
            font="bold"
            color={cardType === 'ACTIVE' ? '700' : '400'}
            size="lg"
          />
        </View>
      </View>
    </View>
  )
}
