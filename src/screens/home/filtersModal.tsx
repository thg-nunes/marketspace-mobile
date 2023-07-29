import { X } from 'phosphor-react-native'
import { Modal, Pressable, View } from 'react-native'
import { DefaultTheme } from 'styled-components/native'

import { UseHandleApplyFilters, handleApplyFilters } from '@hooks/home'

import { Text } from '@components/text'
import { Tag } from '@components/tag'
import { Switch } from '@components/switch'
import { Button } from '@components/button'
import { PaymentTypes } from '@components/paymentTypes'

import * as Styled from './styled'

type Props = {
  appTheme: DefaultTheme
  productIsNew: '' | 'new' | 'used'
  filters: UseHandleApplyFilters
  switchEnabled: boolean
  setSwitchEnabled: (value: boolean) => void
  setFiltersVisible: (value: boolean) => void
  productAcceptPayments: string[]
  setProductAcceptPayments: React.Dispatch<React.SetStateAction<string[]>>
  setIsProductsByFilters: (value: boolean) => void
  setProductIsNew: React.Dispatch<React.SetStateAction<'' | 'new' | 'used'>>
}

export const FiltersModal = ({
  setFiltersVisible,
  appTheme,
  setProductIsNew,
  productIsNew,
  setSwitchEnabled,
  switchEnabled,
  filters,
  setProductAcceptPayments,
  setIsProductsByFilters,
  productAcceptPayments
}: Props) => {
  return (
    <Modal animationType="slide" transparent>
      <Styled.FilterContainer>
        <Styled.FiltersModalBackGround />
        <Styled.FiltersContent>
          <Styled.Divider />
          <Styled.FilterHeader>
            <Text text="Filtrar anúncios" size="xl" font="bold" color="700" />
            <Pressable onPress={() => setFiltersVisible(false)}>
              <X size={24} color={appTheme.colors.gray[400]} />
            </Pressable>
          </Styled.FilterHeader>

          <Styled.ProductCondition>
            <Text text="Condição" size="md" font="bold" color="700" />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Tag.Root
                onPress={() => setProductIsNew('new')}
                hasTagIcon={productIsNew === 'new'}
                size="lg"
                type={productIsNew === 'new' ? 'BLUE' : 'GRAY.300'}
              >
                <Text
                  text="NOVO"
                  color={productIsNew === 'new' ? '100' : '500'}
                  font="bold"
                  size="sm"
                />
                {productIsNew === 'new' && (
                  <Tag.Icon onPress={() => setProductIsNew('')} />
                )}
              </Tag.Root>

              <Tag.Root
                onPress={() => setProductIsNew('used')}
                hasTagIcon={productIsNew === 'used'}
                size="lg"
                type={productIsNew === 'used' ? 'BLUE' : 'GRAY.300'}
              >
                <Text
                  text="USADO"
                  color={productIsNew === 'used' ? '100' : '500'}
                  font="bold"
                  size="sm"
                />
                {productIsNew === 'used' && (
                  <Tag.Icon onPress={() => setProductIsNew('')} />
                )}
              </Tag.Root>
            </View>
          </Styled.ProductCondition>

          <Styled.ProductCondition>
            <Text text="Aceita troca?" size="md" font="bold" color="700" />
            <Switch
              switchEnabled={switchEnabled}
              onPress={() => setSwitchEnabled(!switchEnabled)}
            />
          </Styled.ProductCondition>

          <PaymentTypes.CheckBox
            productAcceptPayments={productAcceptPayments}
            setProductAcceptPayments={setProductAcceptPayments}
          />

          <View style={{ gap: 12, flexDirection: 'row' }}>
            <Button.Root
              type="PRIMARY"
              onPress={() => {
                setProductAcceptPayments([])
                setProductIsNew('')
                setFiltersVisible(false)
                setSwitchEnabled(false)
                setIsProductsByFilters(false)
              }}
            >
              <Text text="Resetar filtros" color="600" font="bold" size="md" />
            </Button.Root>
            <Button.Root
              type="SECONDARY"
              onPress={() => {
                handleApplyFilters(filters)
                setFiltersVisible(false)
                setIsProductsByFilters(true)
              }}
            >
              <Text text="Aplicar filtros" color="100" font="bold" size="md" />
            </Button.Root>
          </View>
        </Styled.FiltersContent>
      </Styled.FilterContainer>
    </Modal>
  )
}
