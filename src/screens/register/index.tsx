import { useTheme } from 'styled-components/native'
import { Image, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Logo from '@assets/logo/logo.png'

import { AuthRoutesScreenProps } from '@routes/auth.routes'

import { Input } from '@components/input'
import { Button } from '@components/button'
import { UserPhoto } from '@components/userPhoto'

import * as Styled from './styled'

type RegisterProps = {}

export const Register = ({}: RegisterProps) => {
  const { colors } = useTheme()
  const { goBack } = useNavigation<AuthRoutesScreenProps>()

  function handleSignIn() {
    goBack()
  }

  return (
    <Styled.Container>
      <ScrollView
        style={{ backgroundColor: colors.gray[200] }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          <Styled.Content>
            <Styled.LogoSection>
              <Image source={Logo} style={{ width: 60, height: 40 }} />
              <View style={{ alignItems: 'center' }}>
                <Styled.Heading>Boas vindas!</Styled.Heading>
                <Styled.Description>
                  Crie sua conta e use o espaço para comprar itens variados e
                  vender seus produtos
                </Styled.Description>
              </View>
            </Styled.LogoSection>

            <UserPhoto size={'xl'} photoEdiIcontShow />
            <View style={{ width: '100%', maxWidth: 279 }}>
              <Styled.FormSection>
                <Input placeholder="Nome" />
                <Input placeholder="E-mail" />
                <Input placeholder="Telefone" />
                <Input isPassword placeholder="Senha" />
                <Input
                  isPassword
                  placeholder="Confirmar Senha"
                  returnKeyType="send"
                />
              </Styled.FormSection>

              <Button title="Criar" type="SECONDARY" />
            </View>
          </Styled.Content>

          <Styled.RegisterSection>
            <View style={{ width: '100%', maxWidth: 279, gap: 16 }}>
              <Styled.FormHeader>Já tem uma conta?</Styled.FormHeader>
              <Button
                title="Ir para o login"
                type="PRIMARY"
                onPress={handleSignIn}
              />
            </View>
          </Styled.RegisterSection>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
