import { Text } from '@components/text'
import * as Styled from './styled'

export const InactiveAd = () => {
  return (
    <Styled.InactiveAdsIndicatorContainer>
      <Styled.BackgroundInactiveAds />
      <Text
        text="Anúncio desativado"
        color="100"
        font="bold"
        size="sm"
        style={{
          textTransform: 'uppercase',
          margin: 8,
          position: 'absolute',
          bottom: 0
        }}
      />
    </Styled.InactiveAdsIndicatorContainer>
  )
}
