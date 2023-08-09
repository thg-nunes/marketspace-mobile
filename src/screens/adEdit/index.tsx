import { ActivityIndicator, ScrollView, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { BottomTabRoutesScreenProps } from '@routes/bottomTabs.routes'
import { fetchProductDetails, handleAdUpdate } from '@hooks/adEdit'
import { ProductCondition } from '@screens/home/styled'

import { Text } from '@components/text'
import { Input } from '@components/input'
import { Button } from '@components/button'
import { Switch } from '@components/switch'
import { SelectedImages } from './selectedImages'
import { PaymentTypes } from '@components/paymentTypes'
import { CheckRadioInput } from '@components/radioCheckbox'
import { ScreenHeader } from '@components/screensHeader'

import { theme } from '../../theme'
import * as Styled from './styled'

export const AdEdit = () => {
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const bottomTab = useNavigation<BottomTabRoutesScreenProps>()
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
      <ScreenHeader.Root mt={20} mb={20} pr={24} pl={24}>
        <ScreenHeader.Icon onPress={goBack}>
          <Styled.GobackIcon />
        </ScreenHeader.Icon>
        <ScreenHeader.Text text="Editar anúncio" />
      </ScreenHeader.Root>

      {productData.product.id ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 24 }}>
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

              <SelectedImages productData={productData} />
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
                marginTop: 16,
                marginBottom: 32,
                flex: 1
              }}
            >
              <Input.Root
                placeholder="Descrição do produto"
                numberOfLines={10}
                multiline
                maxLength={400}
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
                flex: 1,
                marginBottom: 25
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

              <PaymentTypes.CheckBox
                productAcceptPayments={productData.productAcceptPayments}
                setProductAcceptPayments={productData.setProductAcceptPayments}
              />
            </View>
          </View>
          <Styled.ButtonSection>
            <Button.Root type="PRIMARY" onPress={goBack}>
              <Text color="600" font="bold" size="md" text="Cancelar" />
            </Button.Root>
            <Button.Root
              type="SECONDARY"
              onPress={() => {
                handleAdUpdate(productId, product)
                setTimeout(() => bottomTab.navigate('myAds'), 1000)
              }}
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
