import { ScrollView, View, TextInput } from 'react-native'
import {
  ArrowRight,
  MagnifyingGlass,
  Plus,
  Sliders,
  Tag,
  User
} from 'phosphor-react-native'
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

            <View style={{ gap: 12 }}>
              <Styled.ProductsAdsText>
                Compre produtos variados
              </Styled.ProductsAdsText>

              <Styled.FilterInputSection>
                <TextInput
                  placeholder="Buscar anúncio"
                  style={{ flex: 1, color: colors.gray[700], height: 21 }}
                  placeholderTextColor={colors.gray[400]}
                />
                <View
                  style={{
                    paddingRight: 12,
                    borderRightWidth: 1,
                    borderColor: colors.gray[400]
                  }}
                >
                  <MagnifyingGlass size={20} color={colors.gray[600]} />
                </View>
                <Sliders size={20} color={colors.gray[600]} />
              </Styled.FilterInputSection>
            </View>
          </Styled.ProductsAdsContainer>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
