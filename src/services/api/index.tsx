import { ProductDTO } from '@dtos/product'
import { api } from '@services/axios'

type ApiServices = {
  fetchProducts: () => Promise<any>
  createProduct: (product: ProductDTO) => Promise<string>
}

const apiServices: ApiServices = {
  fetchProducts: async (): Promise<any> => {
    const { data } = await api.get('/products')
    return data
  },
  createProduct: async (product: ProductDTO): Promise<string> => {
    const {
      data: { id }
    } = await api.post<{ id: string }>('/products', product)

    return id
  }
}

export { apiServices }
