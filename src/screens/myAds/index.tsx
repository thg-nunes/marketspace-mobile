import { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable } from 'react-native'
import { Plus } from 'phosphor-react-native'
import { useTheme } from 'styled-components'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { AdProductDTO } from '@dtos/product'
import { handleFetchUserAds } from '@hooks/myAds'

import { Text } from '@components/text'
import { Card } from '@components/card'
import { Select } from '@components/select'
import { ScreenHeader } from '@components/screensHeader'

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

  useFocusEffect(
    useCallback(() => {
      handleFetchUserAds(adStatus, setIsFetchingProducts, setUserProducts)
    }, [adStatus])
  )

  return (
    <Styled.Container>
      <ScreenHeader.Root mb={32}>
        <ScreenHeader.Text text="Meus anúncios" />
        <ScreenHeader.Icon onPress={handleAdCreate}>
          <Plus size={24} color={colors.gray[700]} />
        </ScreenHeader.Icon>
      </ScreenHeader.Root>

      <Styled.MyAdsQuantity>
        <Text
          text={`${userProducts.length} anúncios`}
          color="600"
          font="regular"
          size="md"
        />
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
            flexDirection: 'column'
          }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <Pressable
              style={{ width: '47%', marginBottom: 24 }}
              onPress={() => handleMyAdDetails(item.id)}
            >
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
