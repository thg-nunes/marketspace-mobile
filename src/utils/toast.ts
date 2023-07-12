import Toast from 'react-native-root-toast'

type MyToastParams = {
  message: string
  background: string
}

export const myToast = ({ message, background }: MyToastParams) => {
  return Toast.show(message, {
    duration: Toast.durations.LONG,
    position: 35,
    backgroundColor: background,
    textColor: 'white',
    opacity: 1
  })
}
