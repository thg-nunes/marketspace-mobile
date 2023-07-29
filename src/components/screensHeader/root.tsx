import { ReactNode } from 'react'
import { View } from 'react-native'

type RootScreensHeaderProps = {
  children: ReactNode
}

export const RootScreensHeader = ({ children }: RootScreensHeaderProps) => {
  return (
    <View
      style={{ marginBottom: 36, flexDirection: 'row', alignItems: 'center' }}
    >
      {children}
    </View>
  )
}
