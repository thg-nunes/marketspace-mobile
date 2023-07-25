import { userSignOut } from '@utils/storage/user'
import { useEffect } from 'react'

export const SignOut = () => {
  useEffect(() => {
    async function handleSignOut() {
      await userSignOut()
    }
    handleSignOut()
  }, [])

  return null
}
