import { useNavigation } from '@react-navigation/native'
import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { useEffect } from 'react'

export const SignOut = () => {
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()

  useEffect(() => {
    navigate('login')
  }, [])

  return null
}
