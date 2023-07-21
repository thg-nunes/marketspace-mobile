import { useTheme } from 'styled-components'
import { PressableProps } from 'react-native'
import { CaretDown, CaretUp } from 'phosphor-react-native'

import { Text } from '@components/text'

import * as Styled from './styled'

type SelectProps = PressableProps & {
  isOpen: boolean
  items: string[]
  adStatus: string
  setAdStatus: (option: string) => void
}

export const Select = ({
  isOpen = false,
  items = [],
  adStatus,
  setAdStatus,
  ...rest
}: SelectProps) => {
  const { colors } = useTheme()

  return (
    <Styled.Container isOpen={isOpen} {...rest}>
      <Styled.SelectContent>
        <Text
          text={adStatus}
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
              font={adStatus === item ? 'bold' : 'regular'}
              onPress={() => setAdStatus(item)}
            />
          ))}
        </Styled.OptionsContainer>
      )}
    </Styled.Container>
  )
}
