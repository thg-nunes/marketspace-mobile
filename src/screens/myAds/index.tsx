import { useState } from 'react'
import { Text } from '@components/text'
import { Plus } from 'phosphor-react-native'
import { useTheme } from 'styled-components'

import { Select } from '@components/select'

import * as Styled from './styled'

export const MyAds = () => {
  const { colors } = useTheme()

  const [selectIsOpen, setSelectIsOpen] = useState(false)

  return (
    <Styled.Container>
      <Styled.Header>
        <Text
          text="Meus anúncios"
          color="700"
          font="bold"
          size="xl"
          style={{ flex: 1, textAlign: 'center' }}
        />
        <Plus size={24} color={colors.gray[700]} />
      </Styled.Header>

      <Styled.MyAdsQuantity>
        <Text text={`9 anúncios`} color="600" font="regular" size="md" />
        <Select
          items={['Todos', 'Ativos', 'Inativos']}
          isOpen={selectIsOpen}
          onPress={() => setSelectIsOpen(!selectIsOpen)}
        />
      </Styled.MyAdsQuantity>
    </Styled.Container>
  )
}
