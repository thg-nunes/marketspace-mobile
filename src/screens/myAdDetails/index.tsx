import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import { Tag } from '@components/tag'
import { Text } from '@components/text'
import { UserPhoto } from '@components/userPhoto'

import * as Styled from './styled'
import { apiServices } from '@services/api'
import { AdProductDetailsDTO } from '@dtos/product'
import { api } from '@services/axios'
import { courselFlatlistImage } from '@hooks/myAdDetails'
import { ButtonsActionSection } from './buttonsActionSection'
import { IconAndLabel } from '@components/paymentTypes/iconAndLabel'
import { AdImageCoursel } from './adImageCoursel'

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

              <IconAndLabel payment_methods={productDetails.payment_methods} />

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
