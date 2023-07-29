import { FlatList, Pressable, View } from 'react-native'

import { handleProductPhotoSelect, handleRemoveImage } from '@hooks/adEdit'
import * as Styled from './styled'

type ProductImagesProps = {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

export const ProductImages = ({ images, setImages }: ProductImagesProps) => {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {images.length > 0 && (
        <FlatList
          data={images}
          style={{
            maxWidth: images.length * 100
          }}
          contentContainerStyle={{ gap: 8, paddingRight: 15 }}
          renderItem={({ item }) => (
            <Styled.ProductPhotoSelected
              source={{
                uri: item
              }}
            >
              <Pressable
                onPress={() => handleRemoveImage(item, { images, setImages })}
              >
                <Styled.RemoveImageIcons />
              </Pressable>
            </Styled.ProductPhotoSelected>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
      {images.length < 3 && (
        <Styled.ProductPhotoSelector
          activeOpacity={0.8}
          onPress={() => handleProductPhotoSelect({ images, setImages })}
        >
          <Styled.PlusIcon />
        </Styled.ProductPhotoSelector>
      )}
    </View>
  )
}
