import { useTheme } from 'styled-components'
import { House, SignOut, Tag } from 'phosphor-react-native'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'

import { Home } from '@screens/home'
import { MyAds } from '@screens/myAds'
import { SignOut as ScreenSignOut } from '@screens/signOut'

export type BottomTabProps = {
  home: undefined
  myAds: undefined
  signOut: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<BottomTabProps>()

export type BottomTabRoutesScreenProps = BottomTabNavigationProp<BottomTabProps>

export function BottomTabsRoutes() {
  const { colors } = useTheme()

  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          height: 72
        },
        headerShown: false,
        tabBarShowLabel: false
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <House
              size={24}
              color={focused ? colors.gray[600] : colors.gray[400]}
              weight="bold"
            />
          )
        }}
      />
      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ focused }) => (
            <Tag
              size={24}
              color={focused ? colors.gray[600] : colors.gray[400]}
              weight="bold"
            />
          )
        }}
      />

      <Screen
        name="signOut"
        children={ScreenSignOut}
        options={{
          tabBarIcon: () => (
            <SignOut size={24} color={colors.red.light} weight="bold" />
          )
        }}
      />
    </Navigator>
  )
}
