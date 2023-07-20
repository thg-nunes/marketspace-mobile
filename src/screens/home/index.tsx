import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, TextInput, Modal, Pressable, FlatList } from 'react-native'
import {
  ArrowRight,
  MagnifyingGlass,
  Plus,
  Sliders,
  Tag,
  X
} from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { api } from '@services/axios'
import { apiServices } from '@services/api'
import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { useFetchUserStorageData, useFetcheAppProducts } from '@hooks/home'
import { AdProductByFilterDTO } from '@dtos/product'

import { Card } from '@components/card'
import { Text } from '@components/text'
import { Button } from '@components/button'
import { Switch } from '@components/switch'
import { UserInfo } from '@components/userInfo'
import { CheckboxInput } from '@components/checkBox'
import { Tag as TagConponent } from '@components/tag'

import * as Styled from './styled'
import {
  productPaymentChecked,
  updateProductsPayments
} from '@utils/screens/adCreate'

export const Home = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()
  const [adQueryText, setAdQueryText] = useState('')
  const [productIsNew, setProductIsNew] = useState<'new' | 'used' | ''>('')
  const [switchEnabled, setSwitchEnabled] = useState(false)
  const [productAcceptPayments, setProductAcceptPayments] = useState<string[]>(
    []
  )
  const [filtersVisible, setFiltersVisible] = useState(false)
  const { userData, userProducts } = useFetchUserStorageData()
  const appProducts = useFetcheAppProducts()
  const [isProductsByFilters, setIsProductsByFilters] = useState(false)
  const [productsByFilters, setProductsByFilters] = useState<
    AdProductByFilterDTO[]
  >([])

  function handleProductDetails(productId: string) {
    navigate('adDetails', { id: productId })
  }

  function handleAdCreate() {
    navigate('adCreate')
  }

  async function handleApplyFilters(): Promise<void> {
    setIsProductsByFilters(true)
    const is_new = productIsNew === 'new'
    const accept_trade = switchEnabled

    const response = await apiServices.fetchProductsByFilter({
      is_new,
      accept_trade,
      payment_methods: productAcceptPayments,
      query: adQueryText
    })

    setProductsByFilters(response)
  }

  return (
    <Styled.Container>
      <View style={{ marginTop: 20 }}>
        <Styled.HomeHeader>
          <UserInfo
            photSize="md"
            uri={`${api.defaults.baseURL}/images/${userData.avatar}`}
          >
            <View>
              <Text text="Boas Vindas," size="lg" font="regular" color="700" />
              <Text text={userData.name} size="lg" font="bold" color="700" />
            </View>
          </UserInfo>

          <View>
            <Button.Root type="SECONDARY" onPress={handleAdCreate}>
              <Button.Icon
                Icon={Plus}
                iconProps={{
                  size: 16,
                  color: colors.gray[100]
                }}
              />
              <Text text="Criar anúncio" color="100" font="bold" size="md" />
            </Button.Root>
          </View>
        </Styled.HomeHeader>

        <Styled.ProductsAdsContainer>
          <Text
            text="Seus produtos anunciados para venda"
            size="md"
            font="regular"
            color="500"
          />

          <Styled.ProductsAdsContent>
            <Styled.ProductsAdsBackground />
            <Styled.ActiveProducts>
              <Tag size={22} color={colors.blue.dark} />
              <View>
                <Text text={userProducts} size="lg" font="bold" color="700" />
                <Text
                  text="anúncios ativos"
                  size="lg"
                  font="regular"
                  color="700"
                />
              </View>
            </Styled.ActiveProducts>

            <Styled.LinkContainer>
              <Styled.LinkText>Meus anúncios</Styled.LinkText>
              <ArrowRight size={16} />
            </Styled.LinkContainer>
          </Styled.ProductsAdsContent>

          <View style={{ gap: 12 }}>
            <Text
              text="Compre produtos variados"
              size="md"
              font="regular"
              color="500"
            />

            <Styled.FilterInputSection>
              <TextInput
                placeholder="Buscar anúncio"
                onChangeText={setAdQueryText}
                style={{ flex: 1, color: colors.gray[700], height: 21 }}
                placeholderTextColor={colors.gray[400]}
              />
              <Styled.SearchAdIcon onPress={handleApplyFilters}>
                <MagnifyingGlass size={20} color={colors.gray[600]} />
              </Styled.SearchAdIcon>
              <Pressable onPress={() => setFiltersVisible(true)}>
                <Sliders size={20} color={colors.gray[600]} />
              </Pressable>
            </Styled.FilterInputSection>
          </View>
        </Styled.ProductsAdsContainer>
      </View>

      {!isProductsByFilters && (
        <FlatList
          data={appProducts}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleProductDetails(item.id)}>
              <Card
                productActive={item.is_active}
                productType={item.is_new ? 'NEW' : 'USED'}
                productData={item}
              />
            </Pressable>
          )}
        />
      )}

      {isProductsByFilters && (
        <FlatList
          data={productsByFilters}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleProductDetails(item.id)}>
              <Card
                productActive
                productType={item.is_new ? 'NEW' : 'USED'}
                productData={item}
              />
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                color="500"
                font="bold"
                size="md"
                text="Sem produtos para a combinação de filtros feita."
              />
            </View>
          )}
        />
      )}

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
                  <X size={24} color={colors.gray[400]} />
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

              <View style={{ width: '100%', gap: 12 }}>
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
                      paymentType: 'boleto',
                      productAcceptPayments,
                      setProductAcceptPayments
                    })
                  }
                  checked={productPaymentChecked({
                    paymentType: 'boleto',
                    productAcceptPayments
                  })}
                />
                <CheckboxInput
                  checkboxInputLabel="Pix"
                  productAcceptPayments={() =>
                    updateProductsPayments({
                      paymentType: 'pix',
                      productAcceptPayments,
                      setProductAcceptPayments
                    })
                  }
                  checked={productPaymentChecked({
                    paymentType: 'pix',
                    productAcceptPayments
                  })}
                />
                <CheckboxInput
                  checkboxInputLabel="Dinheiro"
                  productAcceptPayments={() =>
                    updateProductsPayments({
                      paymentType: 'cash',
                      productAcceptPayments,
                      setProductAcceptPayments
                    })
                  }
                  checked={productPaymentChecked({
                    paymentType: 'cash',
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

              <View style={{ gap: 12, flexDirection: 'row' }}>
                <Button.Root
                  type="PRIMARY"
                  onPress={() => {
                    setProductAcceptPayments([])
                    setProductIsNew('')
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
                <Button.Root type="SECONDARY" onPress={handleApplyFilters}>
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
