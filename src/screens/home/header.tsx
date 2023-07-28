import { View } from 'react-native'
import { Plus } from 'phosphor-react-native'
import { DefaultTheme } from 'styled-components/native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { api } from '@services/axios'
import { UserDTO } from '@dtos/user'

import { Text } from '@components/text'
import { Button } from '@components/button'
import { UserInfo } from '@components/userInfo'

import * as Styled from './styled'

type HeaderProps = {
  userData: UserDTO
  appTheme: DefaultTheme
  stackNavigation: NativeStackRoutesScreenProps
}

export const Header = ({
  userData,
  appTheme,
  stackNavigation
}: HeaderProps) => {
  function handleAdCreate() {
    stackNavigation.navigate('adCreate')
  }

  return (
    <Styled.HomeHeader>
      <UserInfo
        photSize="md"
        uri={`${api.defaults.baseURL}/images/${userData.avatar}`}
      >
        <View>
          <Text text="Boas Vindas," size="lg" font="regular" color="700" />
          <Text text={userData.name} size="lg" font="bold" color="700" />
        </View>
      </UserInfo>

      <View>
        <Button.Root type="SECONDARY" onPress={handleAdCreate}>
          <Button.Icon
            Icon={Plus}
            iconProps={{
              size: 16,
              color: appTheme.colors.gray[100]
            }}
          />
          <Text text="Criar anúncio" color="100" font="bold" size="md" />
        </Button.Root>
      </View>
    </Styled.HomeHeader>
  )
}
