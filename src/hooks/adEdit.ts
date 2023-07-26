import { useCallback, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { useFocusEffect } from '@react-navigation/native'

import { theme } from '../theme'
import { AdProductDetailsDTO, ProductDTO } from '@dtos/product'

import { apiServices } from '@services/api'
import { myToast } from '@utils/toast'
import { AppError } from '@utils/screens/appError'

type UseHandleProductPhotoSelect = {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

async function handleProductPhotoSelect({
  images,
  setImages
}: UseHandleProductPhotoSelect) {
  if (images.length === 3) {
    // exibir alerta com mensagem de aviso de quantidade de imgs atingida
    return
  }

  const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    selectionLimit: 3,
    quality: 1,
    aspect: [4, 4]
  })

  if (canceled) return

  const imagesUri = assets.map((image) => image.uri)
  setImages((prevState) => [...prevState, ...imagesUri])
}

function handleRemoveImage(
  imageUri: string,
  imageData: UseHandleProductPhotoSelect
): void {
  const imagesUri = imageData.images.filter((image) => image !== imageUri)
  imageData.setImages(imagesUri)
}

function fetchProductDetails(productId: string) {
  const [product, setProduct] = useState<AdProductDetailsDTO>(
    {} as AdProductDetailsDTO
  )
  const [images, setImages] = useState<string[]>([])
  const [acceptTrade, setAcceptTrade] = useState(false)
  const [productIsNew, setProductIsNew] = useState(true)
  const [productValue, setProductValue] = useState('')
  const [productTitle, setProductTitle] = useState('')
  const [productAcceptPayments, setProductAcceptPayments] = useState<string[]>(
    []
  )
  const [productDescription, setProductDescription] = useState('')

  useFocusEffect(
    useCallback(() => {
      async function fetchProductDetails() {
        const response = await apiServices.fetchProductDetails(productId)

        const payment_methods = response.payment_methods.map(
          (paymentMethod) => paymentMethod.key
        )
        const imagesUri = response.product_images.map((image) => image.path)

        setProduct(response)
        setImages(imagesUri)
        setProductTitle(response.name)
        setProductDescription(response.description)
        setProductIsNew(response.is_new)
        setAcceptTrade(response.accept_trade)
        setProductAcceptPayments(payment_methods)
        setProductValue(String(response.price))
      }
      fetchProductDetails()
    }, [productId])
  )

  return {
    product,
    images,
    setImages,
    acceptTrade,
    setAcceptTrade,
    productIsNew,
    setProductIsNew,
    productValue,
    setProductValue,
    productTitle,
    setProductTitle,
    productAcceptPayments,
    setProductAcceptPayments,
    productDescription,
    setProductDescription
  }
}

async function handleAdUpdate(productId: string, product: ProductDTO) {
  try {
    await apiServices.editProduct(productId, product)

    myToast({
      message: 'Produto editado com sucesso.',
      background: theme.colors.green.dark
    })
  } catch (error) {
    if (error instanceof AppError) {
      myToast({
        message: error.message,
        background: theme.colors.red.light
      })
    }
  }
}

export {
  handleProductPhotoSelect,
  handleRemoveImage,
  fetchProductDetails,
  handleAdUpdate
}
