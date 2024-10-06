import React from 'react'

import SubmitButton from './index'

const params = {
  title: 'Form/SubmitButton'
}

export default params

export const Basic = () => <SubmitButton value="Submit" />

export const LoadingButton = () => <SubmitButton value="Submit" isLoading />
