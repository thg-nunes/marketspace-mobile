import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  View,
  ViewToken
} from 'react-native'

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
import { apiServices } from '@services/api'
import { AdProductDetailsDTO, UpdataProductVisibility } from '@dtos/product'
import { api } from '@services/axios'
import { returnsPaymentMethod } from '@utils/screens/adDetails'
import { myToast } from '@utils/toast'

export const MyAdDetails = () => {
  const { params } = useRoute()
  const { id } = params as { id: string }
  const { goBack, navigate } = useNavigation<NativeStackRoutesScreenProps>()
  const [activeImage, setActiveImage] = useState(0)
  const [productDetails, setProductDetails] = useState<AdProductDetailsDTO>(
    {} as AdProductDetailsDTO
  )
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

  async function handleUpdateProductVisibility({
    id,
    is_active
  }: UpdataProductVisibility): Promise<void> {
    try {
      await apiServices.updataProductVisibility({
        id,
        is_active
      })

      myToast({
        message: 'Produto atualizado com sucesso.',
        background: colors.green.dark
      })

      goBack()
    } catch (error) {}
  }

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
        <Styled.GobackIcon onPress={handleGoBackSecreen} />
        <Pressable onPress={() => navigate('adEdit', { productId: id })}>
          <Styled.EditAdIcon />
        </Pressable>
      </Styled.Header>

      {productDetails.id ? (
        <>
          <Styled.ImageListContainer>
            <Styled.InactiveAd>
              <Text
                size="md"
                font="bold"
                color="100"
                text="Anúncio desativado"
                style={{ zIndex: 4 }}
              />
            </Styled.InactiveAd>
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

              <Styled.ColumnCenterItems>
                <Button.Root
                  type={productDetails.is_active ? 'SECONDARY' : 'TERTIARY'}
                  style={{ maxWidth: '100%' }}
                  onPress={() =>
                    handleUpdateProductVisibility({
                      id: productDetails.id,
                      is_active: !productDetails.is_active
                    })
                  }
                >
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
                    text={
                      productDetails.is_active
                        ? 'Desativar anúncio'
                        : 'Reativar anúncio'
                    }
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
                  <Text
                    color="700"
                    font="bold"
                    size="md"
                    text="Excluir anúncio"
                  />
                </Button.Root>
              </Styled.ColumnCenterItems>
            </View>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator color={colors.blue.light} />
      )}
    </Styled.Container>
  )
}
