import { useCallback, useState } from 'react'
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
  View
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
import { courselFlatlistImage } from '@hooks/myAdDetails'
import { handleCallUser } from '@hooks/adDetails'
import { ScreenHeader } from '@components/screensHeader'
import { AdImageCoursel } from '@screens/myAdDetails/adImageCoursel'

export const AdDetails = () => {
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const [activeImage, setActiveImage] = useState(0)
  const { colors } = useTheme()
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
                <Button.Root
                  type="TERTIARY"
                  onPress={() => handleCallUser(productDetails.user.tel)}
                >
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
