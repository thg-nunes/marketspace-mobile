import {
  AdProductByFilterDTO,
  AdProductDTO,
  AdProductDetailsDTO,
  FetchProductsByFilterParams,
  ProductDTO
} from '@dtos/product'
import { api } from '@services/axios'

type ApiServices = {
  fetchProducts: () => Promise<AdProductDTO[]>
  fetchProductsByFilter: (
    params: FetchProductsByFilterParams
  ) => Promise<AdProductByFilterDTO[]>
  fetchProductDetails: (id: string) => Promise<AdProductDetailsDTO>
  createProduct: (product: ProductDTO) => Promise<string>
  createProductImage: (product_id: string, image: string) => Promise<void>
}

const apiServices: ApiServices = {
  fetchProducts: async (): Promise<any> => {
    const { data } = await api.get<AdProductDTO[]>('/products')
    return data
  },
  createProduct: async (product: ProductDTO): Promise<string> => {
    const {
      data: { id }
    } = await api.post<{ id: string }>('/products', product)

    return id
  },
  createProductImage: async (
    product_id: string,
    image: string
  ): Promise<void> => {
    const formData = new FormData()
    formData.append('product_id', product_id)

    const photoExtension = image.split('.').pop()

    const imagesList = {
      uri: image,
      type: `image/${photoExtension}`,
      name: `product_image.${photoExtension}`.toLowerCase()
    } as any

    formData.append('images', imagesList)

    await api.post('/products/images', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  fetchProductDetails: async (id: string): Promise<AdProductDetailsDTO> => {
    const { data } = await api.get<AdProductDetailsDTO>(`/products/${id}`)

    return data
  },
  fetchProductsByFilter: async (
    params: FetchProductsByFilterParams
  ): Promise<AdProductByFilterDTO[]> => {
    const response = await api.get<AdProductByFilterDTO[]>('/products', {
      params
    })

    return response.data
  }
}

export { apiServices }
