import { useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Image, ScrollView, View, ViewToken } from 'react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import { Tag } from '@components/tag'
import { Text } from '@components/text'
import { UserPhoto } from '@components/userPhoto'

import * as Styled from './styled'
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  Power,
  QrCode,
  TrashSimple
} from 'phosphor-react-native'
import { Button } from '@components/button'
import { PaymentMethod } from '@components/paymentMethod'

export const MyAdDetails = () => {
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const [activeImage, setActiveImage] = useState(0)
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PFe0VM926Vss_eH-gkyWaUn3HUkkqeBxrw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAMB7VSqy-EsGhPHiNV1ac6KIJo5e1eudaLw&usqp=CAU'
  ]
  const { colors } = useTheme()

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
      <Styled.Header>
        <Styled.GobackIcon onPress={handleGoBackSecreen} />
        <Styled.EditAdIcon />
      </Styled.Header>

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
          paddingTop: 20
        }}
      >
        <View>
          <Styled.RowCenterItems>
            <UserPhoto size="sm" photoEdiIcontShow={false} />
            <Text text="Maria" color="700" font="regular" size="md" />
          </Styled.RowCenterItems>

          <Styled.AdContent>
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
          </Styled.AdContent>

          <Styled.RowCenterItems>
            <Text text="Aceita troca?" size="md" font="bold" color="600" />
            <Text text="Sim" size="md" font="regular" color="600" />
          </Styled.RowCenterItems>

          <Styled.PaymentMethodsContainer>
            <Text
              text="Meios de pagamento:"
              size="md"
              font="bold"
              color="700"
            />
            <PaymentMethod.Root>
              <PaymentMethod.Icon Icon={Barcode} />
              <PaymentMethod.Type type="Boleto" />
            </PaymentMethod.Root>

            <PaymentMethod.Root>
              <PaymentMethod.Icon Icon={QrCode} />
              <PaymentMethod.Type type="Pix" />
            </PaymentMethod.Root>

            <PaymentMethod.Root>
              <PaymentMethod.Icon Icon={Money} />
              <PaymentMethod.Type type="Dinheiro" />
            </PaymentMethod.Root>

            <PaymentMethod.Root>
              <PaymentMethod.Icon Icon={CreditCard} />
              <PaymentMethod.Type type="Cartão de Crédito" />
            </PaymentMethod.Root>

            <PaymentMethod.Root>
              <PaymentMethod.Icon Icon={Bank} />
              <PaymentMethod.Type type="Depósito Bancário" />
            </PaymentMethod.Root>
          </Styled.PaymentMethodsContainer>

          <Styled.ColumnCenterItems>
            <Button.Root type="SECONDARY" style={{ maxWidth: '100%' }}>
              <Button.Icon
                Icon={Power}
                iconProps={{
                  size: 16,
                  color: 'white'
                }}
              />
              <Text
                color="100"
                font="bold"
                size="md"
                text="Desativar anúncio"
              />
            </Button.Root>

            <Button.Root type="PRIMARY" style={{ maxWidth: '100%' }}>
              <Button.Icon
                Icon={TrashSimple}
                iconProps={{
                  size: 16,
                  color: colors.gray[700]
                }}
              />
              <Text color="700" font="bold" size="md" text="Excluir anúncio" />
            </Button.Root>
          </Styled.ColumnCenterItems>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
