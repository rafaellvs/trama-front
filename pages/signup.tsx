import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'

import { NextPage } from 'next'
import { User, UserForSignup } from 'types/User'

import { useApi } from 'hooks/use-api'

import Link from 'components/_core/Link'
import {
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react'

const SignupPage: NextPage = () => {
  const { isLoading, makeRequest } = useApi<User, UserForSignup>()
  const { register, handleSubmit, formState: { errors } } = useForm<UserForSignup>()

  const onSubmit: SubmitHandler<UserForSignup> = async (data) => {
    console.log(data)
    // await makeRequest({
    //   apiMethod: createCategory,
    //   apiMethodArgs: data,
    //   successMessage: `A categoria ${data.name} foi criada com sucesso.`,
    //   withRedirect: '/categories',
    // })
  }

  return (
    <>
      <Head>
        <title>Trama - Signup</title>
        <meta name='description' content='Trama - Página de criação de usuário' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center'>
          Cadastro
        </Heading>

        <Text textAlign='center' pt='4' pb='8'>
          Cria sua conta ou <Link href='/login'>conecte-se com uma já existente</Link>.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isRequired
            isInvalid={errors.username !== undefined}
          >
            <FormLabel>Nome de usuário</FormLabel>
            <Input
              type='text'
              placeholder='Nome de usuário'
              {...register('username', { required: 'O campo nome de usuário é obrigatório.' })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.email !== undefined}
            pt='4'
          >
            <FormLabel>E-mail</FormLabel>
            <Input
              type='text'
              placeholder='Seu e-mail'
              {...register('email', { required: 'O campo e-mail é obrigatório.' })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.password !== undefined}
            pt='4'
          >
            <FormLabel>Senha</FormLabel>
            <Input
              type='password'
              placeholder='Senha de usuário'
              {...register('password')}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type='submit'
            w='100%'
            mt='8'
            isLoading={isLoading}
          >
            Conectar
          </Button>
        </form>
      </Container>
    </>
  )
}

export default SignupPage
