import { useState } from 'react'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, ScrollView, View } from 'react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { AdImageCoursel } from '@screens/myAdDetails/adImageCoursel'
import { api } from '@services/axios'

import { useProductDetails } from '@hooks/adDetails'
import { courselFlatlistImage } from '@hooks/myAdDetails'

import { Tag } from '@components/tag'
import { Text } from '@components/text'
import { UserInfo } from '@components/userInfo'
import { ContactSection } from './contactSection'
import { PaymentTypes } from '@components/paymentTypes'
import { ScreenHeader } from '@components/screensHeader'

import * as Styled from './styled'

export const AdDetails = () => {
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const [activeImage, setActiveImage] = useState(0)
  const appTheme = useTheme()
  const { params } = useRoute()
  const viewabilityConfigCallbackPairs = courselFlatlistImage(setActiveImage)
  const { id } = params as { id: string }
  const { productDetails } = useProductDetails(id)

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

              <PaymentTypes.Icons
                pl={0}
                payment_methods={productDetails.payment_methods}
              />
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
