import React from 'react'
import PropTypes from 'prop-types'

import Page from '../components/Page'
import Pager from '../components/Pager'
import Toolbar from '../components/Toolbar'
import List from '../components/List'
import { ButtonLink } from '../components/Links'
import { IconPlus } from '../components/Icons'
import { AdminTabs } from '../components/tabs'

import Photo from './Photo'

const Photos = ({ photos, pager }) => {
  return (
    <Page>
      <AdminTabs active="photos" />
      <Toolbar alignRight>
        <ButtonLink
          href="/admin/photos/new"
          label="Add a photo"
          icon={<IconPlus />}
        />
      </Toolbar>
      <List>
        {photos.map((photo, index) => <Photo key={index} {...photo} />)}
      </List>
      <Pager baseUrl="/admin/photos/page" {...pager} />
    </Page>
  )
}

Photos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  pager: PropTypes.object.isRequired
}

export default Photos