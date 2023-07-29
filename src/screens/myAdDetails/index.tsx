import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  View
} from 'react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { screenwidth } from '@screens/login'

import { Tag } from '@components/tag'
import { Text } from '@components/text'
import { UserPhoto } from '@components/userPhoto'

import * as Styled from './styled'
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'
import { PaymentMethod } from '@components/paymentMethod'
import { apiServices } from '@services/api'
import { AdProductDetailsDTO } from '@dtos/product'
import { api } from '@services/axios'
import { returnsPaymentMethod } from '@utils/screens/adDetails'
import { courselFlatlistImage } from '@hooks/myAdDetails'
import { ButtonsActionSection } from './buttonsActionSection'

export const MyAdDetails = () => {
  const { params } = useRoute()
  const { id } = params as { id: string }
  const stack = useNavigation<NativeStackRoutesScreenProps>()
  const [activeImage, setActiveImage] = useState(0)
  const viewabilityConfigCallbackPairs = courselFlatlistImage(setActiveImage)
  const [productDetails, setProductDetails] = useState<AdProductDetailsDTO>(
    {} as AdProductDetailsDTO
  )
  const appTheme = useTheme()

  useEffect(() => {
    async function fetchProductDetails(id: string) {
      const response = await apiServices.fetchProductDetails(id)
      setProductDetails(response)
    }

    fetchProductDetails(id)
  }, [id])

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.GobackIcon onPress={stack.goBack} />
        <Pressable onPress={() => stack.navigate('adEdit', { productId: id })}>
          <Styled.EditAdIcon />
        </Pressable>
      </Styled.Header>

      {productDetails.id ? (
        <>
          <Styled.ImageListContainer>
            {!productDetails.is_active && (
              <Styled.InactiveAd>
                <Text
                  size="md"
                  font="bold"
                  color="100"
                  text="Anúncio desativado"
                  style={{ zIndex: 4 }}
                />
              </Styled.InactiveAd>
            )}
            <FlatList
              data={productDetails.product_images}
              horizontal
              pagingEnabled
              renderItem={({ item }) => (
                <Image
                  source={{
                    uri: `${api.defaults.baseURL}/images/${item.path}`
                  }}
                  style={{ width: parseFloat(screenwidth), height: 280 }}
                />
              )}
              keyExtractor={(item) => item.path}
              viewabilityConfigCallbackPairs={
                viewabilityConfigCallbackPairs.current
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
              {productDetails.product_images.map((image, index) => (
                <Styled.ImageCounter
                  key={image.path}
                  isActive={index === activeImage}
                />
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
                <UserPhoto.Root
                  size="sm"
                  uri={`${api.defaults.baseURL}/images/${productDetails.user.avatar}`}
                />
                <Text
                  text={productDetails.user.name}
                  color="700"
                  font="regular"
                  size="md"
                />
              </Styled.RowCenterItems>

              <Styled.AdContent>
                <Tag.Root type="GRAY.300" size="sm">
                  <Text
                    text={productDetails.is_new ? 'NOVO' : 'USADO'}
                    color="600"
                    font="bold"
                    size="xsm"
                  />
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

              <ButtonsActionSection
                ad_id={id}
                appTheme={appTheme}
                stack={stack}
                productDetails={productDetails}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator color={appTheme.colors.blue.light} />
      )}
    </Styled.Container>
  )
}
