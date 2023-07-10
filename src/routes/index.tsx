import { View } from 'react-native'
import { useTheme } from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'

import { StackRoutes } from './nativeStack.routes'

export function Routes() {
  const { colors } = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: colors.gray[200] }}>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </View>
  )
}
