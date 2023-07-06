import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { AdDetails } from '@screens/adDetails'

import { Login } from '@screens/login'
import { Register } from '@screens/register'
import { AppRoutes } from './app.routes'
import { MyAdDetails } from '@screens/myAdDetails'

type AuthRoutesProps = {
  login: undefined
  register: undefined
  homeApp: undefined
  adDetails: undefined
  myAdDetails: undefined
}

export type NativeStackRoutesScreenProps =
  NativeStackNavigationProp<AuthRoutesProps>

const { Screen, Navigator } = createNativeStackNavigator<AuthRoutesProps>()

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
      <Screen name="homeApp" component={AppRoutes} />
      <Screen name="adDetails" component={AdDetails} />
      <Screen name="myAdDetails" component={MyAdDetails} />
    </Navigator>
  )
}
