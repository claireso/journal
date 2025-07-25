import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { action } from 'storybook/actions'

import Uploader from './Uploader'

const meta: Meta<typeof Uploader> = {
  title: 'Form/Uploader',
  component: Uploader,
  argTypes: { processing: { control: 'boolean' } },
  args: {
    name: 'media',
    accept: ['image/jpeg', 'image/png'],
    processing: false,
    onChangeMedia: action('onChange'),
    onError: action('onError')
  }
}

export default meta
type Story = StoryObj<typeof Uploader>

export const Primary: Story = {}
