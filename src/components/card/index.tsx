import { View } from 'react-native'
import { User } from 'phosphor-react-native'
import { useTheme } from 'styled-components'

import * as Styled from './styled'

type CardProps = {}

export const Card = ({}: CardProps) => {
  const { colors } = useTheme()

  return (
    <Styled.Container>
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
        <Styled.ProductTitle>Tênis vermelho</Styled.ProductTitle>
        <View
          style={{
            height: 21,
            flexDirection: 'row',
            gap: 2
          }}
        >
          <Styled.ProductAmountIndicator>R$</Styled.ProductAmountIndicator>
          <Styled.ProductAmountValue>59,90</Styled.ProductAmountValue>
        </View>
      </View>
    </Styled.Container>
  )
}
