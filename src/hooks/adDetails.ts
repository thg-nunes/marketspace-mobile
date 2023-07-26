import * as Linking from 'expo-linking'

function handleCallUser(user_tel: number) {
  Linking.openURL(`https://wa.me/55${user_tel}`)
}

export { handleCallUser }
