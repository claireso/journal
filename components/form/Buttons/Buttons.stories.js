import React from 'react'

import SubmitButton from './index'

export default {
  title: 'Form/SubmitButton'
}

export const Basic = () => <SubmitButton value="Submit" />

export const LoadingButton = () => <SubmitButton value="Submit" isLoading />
