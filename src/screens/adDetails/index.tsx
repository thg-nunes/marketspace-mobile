import { useCallback, useState } from 'react'
import { useTheme } from 'styled-components'
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import { Tag } from '@components/tag'
import { Text } from '@components/text'
import { UserInfo } from '@components/userInfo'
import { PaymentMethod } from '@components/paymentMethod'

import * as Styled from './styled'
import { apiServices } from '@services/api'
import { AdProductDetailsDTO } from '@dtos/product'
import { api } from '@services/axios'
import { returnsPaymentMethod } from '@utils/screens/adDetails'
import { courselFlatlistImage } from '@hooks/myAdDetails'
import { ScreenHeader } from '@components/screensHeader'
import { AdImageCoursel } from '@screens/myAdDetails/adImageCoursel'
import { ContactSection } from './contactSection'

export const AdDetails = () => {
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const [activeImage, setActiveImage] = useState(0)
  const appTheme = useTheme()
  const { params } = useRoute()
  const viewabilityConfigCallbackPairs = courselFlatlistImage(setActiveImage)
  const [productDetails, setProductDetails] = useState<AdProductDetailsDTO>(
    {} as AdProductDetailsDTO
  )
  const { id } = params as { id: string }

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
          <ScreenHeader.Root mb={12} mt={20} pl={24} pr={24}>
            <ScreenHeader.Icon onPress={goBack}>
              <Styled.GobackIcon />
            </ScreenHeader.Icon>
          </ScreenHeader.Root>
          <AdImageCoursel
            activeImage={activeImage}
            productDetails={productDetails}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
          />

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
            </View>

            <ContactSection
              appTheme={appTheme}
              userTel={productDetails.user.tel}
              product_price={productDetails.price}
            />
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator color={appTheme.colors.blue.light} />
      )}
    </Styled.Container>
  )
}
