import { XCircle } from 'phosphor-react-native'
import { Pressable, PressableProps } from 'react-native'

export const TagIcon = (pressableProps: PressableProps) => {
  return (
    <Pressable {...pressableProps}>
      <XCircle size={13} color={'#ffffff'} weight="fill" />
    </Pressable>
  )
}
