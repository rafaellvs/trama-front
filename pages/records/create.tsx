import React from 'react'
import Head from 'next/head'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

import { NextPage, GetServerSideProps } from 'next'
import { Record, RecordForCreationWithRefs } from 'types/Record'
import { Category } from 'types/Category'

import { getCategories } from 'api/category'
import { createRecordWithRefs } from 'api/record'
import { useApi } from 'hooks/use-api'

import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
  Box,
  IconButton,
  Textarea,
} from '@chakra-ui/react'

type CreateRecordPageProps = {
  category_id: Category['id']
  categories: Category[]
}

const CreateRecordPage: NextPage<CreateRecordPageProps> = ({ category_id, categories }) => {
  const { isLoading, makeRequest } = useApi<Record, RecordForCreationWithRefs>()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecordForCreationWithRefs>({
    defaultValues: {
      category_id,
      refs: [{ content: '', subject_id: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'refs',
  })

  const onSubmit: SubmitHandler<RecordForCreationWithRefs> = async (data) => {
    const nonEmptyRefs = data.refs.filter(ref => ref.content)
    await makeRequest({
      apiMethod: createRecordWithRefs,
      apiMethodArgs: { ...data, refs: nonEmptyRefs },
      successMessage: `O registro ${data.name} foi criado com sucesso.`,
      withRedirect: 'back',
    })
  }

  return (
    <>
      <Head>
        <title>Trama - Criar registro</title>
        <meta name='description' content='Criar registro' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Heading size='2xl' textAlign='center' pb='8'>
          Criar registro
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isRequired
            isInvalid={errors.name !== undefined}
          >
            <FormLabel>Nome</FormLabel>
            <Input
              type='text'
              placeholder='Nome do registro'
              {...register(
                'name',
                { required: 'O campo nome ?? obrigat??rio.' }
              )}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.category_id !== undefined}
            pt='4'
          >
            <FormLabel>Categoria</FormLabel>
            <Select
              placeholder='Escolha uma categoria'
              {...register(
                'category_id',
                { required: 'O campo categoria ?? obrigat??rio.' }
              )}
            >
              {categories.map(category =>
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              )}
            </Select>
            <FormErrorMessage>{errors.category_id?.message}</FormErrorMessage>
          </FormControl>

          <FormControl pt='4'>
            <Box display='flex'>
              <FormLabel>Refer??ncia(s)</FormLabel>
              <IconButton
                icon={<AddIcon />}
                aria-label='Adicionar refer??ncia'
                size='xs'
                onClick={() => append({
                  subject_id: 0,
                  content: '',
                })}
              />
            </Box>
            {fields.map((field, index) =>
              <Box
                key={field.id}
                display='flex'
                alignItems='flex-end'
              >
                <Input
                  key={field.id}
                  type='text'
                  placeholder='Refer??ncia (artigo, documenta????o, material de estudo...)'
                  {...register(`refs.${index}.content`)}
                  mt={index !== 0 ? '4' : '0'}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label='Remover refer??ncia'
                  onClick={() => remove(index)}
                  ml='4'
                  size='sm'
                />
              </Box>
            )}
          </FormControl>

          <FormControl pt='4'>
            <FormLabel>Descri????o</FormLabel>
            <Textarea
              placeholder='Descri????o do registro'
              {...register('description')}
            />
          </FormControl>

          <Button
            type='submit'
            w='100%'
            mt='8'
            isLoading={isLoading}
          >
            Criar registro
          </Button>
        </form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category_id = context.query?.category_id ?? null

  try {
    const categories = await getCategories()
    return {
      props: {
        category_id,
        categories,
      },
    }
  } catch (err) {
    return {
      props: {
        category_id,
        categories: [],
      },
    }
  }
}

export default CreateRecordPage
