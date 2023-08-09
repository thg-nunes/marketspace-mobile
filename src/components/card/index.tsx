import { View } from 'react-native'

import { api } from '@services/axios'
import { CardPropsAdapter } from '@dtos/card'

import { Text } from '@components/text'
import { UserPhoto } from '@components/userPhoto'
import { InactiveAd } from './inactiveAd'

import * as Styled from './styled'

type CardProps = {
  showUserPhoto?: boolean
  productData: CardPropsAdapter
  productType: Styled.ProductState
  productActive: boolean
}

export const Card = ({
  productData,
  productType = 'NEW',
  productActive = true,
  showUserPhoto = true
}: CardProps) => {
  const product_type = productData?.is_new ? 'Novo' : 'Usado'

  return (
    <>
      <Styled.ProdutAdsContainer
        source={{
          uri: `${api.defaults.baseURL}/images/${productData?.product_images[0].path}`
        }}
      >
        {!productActive && <InactiveAd />}
        {showUserPhoto && (
          <UserPhoto.Root
            size="sm"
            uri={`${api.defaults.baseURL}/images/${productData?.user.avatar}`}
          />
        )}
        <Styled.ProductState type={productType}>
          {product_type}
        </Styled.ProductState>
      </Styled.ProdutAdsContainer>
      <View style={{ marginTop: 4, paddingHorizontal: 2 }}>
        <Text
          text={productData?.name}
          color={productActive ? '600' : '400'}
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
            color={productActive ? '700' : '400'}
            font="bold"
            size="sm"
            text="R$"
          />
          <Text
            text={`${productData?.price}`}
            font="bold"
            color={productActive ? '700' : '400'}
            size="lg"
          />
        </View>
      </View>
    </>
  )
}
