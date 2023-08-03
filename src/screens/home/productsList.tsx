import { FlatList, Pressable, View } from 'react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { CardPropsAdapter } from '@dtos/card'
import { AdProductByFilterDTO } from '@dtos/product'

import { Card } from '@components/card'
import { Text } from '@components/text'

type ProductsListProps = {
  isProductsByFilters: boolean
  appProducts?: CardPropsAdapter[]
  productsByFilters?: AdProductByFilterDTO[]
  stackNavigation: NativeStackRoutesScreenProps
}

export const ProductsList = ({
  isProductsByFilters,
  appProducts = [],
  productsByFilters = [],
  stackNavigation
}: ProductsListProps) => {
  function handleProductDetails(productId: string) {
    stackNavigation.navigate('adDetails', { id: productId })
  }

  if (isProductsByFilters) {
    return (
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
    )
  }

  return (
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
  )
}
