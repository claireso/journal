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
  const { items: photos, pager, errorStatusCode } = props

  if (errorStatusCode) {
    return (
      <ErrorWrapper>
        <Error statusCode={errorStatusCode} />
      </ErrorWrapper>
    )
  }

  return photos?.length > 0 ? (
    <Photos photos={photos} pager={pager} />
  ) : (
    <Welcome />
  )
}

Homepage.getInitialProps = async (context) => {
  try {
    const { page } = context.query
    const photos = await getPhotos(page)

    return { ...photos }
  } catch (err) {
    return { errorStatusCode: err?.response?.status }
  }
}

Homepage.propTypes = {
  items: PropTypes.array,
  pager: PropTypes.object,
  errorStatusCode: PropTypes.number
}

export default withLayout(Homepage)
