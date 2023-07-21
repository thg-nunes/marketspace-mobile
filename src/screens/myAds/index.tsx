import { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable } from 'react-native'
import { Plus } from 'phosphor-react-native'
import { useTheme } from 'styled-components'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { userServices } from '@services/api/user'
import { AdProductDTO } from '@dtos/product'

import { Text } from '@components/text'
import { Card } from '@components/card'
import { Select } from '@components/select'

import * as Styled from './styled'

export const MyAds = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()
  const [adStatus, setAdStatus] = useState('Todos')
  const [isFetchingProducts, setIsFetchingProducts] = useState(false)

  const [selectIsOpen, setSelectIsOpen] = useState(false)
  const [userProducts, setUserProducts] = useState<AdProductDTO[]>([])

  function handleMyAdDetails(id: string) {
    navigate('myAdDetails', { id })
  }

  function handleAdCreate() {
    navigate('adCreate')
  }

  async function handleFetchUserAds(adStatus: string): Promise<void> {
    try {
      setIsFetchingProducts(true)
      const response = await userServices.fetchMyProducts()

      if (adStatus === 'Todos') {
        const allProducts = response.filter((product) => product)

        return setUserProducts(allProducts)
      }

      if (adStatus === 'Ativos') {
        const activeProducts = response.filter((product) => product.is_active)
        return setUserProducts(activeProducts)
      }

      if (adStatus === 'Inativos') {
        const inactiveProducts = response.filter(
          (product) => !product.is_active
        )
        return setUserProducts(inactiveProducts)
      }
    } catch (error) {
    } finally {
      setIsFetchingProducts(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchUserAds(adStatus)
    }, [adStatus])
  )

  return (
    <Styled.Container>
      <Styled.Header>
        <Text
          text="Meus anúncios"
          color="700"
          font="bold"
          size="xl"
          style={{ flex: 1, textAlign: 'center' }}
        />
        <Pressable onPress={handleAdCreate}>
          <Plus size={24} color={colors.gray[700]} />
        </Pressable>
      </Styled.Header>

      <Styled.MyAdsQuantity>
        <Text text={`9 anúncios`} color="600" font="regular" size="md" />
        <Select
          items={['Todos', 'Ativos', 'Inativos']}
          isOpen={selectIsOpen}
          onPress={() => setSelectIsOpen(!selectIsOpen)}
          setAdStatus={setAdStatus}
          adStatus={adStatus}
        />
      </Styled.MyAdsQuantity>

      {isFetchingProducts ? (
        <ActivityIndicator color={colors.blue.light} />
      ) : (
        <FlatList
          data={userProducts}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleMyAdDetails(item.id)}>
              <Card
                productData={item}
                showUserPhoto={false}
                productType={item.is_new ? 'NEW' : 'USED'}
                productActive={item.is_active}
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </Styled.Container>
  )
}
