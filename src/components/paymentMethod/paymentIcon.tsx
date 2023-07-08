import { ElementType } from 'react'
import { useTheme } from 'styled-components/native'

type PaymentIconProps = {
  Icon: ElementType
}

export const PaymentIcon = ({ Icon }: PaymentIconProps) => {
  const { colors } = useTheme()

  return <Icon size={18} color={colors.gray[700]} />
}
