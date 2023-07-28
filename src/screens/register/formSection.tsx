import { Controller } from 'react-hook-form'
import { useTheme } from 'styled-components/native'
import { ActivityIndicator, View } from 'react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import { useHandleSubmitForm } from '@hooks/register'
import {
  useFormRegister,
  useImageData,
  usePasswordControls
} from '@utils/screens/register'

import { Text } from '@components/text'
import { Input } from '@components/input'
import { Button } from '@components/button'

import * as Styled from './styled'

type RegisterFormSectionProps = {
  stack: NativeStackRoutesScreenProps
}

export const RegisterFormSection = ({ stack }: RegisterFormSectionProps) => {
  const { colors } = useTheme()

  const image = useImageData()
  const passwordControls = usePasswordControls()
  const { control, handleSubmit, errors } = useFormRegister()

  return (
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
              secureTextEntry={passwordControls.passwordShow}
              error={errors.password?.message}
              onChangeText={onChange}
            >
              <Input.PasswordShow
                onPress={() =>
                  passwordControls.setPasswordShow(
                    !passwordControls.passwordShow
                  )
                }
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
              secureTextEntry={passwordControls.passwordConfirmShow}
              error={errors.password_confirm?.message}
              onChangeText={onChange}
              returnKeyType="send"
              onSubmitEditing={handleSubmit((data) =>
                useHandleSubmitForm({
                  data,
                  imageURI: image.imageURI,
                  setIsRegistering: image.setIsRegistering,
                  navigate: stack.navigate
                })
              )}
            >
              <Input.PasswordShow
                onPress={() =>
                  passwordControls.setPasswordConfirmShow(
                    !passwordControls.passwordConfirmShow
                  )
                }
              />
              <Input.ErrorMessage error={errors.password_confirm?.message} />
            </Input.Root>
          )}
        />
      </Styled.FormSection>

      <Button.Root
        type="SECONDARY"
        onPress={handleSubmit((data) =>
          useHandleSubmitForm({
            data,
            imageURI: image.imageURI,
            setIsRegistering: image.setIsRegistering,
            navigate: stack.navigate
          })
        )}
      >
        {image.isRegistering ? (
          <ActivityIndicator color={colors.gray[100]} />
        ) : (
          <Text text="Criar" font="bold" size="sm" color="100" />
        )}
      </Button.Root>
    </View>
  )
}
