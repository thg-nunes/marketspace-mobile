import { ScrollView, View } from 'react-native'
import { Plus, User } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import * as Styled from './styled'
import { Button } from '@components/button'

type HomeProps = {}

export const Home = ({}: HomeProps) => {
  const { colors } = useTheme()

  return (
    <Styled.Container>
      <ScrollView
        style={{ backgroundColor: colors.gray[200] }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, marginTop: 20 }}>
          <Styled.HomeHeader>
            <Styled.Profile>
              <Styled.HomeHeaderUserPhoto>
                <User size={28} color={colors.gray[400]} />
              </Styled.HomeHeaderUserPhoto>
              <View>
                <Styled.Text>Boas Vindas,</Styled.Text>
                <Styled.Name>Maria!</Styled.Name>
              </View>
            </Styled.Profile>

            <View>
              <Button title="Criar anúncio" type="SECONDARY">
                <Plus size={16} color={colors.gray[100]} />
              </Button>
            </View>
          </Styled.HomeHeader>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
