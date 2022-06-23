import React from 'react'

import Text from './index'

const params = {
  title: 'Components/Text'
}

export default params

export const Basic = () => <Text>Text align left</Text>

export const AlignCenter = () => <Text align="center">Text align center</Text>

export const AlignRight = () => <Text align="right">Text align right</Text>
