import React, { Fragment } from 'react'
import { action } from '@storybook/addon-actions'

import { ButtonPrimary, ButtonSecondary, ButtonIcon } from './index'
import * as Icons from '../Icons'

const params = {
  title: 'Components/Buttons'
}

export default params

export const Basic = () => (
  <Fragment>
    <ButtonPrimary onClick={action('clicked')}>Primary Button</ButtonPrimary>
    <ButtonSecondary onClick={action('clicked')}> Secondary Button</ButtonSecondary>
  </Fragment>
)

export const WithIcon = () => (
  <ButtonIcon onClick={action('clicked')}>
    <Icons.IconAngleRight />
  </ButtonIcon>
)

export const LoadingButton = () => <ButtonPrimary isLoading>Primary Button</ButtonPrimary>
