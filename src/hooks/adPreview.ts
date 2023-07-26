import { ProductDTO } from '@dtos/product'
import { apiServices } from '@services/api'
import { myToast } from '@utils/toast'
import { theme } from '../theme'
import { AppError } from '@utils/screens/appError'
import { BottomTabRoutesScreenProps } from '@routes/bottomTabs.routes'

async function handleAdCreate(
  product: ProductDTO,
  images: string[],
  bottomNavigation: BottomTabRoutesScreenProps
) {
  try {
    const product_id = await apiServices.createProduct(product)

    images.forEach(
      async (image) => await apiServices.createProductImage(product_id, image)
    )

    myToast({
      message: 'Produto cadastrado com sucesso.',
      background: theme.colors.green.dark
    })
    setTimeout(() => bottomNavigation.navigate('myAds'), 1500)
  } catch (error) {
    if (error instanceof AppError) {
      myToast({
        message: error.message,
        background: theme.colors.red.light
      })
    }
  }
}

export { handleAdCreate }
