import { DefaultTheme } from 'styled-components/native'
import { Power, TrashSimple } from 'phosphor-react-native'

import { NativeStackRoutesScreenProps } from '@routes/nativeStack.routes'

import {
  handleAdDelete,
  handleUpdateProductVisibility
} from '@hooks/myAdDetails'
import { AdProductDetailsDTO } from '@dtos/product'

import { Text } from '@components/text'
import { Button } from '@components/button'

import * as Styled from './styled'

type ButtonsActionSectionProps = {
  appTheme: DefaultTheme
  stack: NativeStackRoutesScreenProps
  ad_id: string
  productDetails: AdProductDetailsDTO
}

export const ButtonsActionSection = ({
  productDetails,
  appTheme,
  stack,
  ad_id
}: ButtonsActionSectionProps) => {
  return (
    <Styled.ColumnCenterItems>
      <Button.Root
        type={productDetails.is_active ? 'SECONDARY' : 'TERTIARY'}
        style={{ maxWidth: '100%' }}
        onPress={() =>
          handleUpdateProductVisibility(
            {
              id: productDetails.id,
              is_active: !productDetails.is_active
            },
            stack.goBack
          )
        }
      >
        <Button.Icon
          Icon={Power}
          iconProps={{
            size: 16,
            color: 'white'
          }}
        />
        <Text
          color="100"
          font="bold"
          size="md"
          text={
            productDetails.is_active ? 'Desativar anúncio' : 'Reativar anúncio'
          }
        />
      </Button.Root>

      <Button.Root
        type="PRIMARY"
        style={{ maxWidth: '100%' }}
        onPress={() => handleAdDelete(ad_id, stack.goBack)}
      >
        <Button.Icon
          Icon={TrashSimple}
          iconProps={{
            size: 16,
            color: appTheme.colors.gray[700]
          }}
        />
        <Text color="700" font="bold" size="md" text="Excluir anúncio" />
      </Button.Root>
    </Styled.ColumnCenterItems>
  )
}
