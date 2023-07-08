import { Text } from '@components/text'

type PaymentTypeProps = {
  type:
    | 'Boleto'
    | 'Pix'
    | 'Dinheiro'
    | 'Cartão de Crédito'
    | 'Depósito Bancário'
}

export const PaymentType = ({ type }: PaymentTypeProps) => {
  return <Text color="600" font="regular" size="md" text={type} />
}
