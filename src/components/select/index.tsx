import { useState } from 'react'
import { useTheme } from 'styled-components'
import { PressableProps } from 'react-native'
import { CaretDown, CaretUp } from 'phosphor-react-native'

import { Text } from '@components/text'

import * as Styled from './styled'

type SelectProps = PressableProps & {
  isOpen: boolean
  items: string[]
}

export const Select = ({
  isOpen = false,
  items = [],
  ...rest
}: SelectProps) => {
  const { colors } = useTheme()
  const [selectedOption, setSelectedOption] = useState('Todos')

  return (
    <Styled.Container isOpen={isOpen} {...rest}>
      <Styled.SelectContent>
        <Text
          text={selectedOption}
          font="regular"
          size="md"
          color="700"
          style={{ flex: 1 }}
        />
        {isOpen ? (
          <CaretUp size={16} color={colors.gray[500]} />
        ) : (
          <CaretDown size={16} color={colors.gray[500]} />
        )}
      </Styled.SelectContent>

      {isOpen && (
        <Styled.OptionsContainer>
          {items.map((item) => (
            <Text
              key={item}
              text={item}
              size="md"
              color="600"
              font={selectedOption === item ? 'bold' : 'regular'}
              onPress={() => setSelectedOption(item)}
            />
          ))}
        </Styled.OptionsContainer>
      )}
    </Styled.Container>
  )
}
