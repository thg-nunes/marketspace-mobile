import { CheckboxInput } from '@components/checkBox'
import { Text } from '@components/text'

import {
  productPaymentChecked,
  updateProductsPayments
} from '@utils/screens/adCreate'
import { View } from 'react-native'

type CheckBoxAndLaybelProps = {
  productAcceptPayments: string[]
  setProductAcceptPayments: (value: React.SetStateAction<string[]>) => void
}

export const CheckBoxAndLaybel = ({
  productAcceptPayments,
  setProductAcceptPayments
}: CheckBoxAndLaybelProps) => {
  return (
    <View style={{ width: '100%', gap: 12 }}>
      <Text
        text="Meios de pagamento aceitos"
        size="md"
        font="bold"
        color="700"
      />
      <CheckboxInput
        checkboxInputLabel="Boleto"
        productAcceptPayments={() =>
          updateProductsPayments({
            paymentType: 'boleto',
            productAcceptPayments,
            setProductAcceptPayments
          })
        }
        checked={productPaymentChecked({
          paymentType: 'boleto',
          productAcceptPayments
        })}
      />
      <CheckboxInput
        checkboxInputLabel="Pix"
        productAcceptPayments={() =>
          updateProductsPayments({
            paymentType: 'pix',
            productAcceptPayments,
            setProductAcceptPayments
          })
        }
        checked={productPaymentChecked({
          paymentType: 'pix',
          productAcceptPayments
        })}
      />
      <CheckboxInput
        checkboxInputLabel="Dinheiro"
        productAcceptPayments={() =>
          updateProductsPayments({
            paymentType: 'cash',
            productAcceptPayments,
            setProductAcceptPayments
          })
        }
        checked={productPaymentChecked({
          paymentType: 'cash',
          productAcceptPayments
        })}
      />
      <CheckboxInput
        checkboxInputLabel="Cartão de Crédito"
        productAcceptPayments={() =>
          updateProductsPayments({
            paymentType: 'card',
            productAcceptPayments,
            setProductAcceptPayments
          })
        }
        checked={productPaymentChecked({
          paymentType: 'card',
          productAcceptPayments
        })}
      />
      <CheckboxInput
        checkboxInputLabel="Depósito Bancário"
        productAcceptPayments={() =>
          updateProductsPayments({
            paymentType: 'deposit',
            productAcceptPayments,
            setProductAcceptPayments
          })
        }
        checked={productPaymentChecked({
          paymentType: 'deposit',
          productAcceptPayments
        })}
      />
    </View>
  )
}
