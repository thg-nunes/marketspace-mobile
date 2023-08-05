import * as Linking from 'expo-linking'
import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { apiServices } from '@services/api'
import { AdProductDetailsDTO } from '@dtos/product'
import { myToast } from '@utils/toast'
import { AppError } from '@utils/screens/appError'
import { theme } from '../theme'

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
        try {
          const response = await apiServices.fetchProductDetails(id)
          setProductDetails(response)
        } catch (error) {
          if (error instanceof AppError) {
            myToast({
              message: error.message,
              background: theme.colors.red.light
            })
          }
        }
      }

      fetchProductDetailsById(product_id)
    }, [product_id])
  )

  return { productDetails }
}

export { handleCallUser, useProductDetails }
