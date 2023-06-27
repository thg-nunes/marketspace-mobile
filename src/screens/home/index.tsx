import { ScrollView, View } from 'react-native'
import { ArrowRight, Plus, Tag, User } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { Button } from '@components/button'

import * as Styled from './styled'

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

          <Styled.ProductsAdsContainer>
            <Styled.ProductsAdsText>
              Seus produtos anunciados para venda
            </Styled.ProductsAdsText>

            <Styled.ProductsAdsContent>
              <Styled.ProductsAdsBackground />
              <Styled.ActiveProducts>
                <Tag size={22} color={colors.blue.dark} />
                <View>
                  <Styled.Name>4</Styled.Name>
                  <Styled.Text>anúncios ativos</Styled.Text>
                </View>
              </Styled.ActiveProducts>

              <Styled.LinkContainer>
                <Styled.LinkText>Meus anúncios</Styled.LinkText>
                <ArrowRight size={16} />
              </Styled.LinkContainer>
            </Styled.ProductsAdsContent>
          </Styled.ProductsAdsContainer>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
