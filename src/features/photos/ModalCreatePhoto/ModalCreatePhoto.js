import { memo } from 'react'
import PropTypes from 'prop-types'

import { Heading2 } from '@components/Headings'
import FormPhoto from '../FormPhoto'

const ModalCreatePhoto = ({ onSubmit, isProcessing }) => {
  return (
    <>
      <Heading2>Create a photo</Heading2>
      <FormPhoto onSubmit={onSubmit} isProcessing={isProcessing} />
    </>
  )
}

ModalCreatePhoto.propTypes = {
  onSubmit: PropTypes.func,
  isProcessing: PropTypes.bool
}

ModalCreatePhoto.defaultProps = {
  onSubmit: () => {},
  isProcessing: false
}

export default memo(ModalCreatePhoto)
