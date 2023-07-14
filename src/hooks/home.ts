import { api } from '@services/axios'
import { UserDTO } from '@dtos/user'
import { useFocusEffect } from '@react-navigation/native'
import { userDataFetch } from '@utils/storage/user'
import { useCallback, useState } from 'react'
import { apiServices } from '@services/api'

const useFetchUserStorageData = () => {
  const [userData, setUserData] = useState<UserDTO>({} as UserDTO)
  const [userProducts, setUserProducts] = useState('')
  const [appProducts, setAppProducts] = useState([])

  async function fetchUserStorageData() {
    const userData = await userDataFetch()
    setUserData(userData)
  }

  async function fetcheUserProducts() {
    const response = await api.get<[]>('/users/products')
    setUserProducts(String(response.data.length))
  }

  async function fetcheAppProducts() {
    const response = await apiServices.fetchProducts()
    setAppProducts(response)
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserStorageData()
      fetcheUserProducts()
      fetcheAppProducts()
    }, [])
  )

  return { userData, userProducts, appProducts }
}

export { useFetchUserStorageData }
