import { Text } from '@components/text'
import { Plus } from 'phosphor-react-native'
import { useTheme } from 'styled-components'

import * as Styled from './styled'

export const MyAds = () => {
  const { colors } = useTheme()

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
    </Styled.Container>
  )
}
