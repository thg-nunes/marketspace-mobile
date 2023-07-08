import { ReactNode } from 'react'
import { View } from 'react-native'

type PaymentRootProps = {
  children: ReactNode
}

export const PaymentRoot = ({ children }: PaymentRootProps) => {
  return (
    <View style={{ flex: 1, gap: 8, flexDirection: 'row' }}>{children}</View>
  )
}
