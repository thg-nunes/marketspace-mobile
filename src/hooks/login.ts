import { useNavigation } from '@react-navigation/native'
import { NativeStackRoutesScreenProps } from '@routes/auth.routes'
import { useState } from 'react'

function useHandleSignIn() {
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()
  const [isSign, setIsSign] = useState(false)

  function handleSignIn() {
    setIsSign(true)
    setTimeout(() => {
      navigate('homeApp')
      setIsSign(false)
    }, 500)
  }

  return {
    isSign,
    handleSignIn
  }
}

export { useHandleSignIn }
