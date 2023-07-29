import { Text } from '@components/text'

type TextHeaderScreenProps = {
  text: string
}

export const TextHeaderScreen = ({ text }: TextHeaderScreenProps) => {
  return (
    <Text
      text={text}
      color="700"
      font="bold"
      size="xl"
      style={{ flex: 1, textAlign: 'center' }}
    />
  )
}
