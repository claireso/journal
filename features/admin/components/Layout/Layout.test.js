import { render, waitFor } from '@testing-library/react'

import withTestRouter from '@utils/hoc/withTestRouter'

import Layout from './Layout'

describe('<Layout />', () => {
  const renderComponent = (options) => {
    return render(
      withTestRouter(
        <Layout>
          <p>Content</p>
        </Layout>,
        options
      )
    )
  }

  beforeEach(() => {
    fetch.resetMocks()
  })

  test('should render component with restricted access', () => {
    const { container, queryByText } = renderComponent({
      pathname: 'admin/login'
    })

    expect(queryByText('Sign out')).toBeNull()
    expect(container).toMatchSnapshot()
  })

  test('should render component without restricted access (loading satus)', () => {
    const { container } = renderComponent({ pathname: 'admin/photos' })

    expect(container).toMatchSnapshot()
  })

  test('should render component without restricted access', async () => {
    fetch.mockResponseOnce(JSON.stringify(global.__USER__))

    const { container, getByText } = renderComponent({
      pathname: 'admin/photos'
    })

    await waitFor(() => {
      expect(getByText('Sign out')).toBeInTheDocument()
    })

    expect(container).toMatchSnapshot()
  })
})
