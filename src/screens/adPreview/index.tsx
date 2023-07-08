import { FlatList, Image, View, ViewToken } from 'react-native'
import * as Styled from './styled'

import { ImageCounter, ImageListContainer } from '@screens/adDetails/styled'

import { Text } from '@components/text'
import { useRef, useState } from 'react'

export const AdPreview = () => {
  const [activeImage, setActiveImage] = useState(0)
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PFe0VM926Vss_eH-gkyWaUn3HUkkqeBxrw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAMB7VSqy-EsGhPHiNV1ac6KIJo5e1eudaLw&usqp=CAU'
  ]

  function onViewableItemsChanged(info: {
    viewableItems: Array<ViewToken>
    changed: Array<ViewToken>
  }) {
    const imageIndex = info.changed[0]?.index as number
    setActiveImage(imageIndex)
  }

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 95
  }

  const viewabilityConfigCallbackPair = useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged
    }
  ])

  return (
    <Styled.Container>
      <View style={{ gap: 2, marginVertical: 16, marginHorizontal: 24 }}>
        <Text
          text="Pré visualização do anúncio"
          color="100"
          font="bold"
          size="lg"
          style={{ textAlign: 'center' }}
        />
        <Text
          text="É assim que seu produto vai aparecer!"
          color="100"
          font="regular"
          size="md"
          style={{ textAlign: 'center' }}
        />
      </View>

      <ImageListContainer>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width: 375, height: 280 }} />
          )}
          keyExtractor={(item) => item}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPair.current}
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
    </Styled.Container>
  )
}
