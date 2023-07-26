import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { api } from '@services/axios'
import { apiServices } from '@services/api'

import { UserDTO } from '@dtos/user'
import { AdProductByFilterDTO, AdProductDTO } from '@dtos/product'
import { userDataFetch } from '@utils/storage/user'

export type UseHandleApplyFilters = {
  setIsProductsByFilters: (value: boolean) => void
  setProductsByFilters: (value: AdProductByFilterDTO[]) => void
  is_new: boolean
  accept_trade: boolean
  query: string
  payment_methods: string[]
}

const useFetchUserStorageData = () => {
  const [userData, setUserData] = useState<UserDTO>({} as UserDTO)
  const [userProducts, setUserProducts] = useState('')

  async function fetchUserStorageData() {
    const userData = await userDataFetch()
    setUserData(userData)
  }

  async function fetcheUserProducts() {
    const response = await api.get<[]>('/users/products')
    setUserProducts(String(response.data.length))
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserStorageData()
      fetcheUserProducts()
    }, [])
  )

  return { userData, userProducts }
}

const useFetcheAppProducts = (): AdProductDTO[] => {
  const [appProducts, setAppProducts] = useState<AdProductDTO[]>([])

  useEffect(() => {
    async function fetcheAppProducts() {
      const response = await apiServices.fetchProducts()
      setAppProducts(response)
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
