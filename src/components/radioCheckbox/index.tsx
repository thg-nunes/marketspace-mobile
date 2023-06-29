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
      <Styled.CheckboxText>{inputRadioLabel}</Styled.CheckboxText>
    </Styled.Container>
  )
}
