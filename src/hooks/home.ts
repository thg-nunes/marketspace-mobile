import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { api } from '@services/axios'
import { apiServices } from '@services/api'

import { UserDTO } from '@dtos/user'
import { AdProductDTO } from '@dtos/product'
import { userDataFetch } from '@utils/storage/user'

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

export { useFetchUserStorageData, useFetcheAppProducts }
