import { View } from 'react-native'
import { Bank, Barcode, CreditCard, Money, QrCode } from 'phosphor-react-native'

import { ProductDTO } from '@dtos/product'
import { productPaymentChecked } from '@utils/screens/adCreate'

import { Text } from '@components/text'
import { PaymentMethod } from '@components/paymentMethod'

type PaymentsAcceptedByAdProps = {
  product: ProductDTO
}

export const PaymentsAcceptedByAd = ({
  product
}: PaymentsAcceptedByAdProps) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        marginVertical: 16,
        gap: 8
      }}
    >
      <Text text="Meios de pagamento:" size="md" font="bold" color="700" />
      {productPaymentChecked({
        productAcceptPayments: product.payment_methods,
        paymentType: 'boleto'
      }) && (
        <PaymentMethod.Root>
          <PaymentMethod.Icon Icon={Barcode} />
          <PaymentMethod.Type type="Boleto" />
        </PaymentMethod.Root>
      )}

      {productPaymentChecked({
        productAcceptPayments: product.payment_methods,
        paymentType: 'pix'
      }) && (
        <PaymentMethod.Root>
          <PaymentMethod.Icon Icon={QrCode} />
          <PaymentMethod.Type type="Pix" />
        </PaymentMethod.Root>
      )}

      {productPaymentChecked({
        productAcceptPayments: product.payment_methods,
        paymentType: 'cash'
      }) && (
        <PaymentMethod.Root>
          <PaymentMethod.Icon Icon={Money} />
          <PaymentMethod.Type type="Dinheiro" />
        </PaymentMethod.Root>
      )}

      {productPaymentChecked({
        productAcceptPayments: product.payment_methods,
        paymentType: 'card'
      }) && (
        <PaymentMethod.Root>
          <PaymentMethod.Icon Icon={CreditCard} />
          <PaymentMethod.Type type="Cartão de Crédito" />
        </PaymentMethod.Root>
      )}

      {productPaymentChecked({
        productAcceptPayments: product.payment_methods,
        paymentType: 'deposit'
      }) && (
        <PaymentMethod.Root>
          <PaymentMethod.Icon Icon={Bank} />
          <PaymentMethod.Type type="Depósito Bancário" />
        </PaymentMethod.Root>
      )}
    </View>
  )
}
