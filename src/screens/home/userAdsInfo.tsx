import { Pressable, View } from 'react-native'
import { ArrowRight, Tag } from 'phosphor-react-native'
import { DefaultTheme } from 'styled-components/native'

import { BottomTabRoutesScreenProps } from '@routes/bottomTabs.routes'

import { Text } from '@components/text'

import * as Styled from './styled'

type UserAdsInfoProps = {
  appTheme: DefaultTheme
  userActiveProductsQuantity: string
  bottomNavigation: BottomTabRoutesScreenProps
}

export const UserActiveAdsInfo = ({
  appTheme,
  userActiveProductsQuantity,
  bottomNavigation
}: UserAdsInfoProps) => {
  return (
    <Styled.ProductsAdsContent>
      <Styled.ProductsAdsBackground />
      <Styled.ActiveProducts>
        <Tag size={22} color={appTheme.colors.blue.dark} />
        <View>
          <Text
            text={userActiveProductsQuantity}
            size="lg"
            font="bold"
            color="700"
          />
          <Text text="anúncios ativos" size="lg" font="regular" color="700" />
        </View>
      </Styled.ActiveProducts>

      <Styled.LinkContainer>
        <Pressable onPress={() => bottomNavigation.navigate('myAds')}>
          <Styled.LinkText>Meus anúncios</Styled.LinkText>
        </Pressable>
        <ArrowRight size={16} />
      </Styled.LinkContainer>
    </Styled.ProductsAdsContent>
  )
}
