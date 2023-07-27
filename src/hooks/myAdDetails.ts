import { useRef } from 'react'
import { ViewToken } from 'react-native'

import { apiServices } from '@services/api'
import { myToast } from '@utils/toast'
import { UpdataProductVisibility } from '@dtos/product'
import { AppError } from '@utils/screens/appError'
import { theme } from '../theme'

async function handleUpdateProductVisibility(
  { id, is_active }: UpdataProductVisibility,
  goBack: () => void
): Promise<void> {
  try {
    await apiServices.updataProductVisibility({
      id,
      is_active
    })

    myToast({
      message: 'Produto atualizado com sucesso.',
      background: theme.colors.green.dark
    })

    setTimeout(() => goBack(), 750)
  } catch (error) {
    if (error instanceof AppError) {
      return myToast({
        message: error.message,
        background: theme.colors.red.light
      })
    }
  }
}

const courselFlatlistImage = (setActiveImage: (value: number) => void) => {
  function onViewableItemsChanged(info: {
    viewableItems: Array<ViewToken>
    changed: Array<ViewToken>
  }) {
    const imageIndex = info.changed[0]?.index as number
    setActiveImage(imageIndex)
  }

  const viewabilityConfigCallbackPair = useRef([
    {
      viewabilityConfig: {
        viewAreaCoveragePercentThreshold: 95
      },
      onViewableItemsChanged
    }
  ])

  return viewabilityConfigCallbackPair
}

const handleAdDelete = async (
  product_id: string,
  goBack: () => void
): Promise<void> => {
  try {
    await apiServices.deleteProduct(product_id)

    myToast({
      message: 'Anúncio deletado com sucesso',
      background: theme.colors.green.dark
    })

    setTimeout(() => goBack(), 750)
  } catch (error) {
    if (error instanceof AppError) {
      return myToast({
        message: error.message,
        background: theme.colors.red.light
      })
    }
  }
}

export { handleUpdateProductVisibility, courselFlatlistImage, handleAdDelete }
