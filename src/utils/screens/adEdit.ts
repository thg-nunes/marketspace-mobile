import { ProductPaymentChecked, UpdateProductsPayments } from './adCreate'

const updateProductsPayments = ({
  paymentType,
  productAcceptPayments,
  setProductAcceptPayments
}: UpdateProductsPayments) => {
  const paymentAlreadyExists = productAcceptPayments.find(
    (payment) => payment === paymentType
  )
  if (paymentAlreadyExists) {
    const paymentUpdate = productAcceptPayments.filter(
      (payment) => payment !== paymentType
    )
    return setProductAcceptPayments(paymentUpdate)
  }

  setProductAcceptPayments((prevState) => [...prevState, paymentType])
}
const productPaymentChecked = ({
  productAcceptPayments,
  paymentType
}: ProductPaymentChecked): boolean => {
  const paymentAlreadyExists = productAcceptPayments.find(
    (payment) => payment === paymentType
  )

  return !!paymentAlreadyExists
}

export { productPaymentChecked, updateProductsPayments }
