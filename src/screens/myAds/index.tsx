import { useState } from 'react'
import { Text } from '@components/text'
import { Plus } from 'phosphor-react-native'
import { useTheme } from 'styled-components'

import { Select } from '@components/select'

import * as Styled from './styled'
import { Card } from '@components/card'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackRoutesScreenProps } from '@routes/auth.routes'

export const MyAds = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()

  const [selectIsOpen, setSelectIsOpen] = useState(false)

  function handleMyAdDetails() {
    navigate('myAdDetails')
  }

  function handleAdCreate() {
    navigate('adCreate')
  }

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
        <Pressable onPress={handleAdCreate}>
          <Plus size={24} color={colors.gray[700]} />
        </Pressable>
      </Styled.Header>

      <Styled.MyAdsQuantity>
        <Text text={`9 anúncios`} color="600" font="regular" size="md" />
        <Select
          items={['Todos', 'Ativos', 'Inativos']}
          isOpen={selectIsOpen}
          onPress={() => setSelectIsOpen(!selectIsOpen)}
        />
      </Styled.MyAdsQuantity>

      <Pressable onPress={handleMyAdDetails}>
        <Card cardType="ACTIVE" productType="NEW" />
      </Pressable>
    </Styled.Container>
  )
}
