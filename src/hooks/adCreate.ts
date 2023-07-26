import { myToast } from '@utils/toast'
import { theme } from '../theme'
import { ProductDTO } from '@dtos/product'
import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

function handleAdPreview(
  images: string[],
  productAcceptPayments: string[],
  stack: NativeStackRoutesScreenProps,
  product: ProductDTO
) {
  if (images.length === 0) {
    myToast({
      message: 'Pelo menos 1 foto do produto é necessária.',
      background: theme.colors.red.light
    })
    return
  }

  if (productAcceptPayments.length === 0) {
    myToast({
      message: 'Pelo menos 1 meio de pagamento é necessário.',
      background: theme.colors.red.light
    })
    return
  }

  stack.navigate('adPreview', {
    images,
    product
  })
}

export { handleAdPreview }
