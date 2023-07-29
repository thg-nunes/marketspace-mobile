import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'

import { PaymentMethods } from '@dtos/product'
import { returnsPaymentMethod } from '@utils/screens/adDetails'

import { Text } from '@components/text'
import { PaymentMethod } from '@components/paymentMethod'

type IconAndLabelProps = {
  payment_methods: PaymentMethods
}

export const IconAndLabel = ({ payment_methods }: IconAndLabelProps) => {
  return (
    <View style={styles.container}>
      <Text text="Meios de pagamento:" size="md" font="bold" color="700" />
      {returnsPaymentMethod(payment_methods, 'boleto') && (
        <PaymentMethod.Root>
          <PaymentMethod.Icon Icon={Barcode} />
          <PaymentMethod.Type type="Boleto" />
        </PaymentMethod.Root>
      )}

      {returnsPaymentMethod(payment_methods, 'pix') && (
        <PaymentMethod.Root>
          <PaymentMethod.Icon Icon={QrCode} />
          <PaymentMethod.Type type="Pix" />
        </PaymentMethod.Root>
      )}

      {returnsPaymentMethod(payment_methods, 'cash') && (
        <PaymentMethod.Root>
          <PaymentMethod.Icon Icon={Money} />
          <PaymentMethod.Type type="Dinheiro" />
        </PaymentMethod.Root>
      )}

      {returnsPaymentMethod(payment_methods, 'card') && (
        <PaymentMethod.Root>
          <PaymentMethod.Icon Icon={CreditCard} />
          <PaymentMethod.Type type="Cartão de Crédito" />
        </PaymentMethod.Root>
      )}

      {returnsPaymentMethod(payment_methods, 'deposit') && (
        <PaymentMethod.Root>
          <PaymentMethod.Icon Icon={Bank} />
          <PaymentMethod.Type type="Depósito Bancário" />
        </PaymentMethod.Root>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    marginTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 26
  }
})
