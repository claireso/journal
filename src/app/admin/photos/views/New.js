import React from 'react'
import PropTypes from 'prop-types'

import Page from '../components/Page'
import Form from './form/Form'
import Toolbar from '../components/Toolbar'
import { BackLink } from '../components/Buttons'

const New = ({ photo }) => {
  return (
    <Page title="New photo">
      <Toolbar>
        <BackLink href="/admin/photos" label="Back to list" />
      </Toolbar>
      <Form photo={photo} />
    </Page>
  )
}

New.propTypes = {
  photo: PropTypes.object
}

export default New
