import { TouchableOpacityProps } from 'react-native'
import { PencilSimpleLine } from 'phosphor-react-native'

import * as Styled from './styled'

export const UploadButton = (props: TouchableOpacityProps) => {
  return (
    <Styled.Pencel activeOpacity={0.9} {...props}>
      <PencilSimpleLine size={16} color="#ffffff" />
    </Styled.Pencel>
  )
}
