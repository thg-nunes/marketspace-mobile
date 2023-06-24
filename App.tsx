import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components/native'
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold
} from '@expo-google-fonts/karla'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { theme } from './src/theme'
import { Routes } from './src/routes'

export default function App() {
  const [isFontLoading] = useFonts({ Karla_400Regular, Karla_700Bold })

  return (
    <SafeAreaProvider>
      {isFontLoading && (
        <ThemeProvider theme={theme}>
          <StatusBar translucent style="dark" backgroundColor="transparent" />
          <Routes />
        </ThemeProvider>
      )}
    </SafeAreaProvider>
  )
}
