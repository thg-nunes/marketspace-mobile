import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserTokenDTO } from '@dtos/user'
import { STORAGE_USER_TOKEN_KEY } from './cofig'

const userTokenSave = async (data: UserTokenDTO): Promise<void> => {
  try {
    const userData = JSON.stringify(data)
    await AsyncStorage.setItem(STORAGE_USER_TOKEN_KEY, userData)
  } catch (error) {
    throw error
  }
}

const userTokenFetch = async (): Promise<UserTokenDTO> => {
  try {
    const response = await AsyncStorage.getItem(STORAGE_USER_TOKEN_KEY)

    const userData: UserTokenDTO = response ? JSON.parse(response) : {}

    return userData
  } catch (error) {
    throw error
  }
}

const userTokenUpdate = async (token: string): Promise<void> => {
  try {
    const response = await AsyncStorage.getItem(STORAGE_USER_TOKEN_KEY)

    const { refresh_token }: UserTokenDTO = response ? JSON.parse(response) : {}
    await userTokenSave({ token, refresh_token })
  } catch (error) {
    throw error
  }
}

const userTokenDelete = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_USER_TOKEN_KEY)
  } catch (error) {
    throw error
  }
}

export { userTokenSave, userTokenFetch, userTokenUpdate, userTokenDelete }
