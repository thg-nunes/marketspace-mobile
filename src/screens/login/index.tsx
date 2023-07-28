import { useTheme } from 'styled-components/native'
import { Dimensions, ScrollView, View } from 'react-native'

import { LogoSection } from './logoSection'
import { SignSectionContent } from './signSection'
import { RegisterSectionContent } from './registerSection'

import * as Styled from './styled'

export const screenwidth = Dimensions.get('window').width.toFixed(2)

export const Login = () => {
  const { colors } = useTheme()

  return (
    <Styled.Container>
      <ScrollView
        style={{ backgroundColor: colors.gray[100] }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          <Styled.Content>
            <LogoSection />

            <SignSectionContent />
          </Styled.Content>

          <Styled.RegisterSection>
            <RegisterSectionContent />
          </Styled.RegisterSection>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
