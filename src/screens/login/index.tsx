import { Controller } from 'react-hook-form'
import { useTheme } from 'styled-components/native'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Logo from '@assets/logo/logo.png'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'
import { useHandleSignIn } from '@hooks/login'
import { useSigninForm } from '@utils/screens/login'
import { usePasswordControls } from '@utils/screens/register'

import { Text } from '@components/text'
import { Input } from '@components/input'
import { Button } from '@components/button'

export const screenwidth = Dimensions.get('window').width.toFixed(2)

import * as Styled from './styled'

export const Login = () => {
  const { navigate } = useNavigation<NativeStackRoutesScreenProps>()
  const { colors } = useTheme()
  const passwordControls = usePasswordControls()
  const { isSign, handleSignIn } = useHandleSignIn()
  const { control, errors, handleSubmit } = useSigninForm()

  function handleRegisterScreen() {
    navigate('register')
  }

  return (
    <Styled.Container>
      <ScrollView
        style={{ backgroundColor: colors.gray[100] }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          <Styled.Content>
            <Styled.LogoSection>
              <Image source={Logo} />
              <View style={{ alignItems: 'center' }}>
                <Text text="marketspace" font="bold" size="4xl" color="700" />
                <Text
                  text="Seu espaço de compra e venda"
                  size="md"
                  font="regular"
                  color="500"
                />
              </View>
            </Styled.LogoSection>

            <Styled.RegisterSectionContent>
              <Styled.FormSection>
                <Text
                  text="Acesse sua conta"
                  size="md"
                  font="regular"
                  color="600"
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input.Root
                      placeholder="E-mail"
                      value={value}
                      error={errors.email?.message}
                      onChangeText={onChange}
                    >
                      <Input.ErrorMessage error={errors.email?.message} />
                    </Input.Root>
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input.Root
                      placeholder="Senha"
                      value={value}
                      error={errors.password?.message}
                      onChangeText={onChange}
                      secureTextEntry={passwordControls.passwordShow}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(handleSignIn)}
                    >
                      <Input.ErrorMessage error={errors.password?.message} />
                      <Input.PasswordShow
                        onPress={() =>
                          passwordControls.setPasswordShow(
                            !passwordControls.passwordShow
                          )
                        }
                      />
                    </Input.Root>
                  )}
                />
              </Styled.FormSection>
              <Button.Root type="TERTIARY" onPress={handleSubmit(handleSignIn)}>
                {isSign ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text text="Entrar" size="md" font="bold" color="100" />
                )}
              </Button.Root>
            </Styled.RegisterSectionContent>
          </Styled.Content>

          <Styled.RegisterSection>
            <Styled.RegisterSectionContent>
              <Text
                text="Ainda não tem acesso?"
                size="md"
                font="regular"
                color="600"
                style={{ textAlign: 'center' }}
              />

              <Button.Root type="PRIMARY" onPress={handleRegisterScreen}>
                <Text
                  text="Criar uma conta"
                  size="md"
                  font="bold"
                  color="700"
                />
              </Button.Root>
            </Styled.RegisterSectionContent>
          </Styled.RegisterSection>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
