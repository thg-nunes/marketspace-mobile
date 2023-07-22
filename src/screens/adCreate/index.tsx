import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { FlatList, Pressable, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import {
  productPaymentChecked,
  updateProductsPayments
} from '@utils/screens/adCreate'

import { Text } from '@components/text'
import { Input } from '@components/input'
import { Button } from '@components/button'
import { Switch } from '@components/switch'
import { CheckboxInput } from '@components/checkBox'
import { CheckRadioInput } from '@components/radioCheckbox'
import { ProductCondition } from '@screens/home/styled'

import * as Styled from './styled'
import { myToast } from '@utils/toast'
import { theme } from '../../theme'

export const AdCreate = () => {
  const { navigate, goBack } = useNavigation<NativeStackRoutesScreenProps>()

  const [images, setImages] = useState<string[]>([])
  const [acceptTrade, setAcceptTrade] = useState(false)
  const [productIsNew, setProductIsNew] = useState(true)
  const [productValue, setProductValue] = useState('')
  const [productTitle, setProductTitle] = useState('')
  const [productAcceptPayments, setProductAcceptPayments] = useState<string[]>(
    []
  )
  const [productDescription, setProductDescription] = useState('')

  async function handleProductPhotoSelect() {
    if (images.length === 3) {
      // exibir alerta com mensagem de aviso de quantidade de imgs atingida
      return
    }

    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 3,
      quality: 1,
      aspect: [4, 4]
    })

    if (canceled) return

    const imagesUri = assets.map((image) => image.uri)
    setImages((prevState) => [...prevState, ...imagesUri])
  }

  function handleAdPreview() {
    if (images.length === 0) {
      myToast({
        message: 'Pelo menos 1 foto do produto é necessária.',
        background: theme.colors.red.light
      })
      return
    }

    if (productAcceptPayments.length === 0) {
      myToast({
        message: 'Pelo menos 1 meio de pagamento é necessário.',
        background: theme.colors.red.light
      })
      return
    }

    navigate('adPreview', {
      images,
      product: {
        name: productTitle,
        is_new: productIsNew,
        price: parseInt(productValue),
        accept_trade: acceptTrade,
        description: productDescription,
        payment_methods: productAcceptPayments
      }
    })
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
          text="Criar anúncio"
          style={{ flex: 1, textAlign: 'center' }}
        />
      </Styled.Header>

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
              {images.length > 0 && (
                <FlatList
                  data={images}
                  style={{
                    maxWidth: images.length * 100
                  }}
                  contentContainerStyle={{ gap: 8, paddingRight: 15 }}
                  renderItem={({ item }) => (
                    <Styled.ProductPhotoSelected
                      source={{
                        uri: item
                      }}
                    />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              )}
              {images.length < 3 && (
                <Styled.ProductPhotoSelector
                  activeOpacity={0.8}
                  onPress={handleProductPhotoSelect}
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
              placeholder="Título do anúncio"
              onChangeText={setProductTitle}
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
              onChangeText={setProductDescription}
            />

            <View style={{ flexDirection: 'row', gap: 20 }}>
              <CheckRadioInput
                productStateChange={() => setProductIsNew(true)}
                inputRadioLabel="Produto novo"
                checked={productIsNew}
              />
              <CheckRadioInput
                productStateChange={() => setProductIsNew(false)}
                inputRadioLabel="Produto usado"
                checked={!productIsNew}
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
              onChangeText={setProductValue}
            />

            <ProductCondition>
              <Text text="Aceita troca?" size="md" font="bold" color="700" />
              <Switch
                switchEnabled={acceptTrade}
                onPress={() => setAcceptTrade(!acceptTrade)}
              />
            </ProductCondition>

            <View style={{ width: '100%', gap: 12, marginBottom: 25 }}>
              <Text
                text="Meios de pagamento aceitos"
                size="md"
                font="bold"
                color="700"
              />
              <CheckboxInput
                checkboxInputLabel="Boleto"
                productAcceptPayments={() =>
                  updateProductsPayments({
                    paymentType: 'Boleto',
                    productAcceptPayments,
                    setProductAcceptPayments
                  })
                }
                checked={productPaymentChecked({
                  paymentType: 'Boleto',
                  productAcceptPayments
                })}
              />

              <CheckboxInput
                checkboxInputLabel="Pix"
                productAcceptPayments={() =>
                  updateProductsPayments({
                    paymentType: 'Pix',
                    productAcceptPayments,
                    setProductAcceptPayments
                  })
                }
                checked={productPaymentChecked({
                  paymentType: 'Pix',
                  productAcceptPayments
                })}
              />
              <CheckboxInput
                checkboxInputLabel="Dinheiro"
                productAcceptPayments={() =>
                  updateProductsPayments({
                    paymentType: 'Cash',
                    productAcceptPayments,
                    setProductAcceptPayments
                  })
                }
                checked={productPaymentChecked({
                  paymentType: 'Cash',
                  productAcceptPayments
                })}
              />
              <CheckboxInput
                checkboxInputLabel="Cartão de Crédito"
                productAcceptPayments={() =>
                  updateProductsPayments({
                    paymentType: 'card',
                    productAcceptPayments,
                    setProductAcceptPayments
                  })
                }
                checked={productPaymentChecked({
                  paymentType: 'card',
                  productAcceptPayments
                })}
              />
              <CheckboxInput
                checkboxInputLabel="Depósito Bancário"
                productAcceptPayments={() =>
                  updateProductsPayments({
                    paymentType: 'deposit',
                    productAcceptPayments,
                    setProductAcceptPayments
                  })
                }
                checked={productPaymentChecked({
                  paymentType: 'deposit',
                  productAcceptPayments
                })}
              />
            </View>
          </View>
        </View>
        <Styled.ButtonSection>
          <Button.Root type="PRIMARY">
            <Text color="600" font="bold" size="md" text="Cancelar" />
          </Button.Root>
          <Button.Root type="SECONDARY" onPress={handleAdPreview}>
            <Text color="100" font="bold" size="md" text="Avançar" />
          </Button.Root>
        </Styled.ButtonSection>
      </ScrollView>
    </Styled.Container>
  )
}
