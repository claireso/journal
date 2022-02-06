import { ColorPalette, ColorItem, Typeset } from '@storybook/addon-docs/blocks'
import { theme } from './index'

console.log({ theme })

export default {
  title: 'Theme',
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true }
    }
  }
}

const getColors = () => Object.values(theme.colors)
const getFontSizes = () => Object.values(theme.fontSizes).map((fontSize) => fontSize.value)

const Tokens = ({ name }) => {
  const tokens = theme[name]

  if (!tokens) return null

  return Object.values(tokens).map((token) => (
    <div key={token.token} style={{ display: 'flex', marginBottom: '4px', alignItems: 'center' }}>
      <div style={{ marginRight: '30px', fontSize: '12px', color: 'rgba(51,51,51,0.6)' }}>{token.value}</div>
      <div>{`${token.scale}.$${token.token}`}</div>
    </div>
  ))
}

export const Colors = () => (
  <ColorPalette>
    {getColors().map((color) => (
      <ColorItem key={color.token} title={color.token} subtitle="" colors={[color.value]} />
    ))}
  </ColorPalette>
)

export const Typography = () => <Typeset fontSizes={getFontSizes()} fontWeight={theme.fontWeights.normal} />

export const Spaces = () => <Tokens name="space" />

export const FontWeights = () => <Tokens name="fontWeights" />

export const Radii = () => <Tokens name="radii" />

export const Sizes = () => <Tokens name="sizes" />
