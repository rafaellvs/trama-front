import axios from 'axios'

import {
  Category,
  CategoryForCreation,
  CategoryForUpdate,
  CategoryForDeletion,
} from 'types/Category'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${BASE_URL}/category`)
  const data = response.data

  return data
}

const getCategoryById = async (id: Category['id']): Promise<Category> => {
  const response = await axios.get(`${BASE_URL}/category/${id}`)
  const data = response.data[0]

  return data
}

const createCategory = async ({ name, description }: CategoryForCreation): Promise<Category> => {
  const response = await axios.post(`${BASE_URL}/category/create`, {
    name,
    description,
  })
  const data = response.data[0]

  return data
}

const updateCategory = async ({ id, name, description }: CategoryForUpdate): Promise<Category> => {
  const response = await axios.patch(`${BASE_URL}/category/update/${id}`, {
    name,
    description,
  })
  const data = response.data[0]

  return data
}

const removeCategory = async ({ id }: CategoryForDeletion): Promise<Category> => {
  const response = await axios.delete(`${BASE_URL}/category/remove/${id}`)
  const data = response.data[0]

  return data
}

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
}
