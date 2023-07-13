import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_USER_KEY } from './cofig'
import { UserDTO } from 'src/dtos/user'

const userDataSave = async (data: UserDTO): Promise<void> => {
  try {
    const userData = JSON.stringify(data)
    await AsyncStorage.setItem(STORAGE_USER_KEY, userData)
  } catch (error) {
    throw error
  }
}

export { userDataSave }
