import { View } from 'react-native'
import * as Styled from './styled'
import { Button } from '@components/button'
import { handleCallUser } from '@hooks/adDetails'
import { WhatsappLogo } from 'phosphor-react-native'
import { Text } from '@components/text'
import { DefaultTheme } from 'styled-components/native'

type ContactSectionProps = {
  product_price: number
  userTel: number
  appTheme: DefaultTheme
}

export const ContactSection = ({
  appTheme,
  userTel,
  product_price
}: ContactSectionProps) => {
  return (
    <Styled.Contact>
      <View style={{ flexDirection: 'row' }}>
        <Styled.AmountIndicator style={{ color: appTheme.colors.blue.dark }}>
          R$
        </Styled.AmountIndicator>
        <Styled.Amount style={{ color: appTheme.colors.blue.dark }}>
          {product_price}
        </Styled.Amount>
      </View>

      <View>
        <Button.Root type="TERTIARY" onPress={() => handleCallUser(userTel)}>
          <Button.Icon
            Icon={WhatsappLogo}
            iconProps={{
              size: 16,
              color: 'white',
              weight: 'fill'
            }}
          />
          <Text color="100" font="bold" size="md" text="Entrar em contato" />
        </Button.Root>
      </View>
    </Styled.Contact>
  )
}
