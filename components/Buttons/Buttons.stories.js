import React, { Fragment } from 'react'
import { action } from '@storybook/addon-actions'

import { PrimaryButton, SecondaryButton, ButtonIcon } from './index'
import * as Icons from '../Icons'

export default {
  title: 'Buttons'
}

export const Basic = () => (
  <Fragment>
    <PrimaryButton onClick={action('clicked')}>Primary Button</PrimaryButton>
    <SecondaryButton onClick={action('clicked')}>
      {' '}
      Secondary Button
    </SecondaryButton>
  </Fragment>
)

export const WithIcon = () => (
  <ButtonIcon onClick={action('clicked')}>
    <Icons.IconAngleRight />
  </ButtonIcon>
)

export const LoadingButton = () => (
  <PrimaryButton isLoading>Primary Button</PrimaryButton>
)
