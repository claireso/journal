import React from 'react'
import PropTypes from 'prop-types'

import Page from './components/Page'
import Form from './form/Form'
import Toolbar from './components/Toolbar'
import { BackLink } from './components/Links'

const Edit = ({ photo }) => {
  return (
    <Page title="Edit photo">
      <Toolbar>
        <BackLink href="/admin/photos" label="Back to list" />
      </Toolbar>
      <Form photo={photo} />
    </Page>
  )
}

Edit.propTypes = {
  photo: PropTypes.object.isRequired
}

export default Edit
