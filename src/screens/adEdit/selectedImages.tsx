import { FlatList, Pressable, View } from 'react-native'

import { api } from '@services/axios'

import { handleProductPhotoSelect, handleRemoveImage } from '@hooks/adEdit'

import * as Styled from './styled'

type SelectedImagesProps = {
  productData: {
    images: string[]
    setImages: React.Dispatch<React.SetStateAction<string[]>>
  }
}

export const SelectedImages = ({ productData }: SelectedImagesProps) => {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <FlatList
        data={productData.images}
        style={{
          maxWidth: productData.images.length * 100
        }}
        contentContainerStyle={{ gap: 8, paddingRight: 15 }}
        renderItem={({ item }) => (
          <Styled.ProductPhotoSelected
            source={{
              uri: `${api.defaults.baseURL}/images/${item}`
            }}
          >
            <Pressable
              onPress={() =>
                handleRemoveImage(item, {
                  images: productData.images,
                  setImages: productData.setImages
                })
              }
            >
              <Styled.RemoveImageIcons />
            </Pressable>
          </Styled.ProductPhotoSelected>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {productData.images.length < 3 && (
        <Styled.ProductPhotoSelector
          activeOpacity={0.8}
          onPress={() =>
            handleProductPhotoSelect({
              images: productData.images,
              setImages: productData.setImages
            })
          }
        >
          <Styled.PlusIcon />
        </Styled.ProductPhotoSelector>
      )}
    </View>
  )
}
