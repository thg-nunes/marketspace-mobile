import { Text } from '@components/text'
import * as Styled from './styled'

type CheckBoxInputProps = {
  checked?: boolean
  checkboxInputLabel: string
}

export const CheckboxInput = ({
  checkboxInputLabel = '',
  checked = false
}: CheckBoxInputProps) => {
  return (
    <Styled.Container>
      {checked ? <Styled.CheckedBoxIcon /> : <Styled.UncheckedBoxIcon />}
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
