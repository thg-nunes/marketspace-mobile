import * as yup from 'yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormRegisterProps } from '@screens/register'

const useFormRegister = () => {
  const registerSchema = yup.object({
    name: yup.string().required('Informe um nome de usuário.'),
    email: yup
      .string()
      .email('Informe um email válido.')
      .required('Informe um email para se cadastrar.'),
    phone: yup
      .string()
      .matches(/^(\d{2})9[6-9]{1}\d{3}[-\s]?\d{4}$/, {
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

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormRegisterProps>({
    resolver: yupResolver(registerSchema)
  })

  return {
    errors,
    control,
    handleSubmit
  }
}

const usePasswordControls = () => {
  const [passwordShow, setPasswordShow] = useState(true)
  const [passwordConfirmShow, setPasswordConfirmShow] = useState(true)

  return {
    passwordShow,
    setPasswordShow,
    passwordConfirmShow,
    setPasswordConfirmShow
  }
}

const useImageData = () => {
  const [imageURI, setImageURI] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  return {
    imageURI,
    setImageURI,
    isRegistering,
    setIsRegistering
  }
}

export { useImageData, useFormRegister, usePasswordControls }
