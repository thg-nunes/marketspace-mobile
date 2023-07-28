import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Modal, Pressable } from 'react-native'
import { X } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { BottomTabRoutesScreenProps } from '@routes/bottomTabs.routes'
import {
  UseHandleApplyFilters,
  handleApplyFilters,
  useFetchUserStorageData,
  useFetcheAppProducts
} from '@hooks/home'
import { AdProductByFilterDTO } from '@dtos/product'

import { Text } from '@components/text'
import { Button } from '@components/button'
import { Switch } from '@components/switch'
import { CheckboxInput } from '@components/checkBox'
import { Tag as TagConponent } from '@components/tag'

import * as Styled from './styled'
import {
  productPaymentChecked,
  updateProductsPayments
} from '@utils/screens/adCreate'
import { Header } from './header'
import { UserActiveAdsInfo } from './userAdsInfo'
import { FilterInputSection } from './fiilterInputSection'
import { ProductsList } from './productsList'
import { CheckBoxAndLaybel } from '@components/paymentTypes/checkBoxAndLabel'

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
        <Modal animationType="slide" transparent>
          <Styled.FilterContainer>
            <Styled.FiltersModalBackGround />
            <Styled.FiltersContent>
              <Styled.Divider />
              <Styled.FilterHeader>
                <Text
                  text="Filtrar anúncios"
                  size="xl"
                  font="bold"
                  color="700"
                />
                <Pressable onPress={() => setFiltersVisible(false)}>
                  <X size={24} color={appTheme.colors.gray[400]} />
                </Pressable>
              </Styled.FilterHeader>

              <Styled.ProductCondition>
                <Text text="Condição" size="md" font="bold" color="700" />
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TagConponent.Root
                    onPress={() => setProductIsNew('new')}
                    hasTagIcon={productIsNew === 'new'}
                    size="lg"
                    type={productIsNew === 'new' ? 'BLUE' : 'GRAY.300'}
                  >
                    <Text
                      text="NOVO"
                      color={productIsNew === 'new' ? '100' : '500'}
                      font="bold"
                      size="sm"
                    />
                    {productIsNew === 'new' && (
                      <TagConponent.Icon onPress={() => setProductIsNew('')} />
                    )}
                  </TagConponent.Root>

                  <TagConponent.Root
                    onPress={() => setProductIsNew('used')}
                    hasTagIcon={productIsNew === 'used'}
                    size="lg"
                    type={productIsNew === 'used' ? 'BLUE' : 'GRAY.300'}
                  >
                    <Text
                      text="USADO"
                      color={productIsNew === 'used' ? '100' : '500'}
                      font="bold"
                      size="sm"
                    />
                    {productIsNew === 'used' && (
                      <TagConponent.Icon onPress={() => setProductIsNew('')} />
                    )}
                  </TagConponent.Root>
                </View>
              </Styled.ProductCondition>

              <Styled.ProductCondition>
                <Text text="Aceita troca?" size="md" font="bold" color="700" />
                <Switch
                  switchEnabled={switchEnabled}
                  onPress={() => setSwitchEnabled(!switchEnabled)}
                />
              </Styled.ProductCondition>

              <CheckBoxAndLaybel
                productAcceptPayments={productAcceptPayments}
                setProductAcceptPayments={setProductAcceptPayments}
              />

              <View style={{ gap: 12, flexDirection: 'row' }}>
                <Button.Root
                  type="PRIMARY"
                  onPress={() => {
                    setProductAcceptPayments([])
                    setProductIsNew('')
                    setFiltersVisible(false)
                    setSwitchEnabled(false)
                    setIsProductsByFilters(false)
                  }}
                >
                  <Text
                    text="Resetar filtros"
                    color="600"
                    font="bold"
                    size="md"
                  />
                </Button.Root>
                <Button.Root
                  type="SECONDARY"
                  onPress={() => {
                    handleApplyFilters(filters)
                    setFiltersVisible(false)
                    setIsProductsByFilters(true)
                  }}
                >
                  <Text
                    text="Aplicar filtros"
                    color="100"
                    font="bold"
                    size="md"
                  />
                </Button.Root>
              </View>
            </Styled.FiltersContent>
          </Styled.FilterContainer>
        </Modal>
      )}
    </Styled.Container>
  )
}
