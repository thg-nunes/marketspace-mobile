import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  View
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { apiServices } from '@services/api'
import { myToast } from '@utils/toast'
import { AppError } from '@utils/screens/appError'

import { Text } from '@components/text'
import { Input } from '@components/input'
import { Button } from '@components/button'
import { Switch } from '@components/switch'
import { CheckboxInput } from '@components/checkBox'
import { CheckRadioInput } from '@components/radioCheckbox'
import { ProductCondition } from '@screens/home/styled'

import { theme } from '../../theme'
import * as Styled from './styled'
import { api } from '@services/axios'
import {
  productPaymentChecked,
  updateProductsPayments
} from '@utils/screens/adEdit'
import {
  fetchProductDetails,
  handleAdUpdate,
  handleProductPhotoSelect,
  handleRemoveImage
} from '@hooks/adEdit'

export const AdEdit = () => {
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const { params } = useRoute()
  const { productId } = params as { productId: string }
  const productData = fetchProductDetails(productId)
  const product = {
    name: productData.productTitle,
    description: productData.productDescription,
    is_new: productData.productIsNew,
    accept_trade: productData.acceptTrade,
    price: parseInt(productData.productValue),
    payment_methods: productData.productAcceptPayments
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <Pressable onPress={goBack}>
          <Styled.GobackIcon />
        </Pressable>
        <Text
          color="700"
          size="xl"
          font="bold"
          text="Editar anúncio"
          style={{ flex: 1, textAlign: 'center' }}
        />
      </Styled.Header>

      {productData.product.id ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ gap: 16 }}>
              <View style={{ gap: 16 }}>
                <View style={{ gap: 4 }}>
                  <Text text="Imagens" color="700" font="bold" size="lg" />
                  <Text
                    text="Escolha até 3 imagens para mostrar o quando o seu produto é incrível!"
                    color="700"
                    font="regular"
                    size="md"
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <FlatList
                  data={productData.images}
                  style={{
                    maxWidth: productData.images.length * 100
                  }}
                  contentContainerStyle={{ gap: 8, paddingRight: 15 }}
                  renderItem={({ item }) => (
                    <Styled.ProductPhotoSelected
                      source={{
                        uri: `${api.defaults.baseURL}/images/${item}`
                      }}
                    >
                      <Pressable
                        onPress={() =>
                          handleRemoveImage(item, {
                            images: productData.images,
                            setImages: productData.setImages
                          })
                        }
                      >
                        <Styled.RemoveImageIcons />
                      </Pressable>
                    </Styled.ProductPhotoSelected>
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
                {productData.images.length < 3 && (
                  <Styled.ProductPhotoSelector
                    activeOpacity={0.8}
                    onPress={() =>
                      handleProductPhotoSelect({
                        images: productData.images,
                        setImages: productData.setImages
                      })
                    }
                  >
                    <Styled.PlusIcon />
                  </Styled.ProductPhotoSelector>
                )}
              </View>
            </View>

            <View
              style={{
                gap: 16,
                marginTop: 32,
                flex: 1
              }}
            >
              <Text font="bold" size="lg" color="600" text="Sobre o produto" />
              <Input.Root
                value={productData.productTitle}
                placeholder="Título do anúncio"
                onChangeText={productData.setProductTitle}
              />
            </View>

            <View
              style={{
                gap: 16,
                marginBottom: 32,
                flex: 1
              }}
            >
              <Text font="bold" size="lg" color="600" text="Sobre o produto" />
              <Input.Root
                placeholder="Descrição do produto"
                numberOfLines={3}
                inputHeight={136}
                style={{
                  textAlignVertical: 'top',
                  height: 136,
                  paddingVertical: 12
                }}
                value={productData.productDescription}
                onChangeText={productData.setProductDescription}
              />

              <View style={{ flexDirection: 'row', gap: 20 }}>
                <CheckRadioInput
                  productStateChange={() => productData.setProductIsNew(true)}
                  inputRadioLabel="Produto novo"
                  checked={productData.productIsNew}
                />
                <CheckRadioInput
                  productStateChange={() => productData.setProductIsNew(false)}
                  inputRadioLabel="Produto usado"
                  checked={!productData.productIsNew}
                />
              </View>
            </View>

            <View
              style={{
                gap: 16,
                flex: 1
              }}
            >
              <Text font="bold" size="lg" color="600" text="Venda" />
              <Input.Root
                placeholder="Valor de produto"
                keyboardType="numeric"
                value={productData.productValue}
                onChangeText={productData.setProductValue}
              />

              <ProductCondition>
                <Text text="Aceita troca?" size="md" font="bold" color="700" />
                <Switch
                  switchEnabled={productData.acceptTrade}
                  onPress={() =>
                    productData.setAcceptTrade(!productData.acceptTrade)
                  }
                />
              </ProductCondition>

              <View style={{ width: '100%', gap: 12, marginBottom: 25 }}>
                <Text
                  text="Meios de pagamento:"
                  size="md"
                  font="bold"
                  color="700"
                />
                <CheckboxInput
                  checkboxInputLabel="Boleto"
                  productAcceptPayments={() =>
                    updateProductsPayments({
                      paymentType: 'Boleto',
                      productAcceptPayments: productData.productAcceptPayments,
                      setProductAcceptPayments:
                        productData.setProductAcceptPayments
                    })
                  }
                  checked={productPaymentChecked({
                    paymentType: 'Boleto',
                    productAcceptPayments: productData.productAcceptPayments
                  })}
                />
                <CheckboxInput
                  checkboxInputLabel="Pix"
                  productAcceptPayments={() =>
                    updateProductsPayments({
                      paymentType: 'pix',
                      productAcceptPayments: productData.productAcceptPayments,
                      setProductAcceptPayments:
                        productData.setProductAcceptPayments
                    })
                  }
                  checked={productPaymentChecked({
                    paymentType: 'pix',
                    productAcceptPayments: productData.productAcceptPayments
                  })}
                />
                <CheckboxInput
                  checkboxInputLabel="Dinheiro"
                  productAcceptPayments={() =>
                    updateProductsPayments({
                      paymentType: 'cash',
                      productAcceptPayments: productData.productAcceptPayments,
                      setProductAcceptPayments:
                        productData.setProductAcceptPayments
                    })
                  }
                  checked={productPaymentChecked({
                    paymentType: 'cash',
                    productAcceptPayments: productData.productAcceptPayments
                  })}
                />
                <CheckboxInput
                  checkboxInputLabel="Cartão de Crédito"
                  productAcceptPayments={() =>
                    updateProductsPayments({
                      paymentType: 'card',
                      productAcceptPayments: productData.productAcceptPayments,
                      setProductAcceptPayments:
                        productData.setProductAcceptPayments
                    })
                  }
                  checked={productPaymentChecked({
                    paymentType: 'card',
                    productAcceptPayments: productData.productAcceptPayments
                  })}
                />
                <CheckboxInput
                  checkboxInputLabel="Depósito Bancário"
                  productAcceptPayments={() =>
                    updateProductsPayments({
                      paymentType: 'deposit',
                      productAcceptPayments: productData.productAcceptPayments,
                      setProductAcceptPayments:
                        productData.setProductAcceptPayments
                    })
                  }
                  checked={productPaymentChecked({
                    paymentType: 'deposit',
                    productAcceptPayments: productData.productAcceptPayments
                  })}
                />
              </View>
            </View>
          </View>
          <Styled.ButtonSection>
            <Button.Root type="PRIMARY">
              <Text color="600" font="bold" size="md" text="Cancelar" />
            </Button.Root>
            <Button.Root
              type="SECONDARY"
              onPress={() => handleAdUpdate(productId, product)}
            >
              <Text color="100" font="bold" size="md" text="Avançar" />
            </Button.Root>
          </Styled.ButtonSection>
        </ScrollView>
      ) : (
        <ActivityIndicator color={theme.colors.blue.dark} />
      )}
    </Styled.Container>
  )
}
