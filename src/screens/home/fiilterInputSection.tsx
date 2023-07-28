import { Pressable, TextInput } from 'react-native'
import * as Styled from './styled'
import { DefaultTheme } from 'styled-components/native'
import { MagnifyingGlass, Sliders } from 'phosphor-react-native'
import { UseHandleApplyFilters, handleApplyFilters } from '@hooks/home'

type FilterInputSectionProps = {
  appTheme: DefaultTheme
  filters: UseHandleApplyFilters
  setAdQueryText: (value: string) => void
  setFiltersVisible: (value: boolean) => void
}

export const FilterInputSection = ({
  appTheme,
  filters,
  setAdQueryText,
  setFiltersVisible
}: FilterInputSectionProps) => {
  return (
    <Styled.FilterInputSection>
      <TextInput
        placeholder="Buscar anúncio"
        onChangeText={setAdQueryText}
        style={{
          flex: 1,
          color: appTheme.colors.gray[700],
          height: 21
        }}
        placeholderTextColor={appTheme.colors.gray[400]}
      />
      <Styled.SearchAdIcon onPress={() => handleApplyFilters(filters)}>
        <MagnifyingGlass size={20} color={appTheme.colors.gray[600]} />
      </Styled.SearchAdIcon>
      <Pressable onPress={() => setFiltersVisible(true)}>
        <Sliders size={20} color={appTheme.colors.gray[600]} />
      </Pressable>
    </Styled.FilterInputSection>
  )
}
