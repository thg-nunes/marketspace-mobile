import { useRef, useState } from 'react'
import { FlatList, Image, ScrollView, View, ViewToken } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/auth.routes'

import { Tag } from '@components/tag'
import { Text } from '@components/text'
import { UserPhoto } from '@components/userPhoto'

import * as Styled from './styled'

type AdDetailsProps = {}

export const AdDetails = ({}: AdDetailsProps) => {
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const [activeImage, setActiveImage] = useState(0)
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PFe0VM926Vss_eH-gkyWaUn3HUkkqeBxrw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAMB7VSqy-EsGhPHiNV1ac6KIJo5e1eudaLw&usqp=CAU'
  ]

  function handleGoBackSecreen() {
    goBack()
  }

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
      <Styled.GobackButton onPress={handleGoBackSecreen}>
        <Styled.GobackIcon />
      </Styled.GobackButton>

      <Styled.ImageListContainer>
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
            <Styled.ImageCounter key={_} isActive={index === activeImage} />
          ))}
        </View>
      </Styled.ImageListContainer>

      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingLeft: 24,
          paddingRight: 24
        }}
      >
        <View>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <UserPhoto size="sm" photoEdiIcontShow={false} />
            <Text text="Maria" color="700" font="regular" size="md" />
          </View>

          <View
            style={{
              gap: 8,
              marginTop: 24,
              marginBottom: 24,
              alignItems: 'flex-start'
            }}
          >
            <Tag.Root type="GRAY.300" size="sm">
              <Text text="NOVO" color="600" font="bold" size="xsm" />
            </Tag.Root>

            <View style={{ flexDirection: 'row' }}>
              <Text
                text="Bicicleta"
                color="700"
                font="bold"
                size="xl"
                style={{ flex: 1 }}
              />
              <View style={{ flexDirection: 'row' }}>
                <Styled.AmountIndicator>R$</Styled.AmountIndicator>
                <Styled.Amount>129,90</Styled.Amount>
              </View>
            </View>
            <Text
              text="Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
              nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus
              iaculis in aliquam."
              color="600"
              font="regular"
              size="md"
            />
          </View>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
