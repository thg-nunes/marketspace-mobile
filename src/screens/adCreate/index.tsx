import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { ProductCondition } from '@screens/home/styled'

import { handleAdPreview } from '@hooks/adCreate'

import { Text } from '@components/text'
import { Input } from '@components/input'
import { Button } from '@components/button'
import { Switch } from '@components/switch'
import { ProductImages } from './productsImage'
import { ScreenHeader } from '@components/screensHeader'
import { CheckRadioInput } from '@components/radioCheckbox'
import { PaymentTypes } from '@components/paymentTypes'

import * as Styled from './styled'

export const AdCreate = () => {
  const stack = useNavigation<NativeStackRoutesScreenProps>()

  const [images, setImages] = useState<string[]>([])
  const [acceptTrade, setAcceptTrade] = useState(false)
  const [productIsNew, setProductIsNew] = useState(true)
  const [productValue, setProductValue] = useState('')
  const [productTitle, setProductTitle] = useState('')
  const [productAcceptPayments, setProductAcceptPayments] = useState<string[]>(
    []
  )
  const [productDescription, setProductDescription] = useState('')
  const product = {
    name: productTitle,
    is_new: productIsNew,
    price: parseInt(productValue),
    accept_trade: acceptTrade,
    description: productDescription,
    payment_methods: productAcceptPayments
  }

  return (
    <Styled.Container>
      <ScreenHeader.Root mt={20} mb={20} pr={24} pl={24}>
        <ScreenHeader.Icon onPress={stack.goBack}>
          <Styled.GobackIcon />
        </ScreenHeader.Icon>
        <ScreenHeader.Text text="Criar anúncio" />
      </ScreenHeader.Root>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{ gap: 16 }}>
            <View style={{ gap: 4 }}>
              <Text text="Imagens" color="700" font="bold" size="lg" />
              <Text
                text="Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!"
                color="700"
                font="regular"
                size="md"
              />
            </View>

            <ProductImages images={images} setImages={setImages} />
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
              marginTop: 16,
              marginBottom: 32,
              flex: 1
            }}
          >
            <Input.Root
              placeholder="Descrição do produto"
              numberOfLines={10}
              inputHeight={136}
              multiline
              maxLength={500}
              style={{
                height: '100%',
                textAlignVertical: 'top'
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
              flex: 1,
              marginBottom: 25
            }}
          >
            <Text font="bold" size="lg" color="600" text="Venda" />
            <Input.Root
              placeholder="Valor do produto"
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

            <PaymentTypes.CheckBox
              productAcceptPayments={productAcceptPayments}
              setProductAcceptPayments={setProductAcceptPayments}
            />
          </View>
        </View>
        <Styled.ButtonSection>
          <Button.Root type="PRIMARY" onPress={stack.goBack}>
            <Text color="600" font="bold" size="md" text="Cancelar" />
          </Button.Root>
          <Button.Root
            type="SECONDARY"
            onPress={() =>
              handleAdPreview(images, productAcceptPayments, stack, product)
            }
          >
            <Text color="100" font="bold" size="md" text="Avançar" />
          </Button.Root>
        </Styled.ButtonSection>
      </ScrollView>
    </Styled.Container>
  )
}
