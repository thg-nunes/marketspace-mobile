import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { FlatList, Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { NativeStackRoutesScreenProps } from '@routes/auth.routes'

import { Text } from '@components/text'

import * as Styled from './styled'
import { Input } from '@components/input'
import { CheckRadioInput } from '@components/radioCheckbox'

export const AdCreate = () => {
  const { goBack } = useNavigation<NativeStackRoutesScreenProps>()
  const [images, setImages] = useState<string[]>([])

  async function handleProductPhotoSelect() {
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

  return (
    <Styled.Container>
      <Styled.Header>
        <Pressable onPress={goBack}>
          <Styled.GobackIcon />
        </Pressable>
        <Text
          color="700"
          size="xl"
          font="bold"
          text="Criar anúncio"
          style={{ flex: 1, textAlign: 'center' }}
        />
      </Styled.Header>

      <View style={{ gap: 16 }}>
        <View style={{ gap: 16 }}>
          <View style={{ gap: 4 }}>
            <Text text="Imagens" color="700" font="bold" size="lg" />
            <Text
              text="Escolha até 3 imagens para mostrar o quando o seu produto é incrível!"
              color="700"
              font="regular"
              size="md"
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          {images.length > 0 && (
            <FlatList
              data={images}
              style={{
                maxWidth: images.length * 100
              }}
              contentContainerStyle={{ gap: 8, paddingRight: 15 }}
              renderItem={({ item }) => (
                <Styled.ProductPhotoSelected
                  source={{
                    uri: item
                  }}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
          {images.length < 3 && (
            <Styled.ProductPhotoSelector
              activeOpacity={0.8}
              onPress={handleProductPhotoSelect}
            >
              <Styled.PlusIcon />
            </Styled.ProductPhotoSelector>
          )}
        </View>
      </View>

      <View
        style={{
          gap: 16,
          marginVertical: 32,
          flex: 1
        }}
      >
        <Text font="bold" size="lg" color="600" text="Sobre o produto" />
        <Input placeholder="Título do anúncio" />
        <Input
          placeholder="Descrição do produto"
          numberOfLines={3}
          inputHeight={136}
          style={{
            textAlignVertical: 'top',
            height: 136,
            paddingVertical: 12
          }}
        />
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <CheckRadioInput inputRadioLabel="Produto novo" />
          <CheckRadioInput inputRadioLabel="Produto usado" />
        </View>
      </View>
    </Styled.Container>
  )
}
