type UpdateProductsPayments = {
  paymentType: string
  productAcceptPayments: string[]
  setProductAcceptPayments: (value: React.SetStateAction<string[]>) => void
}

type ProductPaymentChecked = {
  productAcceptPayments: string[]
  paymentType: string
}

const updateProductsPayments = ({
  paymentType,
  productAcceptPayments,
  setProductAcceptPayments
}: UpdateProductsPayments) => {
  const paymentAlreadyExists = productAcceptPayments.find(
    (payment) => payment === paymentType.toLowerCase()
  )
  if (paymentAlreadyExists) {
    const paymentUpdate = productAcceptPayments.filter(
      (payment) => payment !== paymentType.toLowerCase()
    )
    return setProductAcceptPayments(paymentUpdate)
  }

  setProductAcceptPayments((prevState) => [
    ...prevState,
    paymentType.toLowerCase()
  ])
}

const productPaymentChecked = ({
  productAcceptPayments,
  paymentType
}: ProductPaymentChecked): boolean => {
  const paymentAlreadyExists = productAcceptPayments.find(
    (payment) => payment === paymentType.toLowerCase()
  )

  return !!paymentAlreadyExists
}

export { productPaymentChecked, updateProductsPayments }
