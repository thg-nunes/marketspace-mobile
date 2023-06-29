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
      <Styled.CheckboxText>{checkboxInputLabel}</Styled.CheckboxText>
    </Styled.Container>
  )
}
