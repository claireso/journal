import React from 'react'
import PropTypes from 'prop-types'

import Pager from '../../components/Pager'
import Toolbar from '../../components/Toolbar'
import List from '../../components/List'
import { ButtonLink } from '../../components/Links'
import { IconPlus } from '../../components/Icons'
import Loader from '../../components/Loader'

import Photo from './Photo'

// const Photos = ({ photos = [], pager = {} }) => {
class Photos extends React.Component {

  componentDidMount() {
    this.props.loadPhotos()
  }

  onDelete = (id, event) => {
    event.preventDefault()
    this.props.navigate(`${id}/delete`)
  }

  onEdit = (id, event) => {
    event.preventDefault()
    this.props.navigate(`${id}/edit`)
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

        {
          photos.isLoading ?
            (
              <Loader />
            )
          :
            (
              <React.Fragment>
                <List>
                  {photos.items.map((photo, index) => <Photo key={index} {...photo} onDelete={ this.onDelete } onEdit={ this.onEdit } />)}
                </List>
                <Pager baseUrl="/admin/photos/page" {...photos.pager} />

                { this.props.children }
              </React.Fragment>
            )
        }
      </div>
    )
  }
}

Photos.propTypes = {
  // photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  // pager: PropTypes.object.isRequired
}

export default Photos
