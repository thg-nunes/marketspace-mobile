import { useRef } from 'react'
import { ViewToken } from 'react-native'
import { useTheme } from 'styled-components/native'

import { apiServices } from '@services/api'
import { myToast } from '@utils/toast'
import { UpdataProductVisibility } from '@dtos/product'

async function handleUpdateProductVisibility(
  { id, is_active }: UpdataProductVisibility,
  goBack: () => void
): Promise<void> {
  const { colors } = useTheme()

  try {
    await apiServices.updataProductVisibility({
      id,
      is_active
    })

    myToast({
      message: 'Produto atualizado com sucesso.',
      background: colors.green.dark
    })

    goBack()
  } catch (error) {}
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

export { handleUpdateProductVisibility, courselFlatlistImage }
