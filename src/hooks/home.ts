import { api } from '@services/axios'
import { UserDTO } from '@dtos/user'
import { useFocusEffect } from '@react-navigation/native'
import { userDataFetch } from '@utils/storage/user'
import { useCallback, useState } from 'react'

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

export { useFetchUserStorageData }
