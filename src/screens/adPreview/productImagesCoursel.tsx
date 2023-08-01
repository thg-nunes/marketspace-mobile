import { ImageCounter, ImageListContainer } from '@screens/myAdDetails/styled'
import { screenwidth } from '@screens/login'
import { FlatList, Image, View, ViewToken } from 'react-native'

type ProductImagesCourselProps = {
  images: string[]
  activeImage: number
  viewabilityConfigCallbackPairs: React.MutableRefObject<
    {
      viewabilityConfig: {
        viewAreaCoveragePercentThreshold: number
      }
      onViewableItemsChanged: (info: {
        viewableItems: ViewToken[]
        changed: ViewToken[]
      }) => void
    }[]
  >
}

export const ProductImagesCoursel = ({
  viewabilityConfigCallbackPairs,
  activeImage,
  images
}: ProductImagesCourselProps) => {
  return (
    <ImageListContainer>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: parseFloat(screenwidth), height: 280 }}
          />
        )}
        keyExtractor={(item) => item}
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
        {images.map((_, index) => (
          <ImageCounter key={_} isActive={index === activeImage} />
        ))}
      </View>
    </ImageListContainer>
  )
}
