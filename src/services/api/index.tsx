import * as ProductDTOS from '@dtos/product'
import { api } from '@services/axios'

type ApiServices = {
  fetchProducts: () => Promise<ProductDTOS.AdProductDTO[]>
  fetchProductsByFilter: (
    params: ProductDTOS.FetchProductsByFilterParams
  ) => Promise<ProductDTOS.AdProductByFilterDTO[]>
  fetchProductDetails: (id: string) => Promise<ProductDTOS.AdProductDetailsDTO>
  createProduct: (product: ProductDTOS.ProductDTO) => Promise<string>
  createProductImage: (product_id: string, image: string) => Promise<void>
  editProduct: (
    product_id: string,
    product: ProductDTOS.ProductDTO
  ) => Promise<void>
  updataProductVisibility: ({
    id,
    is_active
  }: ProductDTOS.UpdataProductVisibility) => Promise<void>
}

const apiServices: ApiServices = {
  fetchProducts: async (): Promise<any> => {
    const { data } = await api.get<ProductDTOS.AdProductDTO[]>('/products')
    return data
  },
  createProduct: async (product: ProductDTOS.ProductDTO): Promise<string> => {
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
  fetchProductDetails: async (
    id: string
  ): Promise<ProductDTOS.AdProductDetailsDTO> => {
    const { data } = await api.get<ProductDTOS.AdProductDetailsDTO>(
      `/products/${id}`
    )

    return data
  },
  fetchProductsByFilter: async (
    params: ProductDTOS.FetchProductsByFilterParams
  ): Promise<ProductDTOS.AdProductByFilterDTO[]> => {
    const response = await api.get<ProductDTOS.AdProductByFilterDTO[]>(
      '/products',
      {
        params
      }
    )

    return response.data
  },
  updataProductVisibility: async ({
    id,
    is_active
  }: ProductDTOS.UpdataProductVisibility): Promise<void> => {
    try {
      await api.patch(`/products/${id}`, { is_active })
    } catch (error) {
      throw error
    }
  },
  editProduct: async (
    product_id: string,
    product: ProductDTOS.ProductDTO
  ): Promise<void> => {
    try {
      await api.put(`/products/${product_id}`, product)
    } catch (error) {
      throw error
    }
  }
}

export { apiServices }
