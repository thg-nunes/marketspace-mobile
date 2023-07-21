import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { AdDetails } from '@screens/adDetails'

import { Login } from '@screens/login'
import { Register } from '@screens/register'
import { BottomTabsRoutes } from './bottomTabs.routes'
import { MyAdDetails } from '@screens/myAdDetails'
import { AdCreate } from '@screens/adCreate'
import { AdPreview } from '@screens/adPreview'

type StackRoutesProps = {
  login: undefined
  register: undefined
  homeApp: undefined
  adDetails: {
    id: string
  }
  myAdDetails: {
    id: string
  }
  adCreate: undefined
  adPreview: undefined
}

export type NativeStackRoutesScreenProps =
  NativeStackNavigationProp<StackRoutesProps>

const { Screen, Navigator } = createNativeStackNavigator<StackRoutesProps>()

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
      <Screen name="homeApp" component={BottomTabsRoutes} />
      <Screen name="adDetails" component={AdDetails} />
      <Screen name="myAdDetails" component={MyAdDetails} />
      <Screen name="adCreate" component={AdCreate} />
      <Screen name="adPreview" component={AdPreview} />
    </Navigator>
  )
}
