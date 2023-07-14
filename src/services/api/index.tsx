import { api } from '@services/axios'

type ApiServices = {
  fetchProducts: () => Promise<any>
}

const apiServices: ApiServices = {
  fetchProducts: async (): Promise<any> => {
    const { data } = await api.get('/products')
    return data
  }
}

export { apiServices }
