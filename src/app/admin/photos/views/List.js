import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/Page'
import Pager from '../../components/Pager'
import Toolbar from '../../components/Toolbar'
import List from '../../components/List'
import { ButtonLink } from '../../components/Links'
import { IconPlus } from '../../components/Icons'
import { AdminTabs } from '../../components/tabs'

import Photo from './Photo'

// const Photos = ({ photos = [], pager = {} }) => {
class Photos extends React.Component {

  componentDidMount() {
    this.props.loadPhotos()
  }
  render() {
    const { photos } = this.props

    return (
      <div>
        <Toolbar alignRight>
          <ButtonLink
            href="#"
            label="Add a photo"
            icon={<IconPlus />}
            onClick={ (ev) => {
              ev.preventDefault()
              this.props.navigate('new')
            } }
          />
        </Toolbar>
        <List>
          {photos.items.map((photo, index) => <Photo key={index} {...photo} />)}
        </List>
        <Pager baseUrl="/admin/photos/page" {...photos.pager} />

        { this.props.children }
      </div>
    )
  }
}

Photos.propTypes = {
  // photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  // pager: PropTypes.object.isRequired
}

export default Photos
