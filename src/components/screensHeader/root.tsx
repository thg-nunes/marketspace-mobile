import { ReactNode } from 'react'
import { View } from 'react-native'

type RootScreensHeaderProps = {
  children: ReactNode
  mb?: number
  mt?: number
  pl?: number
  pr?: number
}

export const RootScreensHeader = ({
  children,
  mb = 0,
  mt = 0,
  pl = 0,
  pr = 0
}: RootScreensHeaderProps) => {
  return (
    <View
      style={{
        marginTop: mt,
        marginBottom: mb,
        paddingLeft: pl,
        paddingRight: pr,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {children}
    </View>
  )
}
