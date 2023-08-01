import * as Linking from 'expo-linking'
import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { apiServices } from '@services/api'
import { AdProductDetailsDTO } from '@dtos/product'

function handleCallUser(user_tel: number) {
  Linking.openURL(`https://wa.me/55${user_tel}`)
}

const useProductDetails = (product_id: string) => {
  const [productDetails, setProductDetails] = useState<AdProductDetailsDTO>(
    {} as AdProductDetailsDTO
  )

  useFocusEffect(
    useCallback(() => {
      async function fetchProductDetailsById(id: string) {
        const response = await apiServices.fetchProductDetails(id)
        setProductDetails(response)
      }

      fetchProductDetailsById(product_id)
    }, [product_id])
  )

  return { productDetails }
}

export { handleCallUser, useProductDetails }
