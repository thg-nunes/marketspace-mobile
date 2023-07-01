import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, View, TextInput, Modal, Pressable } from 'react-native'
import {
  ArrowRight,
  MagnifyingGlass,
  Plus,
  Sliders,
  Tag,
  X
} from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { NativeStackRoutesScreenProps } from '@routes/auth.routes'

import { Card } from '@components/card'
import { Button } from '@components/button'
import { UserPhoto } from '@components/userPhoto'
import { CheckboxInput } from '@components/checkBox'
import { Tag as TagConponent } from '@components/tag'

import * as Styled from './styled'

type HomeProps = {}

export const Home = ({}: HomeProps) => {
  const { colors } = useTheme()
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()

  const [switchEnabled, setSwitchEnabled] = useState(true)
  const [filtersVisible, setFiltersVisible] = useState(false)

  function handleProductDetails() {
    navigate('adDetails')
  }

  return (
    <Styled.Container>
      <ScrollView
        style={{
          backgroundColor: colors.gray[200],
          paddingTop: 16,
          paddingRight: 24,
          paddingLeft: 24
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, marginTop: 20 }}>
          <Styled.HomeHeader>
            <Styled.Profile>
              <UserPhoto size={'md'} photoEdiIcontShow={false} />
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
                <Pressable onPress={() => setFiltersVisible(true)}>
                  <Sliders size={20} color={colors.gray[600]} />
                </Pressable>
              </Styled.FilterInputSection>

              <Pressable onPress={handleProductDetails}>
                <Card />
              </Pressable>
            </View>
          </Styled.ProductsAdsContainer>
        </View>
      </ScrollView>

      {filtersVisible && (
        <Modal animationType="slide" transparent>
          <Styled.FilterContainer>
            <Styled.FiltersModalBackGround />
            <Styled.FiltersContent>
              <Styled.Divider />
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Styled.FiltersHeader>Filtrar anúncios</Styled.FiltersHeader>
                <Pressable onPress={() => setFiltersVisible(false)}>
                  <X size={24} color={colors.gray[400]} />
                </Pressable>
              </View>

              <Styled.ProductCondition>
                <Styled.ProductConditionHeader>
                  Condição
                </Styled.ProductConditionHeader>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TagConponent title="NOVO" />
                  <TagConponent title="USADO" type="USED" />
                </View>
              </Styled.ProductCondition>

              <Styled.ProductCondition>
                <Styled.ProductConditionHeader>
                  Aceita troca?
                </Styled.ProductConditionHeader>
                <Styled.Switch switchEnabled={switchEnabled}>
                  <Styled.SwitchCircle switchEnabled={switchEnabled} />
                </Styled.Switch>
              </Styled.ProductCondition>

              <View style={{ width: '100%', gap: 12 }}>
                <Styled.ProductConditionHeader>
                  Meios de pagamento aceitos
                </Styled.ProductConditionHeader>
                <CheckboxInput checkboxInputLabel="Boleto" />
                <CheckboxInput checkboxInputLabel="Pix" />
                <CheckboxInput checkboxInputLabel="Dinheiro" />
                <CheckboxInput checkboxInputLabel="Cartão de Crédito" />
                <CheckboxInput checkboxInputLabel="Depósito Bancário" />
              </View>

              <View style={{ gap: 12, flexDirection: 'row' }}>
                <Button title="Resetar filtros" type="PRIMARY" />
                <Button title="Aplicar filtros" type="SECONDARY" />
              </View>
            </Styled.FiltersContent>
          </Styled.FilterContainer>
        </Modal>
      )}
    </Styled.Container>
  )
}
