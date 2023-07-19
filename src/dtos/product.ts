export type ProductDTO = {
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: string[]
}

export type AdProductDTO = {
  id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  is_active: boolean
  user_id: string
  user: {
    avatar: string
  }
  payment_methods: {
    [key: string]: string
    name: string
  }[]
  product_images: {
    path: string
  }[]
}

export type AdProductDetailsDTO = AdProductDTO & {
  user: {
    tel: number
    name: string
    avatar: string
  }
}
