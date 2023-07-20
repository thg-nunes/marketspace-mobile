export type ProductDTO = {
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: string[]
}

export type PaymentMethods = {
  key: string
  name: string
}[]

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
  payment_methods: PaymentMethods
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

export type AdProductByFilterDTO = {
  id: string
  name: string
  is_new: boolean
  price: number
  accept_trade: boolean
  product_images: {
    path: string
  }[]
  payment_methods: PaymentMethods
  user: {
    avatar: string
  }
}
