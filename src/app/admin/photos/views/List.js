import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

import Loader from '@common/components/Loader'

import Pager from '@admin/components/Pager'
import Toolbar from '@admin/components/Toolbar'
import List from '@admin/components/List'
import { PrimaryButton, PagerButton } from '@admin/components/Buttons'
import { IconPlus } from '@admin/components/Icons'
import Modal from '@admin/components/Modal'

import CreatePhoto from '../containers/Create'
import EditPhoto from '../containers/Edit'
import DeletePhoto from '../containers/Delete'
import Photo from './Photo'

const ACTION_TYPES = {
  CREATE_PHOTO: 'create_photo',
  EDIT_PHOTO: 'edit_photo',
  DELETE_PHOTO: 'delete_photo'
}

class Photos extends React.PureComponent {
  componentDidMount() {
    const query = this.getSearchParams()
    const params = {}

    if (query.page !== undefined) {
      params['page'] = query.page
    }

    this.props.loadPhotos(params)
  }

  componentDidUpdate(prevProps) {
    const prevQuery = this.getSearchParams(prevProps.location)
    const query = this.getSearchParams()

    if (prevQuery.page !== query.page) {
      this.props.loadPhotos({ page: query.page })
      window.scrollTo(0, 0)
    }
  }

  getSearchParams = loc => {
    if (!loc) loc = this.props.location

    return qs.parse(loc.search.substring(1))
  }

  navigate = (params = {}) => {
    const query = this.getSearchParams()

    const search = qs.stringify({
      ...query,
      ...params
    })

    this.props.navigate(`?${search}`)
  }

  onDelete = (id, event) => {
    event.preventDefault()
    this.navigate({
      action: ACTION_TYPES.DELETE_PHOTO,
      id: id
    })
  }

  onEdit = (id, event) => {
    event.preventDefault()
    this.navigate({
      action: ACTION_TYPES.EDIT_PHOTO,
      id: id
    })
  }

  getModal() {
    const query = this.getSearchParams()
    const action = query.action
    const id = Number(query.id)

    const onClose = () => this.navigate({ action: undefined, id: undefined })
    let component

    switch (action) {
      case ACTION_TYPES.CREATE_PHOTO: {
        component = <CreatePhoto />
        break
      }
      case ACTION_TYPES.DELETE_PHOTO: {
        if (!id) return null
        component = <DeletePhoto id={id} />
        break
      }
      case ACTION_TYPES.EDIT_PHOTO: {
        if (!id) return null

        let photo = this.props.photos.items.find(p => p.id === id)

        if (!photo) photo = this.props.photos.detail

        component = <EditPhoto photo={photo} id={id} />
        break
      }
    }

    return (
      <Modal isOpen={!!action} onClose={onClose}>
        {component}
      </Modal>
    )
  }

  render() {
    const { photos } = this.props

    return (
      <React.Fragment>
        <Toolbar>
          <PrimaryButton
            onClick={ev => {
              ev.preventDefault()
              this.navigate({ action: ACTION_TYPES.CREATE_PHOTO })
            }}
          >
            Add a new photo
            <IconPlus />
          </PrimaryButton>
        </Toolbar>

        {photos.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <List>
              {photos.items.map((photo, index) => (
                <Photo
                  key={index}
                  {...photo}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                />
              ))}
            </List>

            <Pager {...photos.pager} navigate={page => this.navigate({ page })}>
              {({ items, getItemsProps }) => {
                return items.map(item => (
                  <li key={item.label}>
                    <PagerButton
                      {...getItemsProps({
                        item: item,
                        title: item.title
                      })}
                    >
                      {item.label}
                    </PagerButton>
                  </li>
                ))
              }}
            </Pager>

            {this.getModal()}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

Photos.propTypes = {
  location: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  photos: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    pager: PropTypes.object,
    detail: PropTypes.object
  }).isRequired,
  loadPhotos: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Photos
