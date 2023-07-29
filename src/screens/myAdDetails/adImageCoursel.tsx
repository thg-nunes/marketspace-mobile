import { FlatList, Image, View } from 'react-native'

import { api } from '@services/axios'
import { screenwidth } from '@screens/login'
import { AdProductDetailsDTO } from '@dtos/product'

import { Text } from '@components/text'
import * as Styled from './styled'

type AdImageCourselProps = {
  activeImage: number
  viewabilityConfigCallbackPairs: any
  productDetails: AdProductDetailsDTO
}

export const AdImageCoursel = ({
  productDetails,
  activeImage,
  viewabilityConfigCallbackPairs
}: AdImageCourselProps) => {
  return (
    <Styled.ImageListContainer>
      {!productDetails.is_active && (
        <Styled.InactiveAd>
          <Text
            size="md"
            font="bold"
            color="100"
            text="Anúncio desativado"
            style={{ zIndex: 4 }}
          />
        </Styled.InactiveAd>
      )}
      <FlatList
        data={productDetails.product_images}
        horizontal
        pagingEnabled
        renderItem={({ item }) => (
          <Image
            source={{
              uri: `${api.defaults.baseURL}/images/${item.path}`
            }}
            style={{ width: parseFloat(screenwidth), height: 280 }}
          />
        )}
        keyExtractor={(item) => item.path}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsHorizontalScrollIndicator={false}
      />

      <View
        style={{
          width: 375,
          flexDirection: 'row',
          position: 'absolute',
          marginBottom: 2,
          bottom: 0,
          gap: 4
        }}
      >
        {productDetails.product_images.map((image, index) => (
          <Styled.ImageCounter
            key={image.path}
            isActive={index === activeImage}
          />
        ))}
      </View>
    </Styled.ImageListContainer>
  )
}
