import { useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { useTheme } from 'styled-components/native'
import { useNavigation, useRoute } from '@react-navigation/native'
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

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import { ImageCounter, ImageListContainer } from '@screens/adDetails/styled'

import { screenwidth } from '../../../App'
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
import { PaymentMethod } from '@components/paymentMethod'

import * as Styled from './styled'
import { ProductDTO } from '@dtos/product'
import { myToast } from '@utils/toast'
import { theme } from '../../theme'
import { apiServices } from '@services/api'
import { BottomTabRoutesScreenProps } from '@routes/bottomTabs.routes'
import { AppError } from '@utils/screens/appError'
import { useFetchUserStorageData } from '@hooks/home'
import { api } from '@services/axios'
import { productPaymentChecked } from '@utils/screens/adCreate'

export const AdPreview = () => {
  const { colors } = useTheme()
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const bottomNavigation = useNavigation<BottomTabRoutesScreenProps>()

  const { params } = useRoute()
  const { images, product } = params as {
    images: string[]
    product: ProductDTO
  }
  const { userData } = useFetchUserStorageData()

  const [activeImage, setActiveImage] = useState(0)

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

  async function handleAdCreate() {
    try {
      const product_id = await apiServices.createProduct(product)

      images.forEach(
        async (image) => await apiServices.createProductImage(product_id, image)
      )

      myToast({
        message: 'Produto cadastrado com sucesso.',
        background: theme.colors.green.dark
      })
      setTimeout(() => bottomNavigation.navigate('myAds'), 1500)
    } catch (error) {
      if (error instanceof AppError) {
        myToast({
          message: error.message,
          background: theme.colors.red.light
        })
      }
    }
  }

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
            <Image
              source={{ uri: item }}
              style={{ width: parseFloat(screenwidth), height: 280 }}
            />
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
            <UserPhoto.Root
              size="sm"
              uri={`${api.defaults.baseURL}/images/${userData.avatar}`}
            />
            <Text text={userData.name} color="700" font="regular" size="md" />
          </RowCenterItems>

          <AdContent>
            <Tag.Root type="GRAY.300" size="sm">
              <Text
                text={product.is_new ? 'NOVO' : 'USADO'}
                color="600"
                font="bold"
                size="xsm"
              />
            </Tag.Root>

            <View style={{ flexDirection: 'row' }}>
              <Text
                text={product.name}
                color="700"
                font="bold"
                size="xl"
                style={{ flex: 1 }}
              />
              <View style={{ flexDirection: 'row' }}>
                <AmountIndicator>R$</AmountIndicator>
                <Amount>{product.price}</Amount>
              </View>
            </View>
            <Text
              text={product.description}
              color="600"
              font="regular"
              size="md"
            />
          </AdContent>

          <RowCenterItems>
            <Text text="Aceita troca?" size="md" font="bold" color="600" />
            <Text
              text={product.accept_trade ? 'Sim' : 'Não'}
              size="md"
              font="regular"
              color="600"
            />
          </RowCenterItems>

          <PaymentMethodsContainer>
            <Text
              text="Meios de pagamento:"
              size="md"
              font="bold"
              color="700"
            />
            {productPaymentChecked({
              productAcceptPayments: product.payment_methods,
              paymentType: 'boleto'
            }) && (
              <PaymentMethod.Root>
                <PaymentMethod.Icon Icon={Barcode} />
                <PaymentMethod.Type type="Boleto" />
              </PaymentMethod.Root>
            )}

            {productPaymentChecked({
              productAcceptPayments: product.payment_methods,
              paymentType: 'pix'
            }) && (
              <PaymentMethod.Root>
                <PaymentMethod.Icon Icon={QrCode} />
                <PaymentMethod.Type type="Pix" />
              </PaymentMethod.Root>
            )}

            {productPaymentChecked({
              productAcceptPayments: product.payment_methods,
              paymentType: 'cash'
            }) && (
              <PaymentMethod.Root>
                <PaymentMethod.Icon Icon={Money} />
                <PaymentMethod.Type type="Dinheiro" />
              </PaymentMethod.Root>
            )}

            {productPaymentChecked({
              productAcceptPayments: product.payment_methods,
              paymentType: 'card'
            }) && (
              <PaymentMethod.Root>
                <PaymentMethod.Icon Icon={CreditCard} />
                <PaymentMethod.Type type="Cartão de Crédito" />
              </PaymentMethod.Root>
            )}

            {productPaymentChecked({
              productAcceptPayments: product.payment_methods,
              paymentType: 'deposit'
            }) && (
              <PaymentMethod.Root>
                <PaymentMethod.Icon Icon={Bank} />
                <PaymentMethod.Type type="Depósito Bancário" />
              </PaymentMethod.Root>
            )}
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
          onPress={goBack}
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

        <Button.Root
          type="SECONDARY"
          style={{ maxWidth: '100%' }}
          onPress={handleAdCreate}
        >
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
