import { PaymentMethods } from '@dtos/product'

type PaymentKeyTypes = 'deposit' | 'card' | 'cash' | 'pix' | 'boleto'

const returnsPaymentMethod = (
  payment_methods: PaymentMethods = [],
  method: PaymentKeyTypes
) => {
  const methodExists = payment_methods.find(
    (paymentMethod) => paymentMethod.key === method
  )

  return !!methodExists
}

export { returnsPaymentMethod }
