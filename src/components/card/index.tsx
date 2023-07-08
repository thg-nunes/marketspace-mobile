import { View } from 'react-native'

import { Text } from '@components/text'
import { InactiveAd } from './inactiveAd'
import { AdUserPhoto } from './adUserPhoto'

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
  return (
    <View>
      <Styled.ProdutAdsContainer
        source={{
          uri: 'https://anjuss.vteximg.com.br/arquivos/ids/163322/Tenis-Preto-e-Branco-Ride-Anjuss--PADRAO-33.jpg?v=637288059392900000'
        }}
      >
        {cardType === 'INACTIVE' && <InactiveAd />}
        {showUserPhoto && <AdUserPhoto />}
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
