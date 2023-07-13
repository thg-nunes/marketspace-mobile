import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const useSigninForm = () => {
  const signinSchema = yup.object({
    email: yup
      .string()
      .email('O email é inválido.')
      .required('Informe o email para logar no app.'),

    password: yup
      .string()
      .required('Informe a senha para logar no app.')
      .matches(/^[A-Z](?=.*\d)(?![^a-zA-Z0-9])/, {
        message: 'A senha é no padrão: Senha@123'
      })
      .min(8, 'A senha contém pelo menos 8 caracteries.')
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<{
    email: string
    password: string
  }>({
    resolver: yupResolver(signinSchema)
  })

  return {
    errors,
    control,
    handleSubmit
  }
}

export { useSigninForm }
