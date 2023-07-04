import { ElementType } from 'react'
import { IconProps } from 'phosphor-react-native'

type ButtonIconProps = {
  Icon: ElementType
  iconProps: IconProps
}

export const ButtonIcon = ({ Icon, iconProps }: ButtonIconProps) => {
  return <Icon {...iconProps} />
}
