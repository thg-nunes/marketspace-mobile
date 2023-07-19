import { Pressable } from 'react-native'
import { Text } from '@components/text'
import * as Styled from './styled'

type CheckBoxInputProps = {
  checked?: boolean
  checkboxInputLabel: string
  productAcceptPayments?: () => void
}

export const CheckboxInput = ({
  checkboxInputLabel = '',
  productAcceptPayments,
  checked = false
}: CheckBoxInputProps) => {
  return (
    <Styled.Container>
      <Pressable onPress={productAcceptPayments}>
        {checked ? <Styled.CheckedBoxIcon /> : <Styled.UncheckedBoxIcon />}
      </Pressable>
      <Text
        text={checkboxInputLabel}
        color="600"
        font="regular"
        size="lg"
        style={{ textTransform: 'capitalize' }}
      />
    </Styled.Container>
  )
}
