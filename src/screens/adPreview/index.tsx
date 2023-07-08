import { useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Image, View, ViewToken } from 'react-native'
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  Tag as TagIcon,
  QrCode
} from 'phosphor-react-native'

import { NativeStackRoutesScreenProps } from '@routes/auth.routes'

import {
  ImageCounter,
  ImageListContainer,
  PaymentMethod
} from '@screens/adDetails/styled'

import { Text } from '@components/text'
import { Button } from '@components/button'
import {
  AdContent,
  Amount,
  AmountIndicator,
  PaymentMethodsContainer,
  RowCenterItems
} from '@screens/myAdDetails/styled'
import { Tag } from '@components/tag'
import { UserPhoto } from '@components/userPhoto'

import * as Styled from './styled'

export const AdPreview = () => {
  const { colors } = useTheme()
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()

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

  function handleGobackScreen() {
    goBack()
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

      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          backgroundColor: colors.gray[200]
        }}
      >
        <View>
          <RowCenterItems>
            <UserPhoto size="sm" photoEdiIcontShow={false} />
            <Text text="Maria" color="700" font="regular" size="md" />
          </RowCenterItems>

          <AdContent>
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
                <AmountIndicator>R$</AmountIndicator>
                <Amount>129,90</Amount>
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
          </AdContent>

          <RowCenterItems>
            <Text text="Aceita troca?" size="md" font="bold" color="600" />
            <Text text="Sim" size="md" font="regular" color="600" />
          </RowCenterItems>

          <PaymentMethodsContainer>
            <Text
              text="Meios de pagamento:"
              size="md"
              font="bold"
              color="700"
            />
            <PaymentMethod>
              <Barcode size={18} color={colors.gray[700]} />
              <Text color="600" font="regular" size="md" text="Boleto" />
            </PaymentMethod>

            <PaymentMethod>
              <QrCode size={18} color={colors.gray[700]} />
              <Text color="600" font="regular" size="md" text="Pix" />
            </PaymentMethod>

            <PaymentMethod>
              <Money size={18} color={colors.gray[700]} />
              <Text color="600" font="regular" size="md" text="Dinheiro" />
            </PaymentMethod>

            <PaymentMethod>
              <CreditCard size={18} color={colors.gray[700]} />
              <Text
                color="600"
                font="regular"
                size="md"
                text="Cartão de Crédito"
              />
            </PaymentMethod>

            <PaymentMethod>
              <Bank size={18} color={colors.gray[700]} />
              <Text
                color="600"
                font="regular"
                size="md"
                text="Depósito Bancário"
              />
            </PaymentMethod>
          </PaymentMethodsContainer>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          backgroundColor: colors.gray[100],
          paddingVertical: 16,
          paddingHorizontal: 24
        }}
      >
        <Button.Root
          type="PRIMARY"
          style={{ maxWidth: '100%' }}
          onPress={handleGobackScreen}
        >
          <Button.Icon
            Icon={ArrowLeft}
            iconProps={{
              size: 16,
              color: colors.gray[700]
            }}
          />
          <Text color="600" font="bold" size="md" text="Voltar e editar" />
        </Button.Root>

        <Button.Root type="SECONDARY" style={{ maxWidth: '100%' }}>
          <Button.Icon
            Icon={TagIcon}
            iconProps={{
              size: 16,
              color: colors.gray[100]
            }}
          />
          <Text color="100" font="bold" size="md" text="Publicar" />
        </Button.Root>
      </View>
    </Styled.Container>
  )
}
