import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTheme } from 'styled-components/native'
import { useForm, Controller } from 'react-hook-form'
import { Image, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Logo from '@assets/logo/logo.png'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import { Text } from '@components/text'
import { Input } from '@components/input'
import { Button } from '@components/button'
import { UserPhoto } from '@components/userPhoto'

import * as Styled from './styled'
import { useState } from 'react'

type FormRegisterProps = {
  name: string
  email: string
  phone: string
  password: string
  password_confirm: string
}

const registerSchema = yup.object({
  name: yup.string().required('Informe um nome de usuário.'),
  email: yup
    .string()
    .email('Informe um email válido.')
    .required('Informe um email para se cadastrar.'),
  phone: yup
    .string()
    .matches(/^(?:\(?(\d{2})\)?\s?)?(?:9\s?)?(?:[6-9]{1}\d{3})[-\s]?\d{4}$/, {
      message: 'Número de comtato inválido.'
    })
    .min(11, 'A quantidade mínima é de 11 dígitos.')
    .required('Informe um número para contato com o DDD.'),
  password: yup
    .string()
    .required('Informe uma senha para seu cadastro.')
    .matches(/^[A-Z](?=.*\d)(?![^a-zA-Z0-9])/, {
      message: 'Siga o exemplo: Senha@123'
    })
    .min(8, 'A senha deve conter pelo menos 8 caracteries.'),
  password_confirm: yup
    .string()
    .required('Informe a confirmação de senha.')
    .oneOf([yup.ref('password')], 'As senhas não convergem.')
})

export const Register = () => {
  const { colors } = useTheme()
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormRegisterProps>({
    resolver: yupResolver(registerSchema)
  })

  const [passwordShow, setPasswordShow] = useState(false)
  const [passwordConfirmShow, setPasswordConfirmShow] = useState(false)

  function handleSignIn() {
    goBack()
  }

  async function handleSubmitForm(data: any) {
    console.log(data)
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
                <Text text="Boas vindas!" color="700" font="bold" size="xl" />
                <Text
                  text="Crie sua conta e use o espaço para comprar itens variados e
                  vender seus produtos"
                  size="md"
                  color="500"
                  font="regular"
                  style={{
                    maxWidth: 279,
                    textAlign: 'center',
                    marginTop: 8
                  }}
                />
              </View>
            </Styled.LogoSection>

            <UserPhoto size={'xl'} photoEdiIcontShow />
            <View style={{ width: '100%', maxWidth: 279, marginTop: 16 }}>
              <Styled.FormSection>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input.Root
                      placeholder="Nome"
                      value={value}
                      error={errors.name?.message}
                      onChangeText={onChange}
                    >
                      <Input.ErrorMessage error={errors.name?.message} />
                    </Input.Root>
                  )}
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
                  name="phone"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input.Root
                      placeholder="Telefone"
                      value={value}
                      error={errors.phone?.message}
                      onChangeText={onChange}
                      keyboardType="numeric"
                    >
                      <Input.ErrorMessage error={errors.phone?.message} />
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
                      secureTextEntry={passwordShow}
                      error={errors.password?.message}
                      onChangeText={onChange}
                    >
                      <Input.PasswordShow
                        onPress={() => setPasswordShow(!passwordShow)}
                      />
                      <Input.ErrorMessage error={errors.password?.message} />
                    </Input.Root>
                  )}
                />

                <Controller
                  name="password_confirm"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input.Root
                      placeholder="Confirmar Senha"
                      value={value}
                      secureTextEntry={passwordConfirmShow}
                      error={errors.password_confirm?.message}
                      onChangeText={onChange}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(handleSubmitForm)}
                    >
                      <Input.PasswordShow
                        onPress={() =>
                          setPasswordConfirmShow(!passwordConfirmShow)
                        }
                      />
                      <Input.ErrorMessage
                        error={errors.password_confirm?.message}
                      />
                    </Input.Root>
                  )}
                />
              </Styled.FormSection>

              <Button.Root
                type="SECONDARY"
                onPress={handleSubmit(handleSubmitForm)}
              >
                <Text text="Criar" font="bold" size="sm" color="100" />
              </Button.Root>
            </View>
          </Styled.Content>

          <Styled.RegisterSection>
            <View style={{ width: '100%', maxWidth: 279, gap: 16 }}>
              <Text
                text="Já tem uma conta?"
                color="600"
                font="bold"
                size="xl"
                style={{
                  maxWidth: 279,
                  textAlign: 'center',
                  marginTop: 8
                }}
              />

              <Button.Root type="PRIMARY" onPress={handleSignIn}>
                <Text
                  text="Ir para o login"
                  font="bold"
                  size="sm"
                  color="600"
                />
              </Button.Root>
            </View>
          </Styled.RegisterSection>
        </View>
      </ScrollView>
    </Styled.Container>
  )
}
