import { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
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

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { userDataFetch } from '@utils/storage/user'
import { UserDTO } from '@dtos/user'

import { Card } from '@components/card'
import { Text } from '@components/text'
import { Button } from '@components/button'
import { Switch } from '@components/switch'
import { UserInfo } from '@components/userInfo'
import { CheckboxInput } from '@components/checkBox'
import { Tag as TagConponent } from '@components/tag'

import * as Styled from './styled'

export const Home = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()

  const [switchEnabled, setSwitchEnabled] = useState(true)
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [userData, setUserData] = useState<UserDTO>({} as UserDTO)

  function handleProductDetails() {
    navigate('adDetails')
  }

  async function fetchUserStorageData() {
    const userData = await userDataFetch()
    setUserData(userData)
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserStorageData()
    }, [])
  )

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
            <UserInfo photSize="md" uri={userData.avatar}>
              <View>
                <Text
                  text="Boas Vindas,"
                  size="lg"
                  font="regular"
                  color="700"
                />
                <Text text={userData.name} size="lg" font="bold" color="700" />
              </View>
            </UserInfo>

            <View>
              <Button.Root type="SECONDARY">
                <Button.Icon
                  Icon={Plus}
                  iconProps={{
                    size: 16,
                    color: colors.gray[100]
                  }}
                />
                <Text text="Criar anúncio" color="100" font="bold" size="md" />
              </Button.Root>
            </View>
          </Styled.HomeHeader>

          <Styled.ProductsAdsContainer>
            <Text
              text="Seus produtos anunciados para venda"
              size="md"
              font="regular"
              color="500"
            />

            <Styled.ProductsAdsContent>
              <Styled.ProductsAdsBackground />
              <Styled.ActiveProducts>
                <Tag size={22} color={colors.blue.dark} />
                <View>
                  <Text text="4" size="lg" font="bold" color="700" />
                  <Text
                    text="anúncios ativos"
                    size="lg"
                    font="regular"
                    color="700"
                  />
                </View>
              </Styled.ActiveProducts>

              <Styled.LinkContainer>
                <Styled.LinkText>Meus anúncios</Styled.LinkText>
                <ArrowRight size={16} />
              </Styled.LinkContainer>
            </Styled.ProductsAdsContent>

            <View style={{ gap: 12 }}>
              <Text
                text="Compre produtos variados"
                size="md"
                font="regular"
                color="500"
              />

              <Styled.FilterInputSection>
                <TextInput
                  placeholder="Buscar anúncio"
                  style={{ flex: 1, color: colors.gray[700], height: 21 }}
                  placeholderTextColor={colors.gray[400]}
                />
                <Styled.SearchAdIcon>
                  <MagnifyingGlass size={20} color={colors.gray[600]} />
                </Styled.SearchAdIcon>
                <Pressable onPress={() => setFiltersVisible(true)}>
                  <Sliders size={20} color={colors.gray[600]} />
                </Pressable>
              </Styled.FilterInputSection>

              <Pressable onPress={handleProductDetails}>
                <Card cardType="ACTIVE" productType="USED" />
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
              <Styled.FilterHeader>
                <Text
                  text="Filtrar anúncios"
                  size="xl"
                  font="bold"
                  color="700"
                />
                <Pressable onPress={() => setFiltersVisible(false)}>
                  <X size={24} color={colors.gray[400]} />
                </Pressable>
              </Styled.FilterHeader>

              <Styled.ProductCondition>
                <Text text="Condição" size="md" font="bold" color="700" />
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TagConponent.Root hasTagIcon size="lg" type="BLUE">
                    <Text text="NOVO" color="100" font="bold" size="sm" />
                    <TagConponent.Icon />
                  </TagConponent.Root>

                  <TagConponent.Root size="lg" type="GRAY.300">
                    <Text text="USADO" color="500" font="bold" size="sm" />
                  </TagConponent.Root>
                </View>
              </Styled.ProductCondition>

              <Styled.ProductCondition>
                <Text text="Aceita troca?" size="md" font="bold" color="700" />
                <Switch switchEnabled={switchEnabled} />
              </Styled.ProductCondition>

              <View style={{ width: '100%', gap: 12 }}>
                <Text
                  text="Meios de pagamento aceitos"
                  size="md"
                  font="bold"
                  color="700"
                />
                <CheckboxInput checkboxInputLabel="Boleto" />
                <CheckboxInput checkboxInputLabel="Pix" />
                <CheckboxInput checkboxInputLabel="Dinheiro" />
                <CheckboxInput checkboxInputLabel="Cartão de Crédito" />
                <CheckboxInput checkboxInputLabel="Depósito Bancário" />
              </View>

              <View style={{ gap: 12, flexDirection: 'row' }}>
                <Button.Root type="PRIMARY">
                  <Text
                    text="Resetar filtros"
                    color="600"
                    font="bold"
                    size="md"
                  />
                </Button.Root>
                <Button.Root type="SECONDARY">
                  <Text
                    text="Aplicar filtros"
                    color="100"
                    font="bold"
                    size="md"
                  />
                </Button.Root>
              </View>
            </Styled.FiltersContent>
          </Styled.FilterContainer>
        </Modal>
      )}
    </Styled.Container>
  )
}
