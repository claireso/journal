import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Location } from '@reach/router'
import { Provider } from 'react-redux'

import List from '../List'

import configureStore from '@admin/store/configureStore'

describe('<List />', () => {
  /**
   * Pass properties `navigate` and `location`
   * @param {React.element} component
   */
  const renderWithLocation = (Component, customProps = {}, container) => {
    const defaultProps = {
      photos: {
        isLoading: false,
        ...global.__PHOTOS__
      },
      loadPhotos: () => {}
    }
    return render(
      <Provider store={configureStore()}>
        <Location>
          {props => {
            return <Component {...props} {...defaultProps} {...customProps} />
          }}
        </Location>
      </Provider>,
      { container }
    )
  }

  test('should render loading view', () => {
    const props = {
      photos: {
        isLoading: true,
        items: [],
        pager: null
      }
    }

    const { container } = renderWithLocation(List, props)

    expect(container).toMatchSnapshot()
  })

  test('should render list photos', () => {
    const props = {
      loadPhotos: jest.fn()
    }
    const { container } = renderWithLocation(List, props)

    expect(container).toMatchSnapshot()
    expect(props.loadPhotos).toHaveBeenCalledWith({})
  })

  test('should load photos page 2 on mounting then load page 3', () => {
    const props = {
      location: {
        search: '?page=2'
      },
      loadPhotos: jest.fn()
    }

    const { container } = renderWithLocation(List, props)

    expect(props.loadPhotos).toBeCalledWith({ page: '2' })

    const newProps = {
      location: {
        search: '?page=3'
      },
      loadPhotos: jest.fn()
    }
    renderWithLocation(List, newProps, container)

    expect(newProps.loadPhotos).toHaveBeenCalledWith({ page: '3' })
  })

  test('should call edit / delete / create photo actions', () => {
    const props = {
      navigate: jest.fn()
    }

    const { getByText, getAllByTitle } = renderWithLocation(List, props)

    fireEvent.click(getByText('Add a new photo'))

    expect(props.navigate).toHaveBeenNthCalledWith(1, '?action=create_photo')

    fireEvent.click(getAllByTitle('Edit')[0])

    expect(props.navigate).toHaveBeenNthCalledWith(
      2,
      '?action=edit_photo&id=199'
    )

    fireEvent.click(getAllByTitle('Delete')[0])

    expect(props.navigate).toHaveBeenNthCalledWith(
      3,
      '?action=delete_photo&id=199'
    )
  })

  test('should display create form', () => {
    const props = {
      location: {
        search: '?action=create_photo'
      }
    }

    const { container } = renderWithLocation(List, props)

    expect(container).toMatchSnapshot()
  })

  test('should display edit form', () => {
    const props = {
      location: {
        search: '?action=edit_photo&id=199'
      }
    }

    const { container } = renderWithLocation(List, props)

    expect(container).toMatchSnapshot()
  })

  test('should not display edit form', () => {
    const props = {
      location: {
        search: '?action=edit_photo'
      }
    }

    const { container } = renderWithLocation(List, props)

    expect(container).toMatchSnapshot()
  })

  test('should display delete modal', () => {
    const props = {
      location: {
        search: '?action=delete_photo&id=199'
      }
    }

    const { container } = renderWithLocation(List, props)

    expect(container).toMatchSnapshot()
  })

  test('should not display delete modal', () => {
    const props = {
      location: {
        search: '?action=delete_photo'
      }
    }

    const { container } = renderWithLocation(List, props)

    expect(container).toMatchSnapshot()
  })

  test('should navigate from pager', () => {
    const props = {
      navigate: jest.fn()
    }

    const { getByTitle } = renderWithLocation(List, props)

    fireEvent.click(getByTitle(/Next page/i))

    expect(props.navigate).toHaveBeenCalledWith('?page=2')
  })
})
