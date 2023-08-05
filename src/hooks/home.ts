import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { api } from '@services/axios'
import { apiServices } from '@services/api'

import { UserDTO } from '@dtos/user'
import { CardPropsAdapter } from '@dtos/card'
import { myToast } from '@utils/toast'
import { AppError } from '@utils/screens/appError'
import { userDataFetch } from '@utils/storage/user'
import { theme } from '../theme'

export type UseHandleApplyFilters = {
  setIsProductsByFilters: (value: boolean) => void
  setProductsByFilters: (value: CardPropsAdapter[]) => void
  is_new: boolean
  accept_trade: boolean
  query: string
  payment_methods: string[]
}

const useFetchUserStorageData = () => {
  const [userData, setUserData] = useState<UserDTO>({} as UserDTO)
  const [userActiveProductsQuantity, setUserActiveProductsQuantity] =
    useState('')

  async function fetchUserStorageData() {
    const userData = await userDataFetch()
    setUserData(userData)
  }

  async function fetcheUserProducts() {
    const response = await api.get<[]>('/users/products')
    setUserActiveProductsQuantity(String(response.data.length))
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserStorageData()
      fetcheUserProducts()
    }, [])
  )

  return { userData, userActiveProductsQuantity }
}

const useFetcheAppProducts = (): CardPropsAdapter[] => {
  const [appProducts, setAppProducts] = useState<CardPropsAdapter[]>([])

  useEffect(() => {
    async function fetcheAppProducts() {
      try {
        const response = await apiServices.fetchProducts()
        setAppProducts(response)
      } catch (error) {
        if (error instanceof AppError) {
          myToast({
            message: error.message,
            background: theme.colors.red.light
          })
        }
      }
    }
    fetcheAppProducts()
  }, [])

  return appProducts
}

async function handleApplyFilters(props: UseHandleApplyFilters): Promise<void> {
  props.setIsProductsByFilters(true)
  const response = await apiServices.fetchProductsByFilter({
    is_new: props.is_new,
    accept_trade: props.accept_trade,
    payment_methods: props.payment_methods,
    query: props.query
  })

  props.setProductsByFilters(response)
}

export { useFetchUserStorageData, useFetcheAppProducts, handleApplyFilters }
