import { UserDTO } from '@dtos/user'
import { useFocusEffect } from '@react-navigation/native'
import { userDataFetch } from '@utils/storage/user'
import { useCallback, useState } from 'react'

const useFetchUserStorageData = () => {
  const [userData, setUserData] = useState<UserDTO>({} as UserDTO)

  async function fetchUserStorageData() {
    const userData = await userDataFetch()
    setUserData(userData)
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserStorageData()
    }, [])
  )

  return { userData }
}

export { useFetchUserStorageData }
