import { useRef, useState } from 'react'
import { FlatList, Image, ScrollView, View, ViewToken } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/auth.routes'

import { Tag } from '@components/tag'
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
    info.changed[0]?.index && setActiveImage(info.changed[0]?.index)
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
            <Styled.ImageCounter isActive={index === activeImage} />
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
        <Styled.Content>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <UserPhoto size="sm" photoEdiIcontShow={false} />
            <Styled.UserName>Maria</Styled.UserName>
          </View>

          <View style={{ gap: 8, marginTop: 24, marginBottom: 24 }}>
            <Tag title="NOVO" type="USED" />
            <View style={{ flexDirection: 'row' }}>
              <Styled.AdHeader>Bicicleta</Styled.AdHeader>
              <View style={{ flexDirection: 'row' }}>
                <Styled.AmountIndicator>R$</Styled.AmountIndicator>
                <Styled.Amount>129,90</Styled.Amount>
              </View>
            </View>
            <Styled.AdDescription>
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
              nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus
              iaculis in aliquam.
            </Styled.AdDescription>
          </View>
        </Styled.Content>
      </ScrollView>
    </Styled.Container>
  )
}
