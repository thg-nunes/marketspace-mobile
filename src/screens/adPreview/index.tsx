import { useState } from 'react'
import { ScrollView } from 'react-native'
import { useTheme } from 'styled-components/native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View } from 'react-native'
import { ArrowLeft, Tag as TagIcon } from 'phosphor-react-native'

import { BottomTabRoutesScreenProps } from '@routes/bottomTabs.routes'
import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { ProductDTO } from '@dtos/product'
import { api } from '@services/axios'

import { handleAdCreate } from '@hooks/adPreview'
import { useFetchUserStorageData } from '@hooks/home'
import { courselFlatlistImage } from '@hooks/myAdDetails'

import { Text } from '@components/text'
import { Button } from '@components/button'
import {
  AdContent,
  Amount,
  AmountIndicator,
  RowCenterItems
} from '@screens/myAdDetails/styled'
import { Tag } from '@components/tag'
import { UserPhoto } from '@components/userPhoto'
import { PaymentsAcceptedByAd } from './paymentsAcceptedByAd'
import { ProductImagesCoursel } from './productImagesCoursel'

import * as Styled from './styled'

export const AdPreview = () => {
  const { colors } = useTheme()
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const bottomNavigation = useNavigation<BottomTabRoutesScreenProps>()
  const [activeImage, setActiveImage] = useState(0)
  const viewabilityConfigCallbackPairs = courselFlatlistImage(setActiveImage)
  const { params } = useRoute()
  const { images, product } = params as {
    images: string[]
    product: ProductDTO
  }
  const { userData } = useFetchUserStorageData()

  return (
    <Styled.Container>
      <View style={{ gap: 2, marginVertical: 16, marginHorizontal: 24 }}>
        <Text
          text="Pré visualização do anúncio"
          color="100"
          font="bold"
          size="lg"
          style={{ textAlign: 'center' }}
        />
        <Text
          text="É assim que seu produto vai aparecer!"
          color="100"
          font="regular"
          size="md"
          style={{ textAlign: 'center' }}
        />
      </View>

      <ProductImagesCoursel
        images={images}
        activeImage={activeImage}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
      />

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          paddingTop: 20,
          backgroundColor: colors.gray[200]
        }}
      >
        <View style={{ flex: 1 }}>
          <RowCenterItems>
            <UserPhoto.Root
              size="sm"
              uri={`${api.defaults.baseURL}/images/${userData.avatar}`}
            />
            <Text text={userData.name} color="700" font="regular" size="md" />
          </RowCenterItems>

          <AdContent>
            <Tag.Root type="GRAY.300" size="sm">
              <Text
                text={product.is_new ? 'NOVO' : 'USADO'}
                color="600"
                font="bold"
                size="xsm"
              />
            </Tag.Root>

            <View style={{ flexDirection: 'row' }}>
              <Text
                text={product.name}
                color="700"
                font="bold"
                size="xl"
                style={{ flex: 1 }}
              />
              <View style={{ flexDirection: 'row' }}>
                <AmountIndicator>R$</AmountIndicator>
                <Amount>{product.price}</Amount>
              </View>
            </View>
            <Text
              text={product.description}
              color="600"
              font="regular"
              size="md"
            />
          </AdContent>

          <RowCenterItems>
            <Text text="Aceita troca?" size="md" font="bold" color="600" />
            <Text
              text={product.accept_trade ? 'Sim' : 'Não'}
              size="md"
              font="regular"
              color="600"
            />
          </RowCenterItems>

          <PaymentsAcceptedByAd product={product} />
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          backgroundColor: colors.gray[100],
          paddingVertical: 16,
          paddingHorizontal: 24
        }}
      >
        <Button.Root
          type="PRIMARY"
          style={{ maxWidth: '100%' }}
          onPress={goBack}
        >
          <Button.Icon
            Icon={ArrowLeft}
            iconProps={{
              size: 16,
              color: colors.gray[700]
            }}
          />
          <Text color="600" font="bold" size="md" text="Voltar e editar" />
        </Button.Root>

        <Button.Root
          type="SECONDARY"
          style={{ maxWidth: '100%' }}
          onPress={() => handleAdCreate(product, images, bottomNavigation)}
        >
          <Button.Icon
            Icon={TagIcon}
            iconProps={{
              size: 16,
              color: colors.gray[100]
            }}
          />
          <Text color="100" font="bold" size="md" text="Publicar" />
        </Button.Root>
      </View>
    </Styled.Container>
  )
}
