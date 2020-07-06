import Error from 'next/error'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import withLayout from '@features/client/hoc/withLayout'

import Welcome from '@features/client/Welcome'
import Photos from '@features/client/Photos'

import { getPhotos } from '@services/api'

const ErrorWrapper = styled.div`
  grid-column: 1/-1;
`

const Homepage = (props) => {
  const { items: photos, pager, hasError, errorStatusCode } = props

  if (hasError) {
    if (errorStatusCode) {
      return (
        <ErrorWrapper>
          <Error statusCode={errorStatusCode} />
        </ErrorWrapper>
      )
    }

    // if no errorStatusCode, user is offline
    return null
  }

  return photos?.length > 0 ? (
    <Photos photos={photos} pager={pager} />
  ) : (
    <Welcome />
  )
}

Homepage.currentRequest = undefined

Homepage.getInitialProps = async (context) => {
  try {
    if (Homepage.currentRequest) {
      Homepage.currentRequest.abort()
    }

    const { page } = context.query

    Homepage.currentRequest = getPhotos(page || 1)

    const photos = await Homepage.currentRequest.ready

    Homepage.currentRequest = undefined

    return { ...photos }
  } catch (err) {
    return { hasError: true, errorStatusCode: err?.response?.status }
  }
}

Homepage.propTypes = {
  items: PropTypes.array,
  pager: PropTypes.object,
  errorStatusCode: PropTypes.number,
  hasError: PropTypes.bool
}

export default withLayout(Homepage)
