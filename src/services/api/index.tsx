import { api } from '@services/axios'
import { CardPropsAdapter } from '@dtos/card'
import * as ProductDTOS from '@dtos/product'

type ApiServices = {
  fetchProducts: () => Promise<CardPropsAdapter[]>
  fetchProductsByFilter: (
    params: ProductDTOS.FetchProductsByFilterParams
  ) => Promise<CardPropsAdapter[]>
  fetchProductDetails: (id: string) => Promise<ProductDTOS.AdProductDetailsDTO>
  createProduct: (product: ProductDTOS.ProductDTO) => Promise<string>
  createProductImage: (product_id: string, image: string) => Promise<void>
  editProduct: (
    product_id: string,
    product: ProductDTOS.ProductDTO
  ) => Promise<void>
  deleteProduct: (product_id: string) => Promise<void>
  updataProductVisibility: ({
    id,
    is_active
  }: ProductDTOS.UpdataProductVisibility) => Promise<void>
}

const apiServices: ApiServices = {
  fetchProducts: async (): Promise<CardPropsAdapter[]> => {
    const { data } = await api.get<ProductDTOS.AdProductDTO[]>('/products')
    const cardPropsList: CardPropsAdapter[] = data.map((product) => {
      return {
        id: product.id,
        is_active: product.is_active,
        is_new: product.is_new,
        name: product.name,
        price: product.price,
        product_images: product.product_images,
        user: product.user
      }
    })

    return cardPropsList
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
  ): Promise<CardPropsAdapter[]> => {
    const { data } = await api.get<ProductDTOS.AdProductByFilterDTO[]>(
      '/products',
      {
        params
      }
    )
    const cardPropsList: CardPropsAdapter[] = data.map((product) => {
      return {
        id: product.id,
        is_active: true,
        is_new: product.is_new,
        name: product.name,
        price: product.price,
        product_images: product.product_images,
        user: product.user
      }
    })

    return cardPropsList
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
  },
  deleteProduct: async (product_id: string): Promise<void> => {
    try {
      await api.delete(`/products/${product_id}`)
    } catch (error) {
      throw error
    }
  }
}

export { apiServices }
