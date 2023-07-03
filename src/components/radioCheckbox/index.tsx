import { Text } from '@components/text'

import * as Styled from './styled'

type CheckRadioInputProps = {
  checked?: boolean
  inputRadioLabel: string
}

export const CheckRadioInput = ({
  inputRadioLabel = '',
  checked = false
}: CheckRadioInputProps) => {
  return (
    <Styled.Container>
      {checked ? <Styled.CheckedRadioIcon /> : <Styled.UncheckedRadioIcon />}
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
