import { Controller } from 'react-hook-form'
import { ActivityIndicator } from 'react-native'

import { useHandleSignIn } from '@hooks/login'

import { useSigninForm } from '@utils/screens/login'
import { usePasswordControls } from '@utils/screens/register'

import { Text } from '@components/text'
import { Input } from '@components/input'
import { Button } from '@components/button'

import * as Styled from './styled'

export const SignSectionContent = () => {
  const passwordControls = usePasswordControls()
  const { isSign, handleSignIn } = useHandleSignIn()
  const { control, errors, handleSubmit } = useSigninForm()

  return (
    <Styled.RegisterSectionContent>
      <Styled.FormSection>
        <Text text="Acesse sua conta" size="md" font="regular" color="600" />

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
  )
}
