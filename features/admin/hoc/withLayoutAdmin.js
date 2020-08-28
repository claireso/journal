import Layout from '../components/Layout'

const withLayoutAdmin = (WrappedComponent) => {
  WrappedComponent.Layout = Layout

  return WrappedComponent
}

export default withLayoutAdmin
