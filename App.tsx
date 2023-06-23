import { Text, View } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold
} from '@expo-google-fonts/karla'

import { theme } from './src/theme'

export default function App() {
  const [isFontLoading] = useFonts({ Karla_400Regular, Karla_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <View>
        <Text>App</Text>
      </View>
    </ThemeProvider>
  )
}
