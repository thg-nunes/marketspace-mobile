import { useState } from 'react'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import { Tag } from '@components/tag'
import { Text } from '@components/text'
import { UserPhoto } from '@components/userPhoto'

import * as Styled from './styled'
import { api } from '@services/axios'
import {
  courselFlatlistImage,
  useFetchProductDetails
} from '@hooks/myAdDetails'
import { ButtonsActionSection } from './buttonsActionSection'
import { PaymentTypes } from '@components/paymentTypes'
import { AdImageCoursel } from './adImageCoursel'

export const MyAdDetails = () => {
  const { params } = useRoute()
  const { id } = params as { id: string }
  const stack = useNavigation<NativeStackRoutesScreenProps>()
  const [activeImage, setActiveImage] = useState(0)
  const viewabilityConfigCallbackPairs = courselFlatlistImage(setActiveImage)
  const { productDetails } = useFetchProductDetails(id)
  const appTheme = useTheme()

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
          <AdImageCoursel
            activeImage={activeImage}
            productDetails={productDetails}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
          />

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

              <PaymentTypes.Icons
                payment_methods={productDetails.payment_methods}
              />

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
