import { useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  View,
  ViewToken
} from 'react-native'
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  WhatsappLogo
} from 'phosphor-react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import { Tag } from '@components/tag'
import { Text } from '@components/text'
import { Button } from '@components/button'
import { UserInfo } from '@components/userInfo'
import { PaymentMethod } from '@components/paymentMethod'

import * as Styled from './styled'
import { apiServices } from '@services/api'
import { AdProductDetailsDTO } from '@dtos/product'
import { api } from '@services/axios'
import { returnsPaymentMethod } from '@utils/screens/adDetails'

export const AdDetails = () => {
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const [activeImage, setActiveImage] = useState(0)
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PFe0VM926Vss_eH-gkyWaUn3HUkkqeBxrw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAMB7VSqy-EsGhPHiNV1ac6KIJo5e1eudaLw&usqp=CAU'
  ]
  const { colors } = useTheme()
  const { params } = useRoute()
  const [productDetails, setProductDetails] = useState<AdProductDetailsDTO>(
    {} as AdProductDetailsDTO
  )
  const { id } = params as { id: string }

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

  useFocusEffect(
    useCallback(() => {
      async function fetchProductDetailsById(id: string) {
        const response = await apiServices.fetchProductDetails(id)
        setProductDetails(response)
      }

      fetchProductDetailsById(id)
    }, [id])
  )

  return (
    <Styled.Container>
      {productDetails.id ? (
        <>
          <Styled.GobackButton onPress={handleGoBackSecreen}>
            <Styled.GobackIcon />
          </Styled.GobackButton>

          <Styled.ImageListContainer>
            <FlatList
              data={productDetails.product_images}
              horizontal
              pagingEnabled
              renderItem={({ item }) => (
                <Image
                  source={{
                    uri: `${api.defaults.baseURL}/images/${item.path}`
                  }}
                  style={{ width: 375, height: 280 }}
                />
              )}
              keyExtractor={(item) => item.path}
              viewabilityConfigCallbackPairs={
                viewabilityConfigCallbackPair.current
              }
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

          <ScrollView>
            <View
              style={{
                paddingVertical: 20,
                paddingHorizontal: 24
              }}
            >
              <UserInfo
                photSize="sm"
                uri={`${api.defaults.baseURL}/images/${productDetails.user.avatar}`}
              >
                <Text
                  text={productDetails.user.name}
                  color="700"
                  font="regular"
                  size="md"
                />
              </UserInfo>

              <Styled.AdContent>
                <Tag.Root type="GRAY.300" size="sm">
                  <Text text="NOVO" color="600" font="bold" size="xsm" />
                </Tag.Root>

                <View style={{ flexDirection: 'row' }}>
                  <Text
                    text={productDetails.name}
                    color="700"
                    font="bold"
                    size="xl"
                    style={{ flex: 1 }}
                  />
                  <View style={{ flexDirection: 'row' }}>
                    <Styled.AmountIndicator>R$</Styled.AmountIndicator>
                    <Styled.Amount>{productDetails.price}</Styled.Amount>
                  </View>
                </View>
                <Text
                  text={productDetails.description}
                  color="600"
                  font="regular"
                  size="md"
                />
              </Styled.AdContent>

              <Styled.RowCenterItems>
                <Text text="Aceita troca?" size="md" font="bold" color="600" />
                <Text
                  text={productDetails.accept_trade ? 'Sim' : 'Não'}
                  size="md"
                  font="regular"
                  color="600"
                />
              </Styled.RowCenterItems>

              <Styled.PaymentMethodsContainer>
                <Text
                  text="Meios de pagamento:"
                  size="md"
                  font="bold"
                  color="700"
                />
                {returnsPaymentMethod(
                  productDetails.payment_methods,
                  'boleto'
                ) && (
                  <PaymentMethod.Root>
                    <PaymentMethod.Icon Icon={Barcode} />
                    <PaymentMethod.Type type="Boleto" />
                  </PaymentMethod.Root>
                )}

                {returnsPaymentMethod(
                  productDetails.payment_methods,
                  'pix'
                ) && (
                  <PaymentMethod.Root>
                    <PaymentMethod.Icon Icon={QrCode} />
                    <PaymentMethod.Type type="Pix" />
                  </PaymentMethod.Root>
                )}

                {returnsPaymentMethod(
                  productDetails.payment_methods,
                  'cash'
                ) && (
                  <PaymentMethod.Root>
                    <PaymentMethod.Icon Icon={Money} />
                    <PaymentMethod.Type type="Dinheiro" />
                  </PaymentMethod.Root>
                )}

                {returnsPaymentMethod(
                  productDetails.payment_methods,
                  'card'
                ) && (
                  <PaymentMethod.Root>
                    <PaymentMethod.Icon Icon={CreditCard} />
                    <PaymentMethod.Type type="Cartão de Crédito" />
                  </PaymentMethod.Root>
                )}

                {returnsPaymentMethod(
                  productDetails.payment_methods,
                  'deposit'
                ) && (
                  <PaymentMethod.Root>
                    <PaymentMethod.Icon Icon={Bank} />
                    <PaymentMethod.Type type="Depósito Bancário" />
                  </PaymentMethod.Root>
                )}
              </Styled.PaymentMethodsContainer>
            </View>

            <Styled.Contact>
              <View style={{ flexDirection: 'row' }}>
                <Styled.AmountIndicator style={{ color: colors.blue.dark }}>
                  R$
                </Styled.AmountIndicator>
                <Styled.Amount style={{ color: colors.blue.dark }}>
                  {productDetails.price}
                </Styled.Amount>
              </View>

              <View>
                <Button.Root type="TERTIARY">
                  <Button.Icon
                    Icon={WhatsappLogo}
                    iconProps={{
                      size: 16,
                      color: 'white',
                      weight: 'fill'
                    }}
                  />
                  <Text
                    color="100"
                    font="bold"
                    size="md"
                    text="Entrar em contato"
                  />
                </Button.Root>
              </View>
            </Styled.Contact>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator color={colors.blue.light} />
      )}
    </Styled.Container>
  )
}
