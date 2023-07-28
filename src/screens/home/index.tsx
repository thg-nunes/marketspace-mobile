import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { useTheme } from 'styled-components/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { BottomTabRoutesScreenProps } from '@routes/bottomTabs.routes'
import {
  UseHandleApplyFilters,
  useFetchUserStorageData,
  useFetcheAppProducts
} from '@hooks/home'
import { AdProductByFilterDTO } from '@dtos/product'

import { Text } from '@components/text'
import { Header } from './header'
import { ProductsList } from './productsList'
import { FiltersModal } from './filtersModal'
import { UserActiveAdsInfo } from './userAdsInfo'
import { FilterInputSection } from './fiilterInputSection'

import * as Styled from './styled'

export const Home = () => {
  const appTheme = useTheme()
  const stackNavigation = useNavigation<NativeStackRoutesScreenProps>()
  const bottomNavigation = useNavigation<BottomTabRoutesScreenProps>()
  const [adQueryText, setAdQueryText] = useState('')
  const [productIsNew, setProductIsNew] = useState<'new' | 'used' | ''>('')
  const [switchEnabled, setSwitchEnabled] = useState(false)
  const [productAcceptPayments, setProductAcceptPayments] = useState<string[]>(
    []
  )
  const [filtersVisible, setFiltersVisible] = useState(false)
  const { userData, userActiveProductsQuantity } = useFetchUserStorageData()
  const appProducts = useFetcheAppProducts()
  const [isProductsByFilters, setIsProductsByFilters] = useState(false)
  const [productsByFilters, setProductsByFilters] = useState<
    AdProductByFilterDTO[]
  >([])

  const filters: UseHandleApplyFilters = {
    accept_trade: switchEnabled,
    is_new: productIsNew === 'new',
    query: adQueryText,
    payment_methods: productAcceptPayments,
    setIsProductsByFilters,
    setProductsByFilters
  }

  return (
    <Styled.Container>
      <View style={{ marginTop: 20 }}>
        <Header
          appTheme={appTheme}
          stackNavigation={stackNavigation}
          userData={userData}
        />

        <Styled.ProductsAdsContainer>
          <Text
            text="Seus produtos anunciados para venda"
            size="md"
            font="regular"
            color="500"
          />

          <UserActiveAdsInfo
            appTheme={appTheme}
            bottomNavigation={bottomNavigation}
            userActiveProductsQuantity={userActiveProductsQuantity}
          />

          <View style={{ gap: 12 }}>
            <Text
              text="Compre produtos variados"
              size="md"
              font="regular"
              color="500"
            />

            <FilterInputSection
              filters={filters}
              appTheme={appTheme}
              setAdQueryText={setAdQueryText}
              setFiltersVisible={setFiltersVisible}
            />
          </View>
        </Styled.ProductsAdsContainer>
      </View>

      <ProductsList
        appProducts={appProducts}
        stackNavigation={stackNavigation}
        productsByFilters={productsByFilters}
        isProductsByFilters={isProductsByFilters}
      />

      {filtersVisible && (
        <FiltersModal
          appTheme={appTheme}
          filters={filters}
          productAcceptPayments={productAcceptPayments}
          productIsNew={productIsNew}
          setFiltersVisible={setFiltersVisible}
          setIsProductsByFilters={setIsProductsByFilters}
          setProductAcceptPayments={setProductAcceptPayments}
          setProductIsNew={setProductIsNew}
          setSwitchEnabled={setSwitchEnabled}
          switchEnabled={switchEnabled}
        />
      )}
    </Styled.Container>
  )
}
