import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Client from '../index'

describe('<Client />', () => {
  const props = {
    translations: __TRANSLATIONS__
  }

  beforeEach(() => {
    fetch.resetMocks()
  })

  test('should render <Welcome />', () => {
    const { container } = render(<Client {...props} />)

    expect(container).toMatchSnapshot()
  })

  test('should render <Photos />', () => {
    const { container } = render(<Client {...props} {...__PHOTOS__} />)

    expect(container).toMatchSnapshot()
  })

  test('should render <Loader /> then new page', done => {
    const { container, getByTitle } = render(
      <Client {...props} {...__PHOTOS__} />
    )

    fetch.mockResponse(
      JSON.stringify({
        items: [
          {
            id: 2,
            title: 'photo 1',
            description: '',
            name: '01d3kva5d01v3074xbar7bgg0x.jpg',
            position: 'left',
            portrait: true,
            square: false,
            created_at: '2019-02-13T16:33:56.514Z',
            updated_at: '2019-02-13T16:33:56.514Z'
          }
        ],
        pager: {
          count: 2,
          totalPages: 2,
          limit: 1,
          offset: 1,
          prev: 1,
          first: 1
        }
      })
    )

    // spnapshot loader
    fireEvent.click(getByTitle('Next page'))
    expect(container).toMatchSnapshot()

    setTimeout(() => {
      expect(container.querySelectorAll('figure')).toHaveLength(1)
      done()
    }, 1000)
  })
})
