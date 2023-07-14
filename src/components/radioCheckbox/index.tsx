import { Pressable } from 'react-native'
import { Text } from '@components/text'

import * as Styled from './styled'

type CheckRadioInputProps = {
  checked?: boolean
  inputRadioLabel: string
  productStateChange: () => void
}

export const CheckRadioInput = ({
  inputRadioLabel = '',
  productStateChange,
  checked = false
}: CheckRadioInputProps) => {
  return (
    <Styled.Container>
      <Pressable onPress={productStateChange}>
        {checked ? <Styled.CheckedRadioIcon /> : <Styled.UncheckedRadioIcon />}
      </Pressable>
      <Text
        text={inputRadioLabel}
        size="lg"
        color="600"
        font="regular"
        style={{ textTransform: 'capitalize' }}
      />
    </Styled.Container>
  )
}
