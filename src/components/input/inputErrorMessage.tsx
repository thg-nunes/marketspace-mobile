import { TextInputProps } from 'react-native'

import * as Styled from './styled'

type InputErrorMessageProps = TextInputProps & {
  error: string | undefined
}

export const InputErrorMessage = ({ error = '' }: InputErrorMessageProps) => {
  return <Styled.InputErrorMessage>{error}</Styled.InputErrorMessage>
}
