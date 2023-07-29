import { ReactElement } from 'react'
import { Pressable } from 'react-native'
import { IconProps } from 'phosphor-react-native'

type IcontHeaderScreenProps = {
  onPress: () => void
  children: ReactElement<IconProps>
}

export const IcontHeaderScreen = ({
  onPress,
  children
}: IcontHeaderScreenProps) => {
  return <Pressable onPress={onPress}>{children}</Pressable>
}
