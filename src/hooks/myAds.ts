import { AdProductDTO } from '@dtos/product'
import { userServices } from '@services/api/user'
import { AppError } from '@utils/screens/appError'
import { myToast } from '@utils/toast'
import { theme } from 'src/theme'

async function handleFetchUserAds(
  adStatus: string,
  setIsFetchingProducts: (value: boolean) => void,
  setUserProducts: (value: AdProductDTO[]) => void
): Promise<void> {
  try {
    setIsFetchingProducts(true)
    const response = await userServices.fetchMyProducts()

    if (adStatus === 'Todos') {
      const allProducts = response.filter((product) => product)

      return setUserProducts(allProducts)
    }

    if (adStatus === 'Ativos') {
      const activeProducts = response.filter((product) => product.is_active)
      return setUserProducts(activeProducts)
    }

    if (adStatus === 'Inativos') {
      const inactiveProducts = response.filter((product) => !product.is_active)
      return setUserProducts(inactiveProducts)
    }
  } catch (error) {
    if (error instanceof AppError) {
      myToast({
        message: error.message,
        background: theme.colors.red.light
      })
    }
  } finally {
    setIsFetchingProducts(false)
  }
}

export { handleFetchUserAds }
