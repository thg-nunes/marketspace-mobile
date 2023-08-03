export type CardPropsAdapter = {
  is_new: boolean
  id: string
  name: string
  is_active: boolean
  price: number
  product_images: {
    path: string
  }[]
  user: {
    avatar: string
  }
}
