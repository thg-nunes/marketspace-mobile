import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_USER_KEY } from './cofig'
import { UserDTO } from '@dtos/user'
import { userTokenDelete } from './token'
import { useNavigation } from '@react-navigation/native'
import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

const userDataSave = async (data: UserDTO): Promise<void> => {
  try {
    const userData = JSON.stringify(data)
    await AsyncStorage.setItem(STORAGE_USER_KEY, userData)
  } catch (error) {
    throw error
  }
}

const userDataFetch = async (): Promise<UserDTO> => {
  try {
    const response = await AsyncStorage.getItem(STORAGE_USER_KEY)

    const userData: UserDTO = response ? JSON.parse(response) : {}

    return userData
  } catch (error) {
    throw error
  }
}

const userSignOut = async (): Promise<void> => {
  try {
    const { navigate } = useNavigation<NativeStackRoutesScreenProps>()

    await userTokenDelete()
    navigate('login')
  } catch (error) {
    throw error
  }
}

export { userDataSave, userDataFetch, userSignOut }
