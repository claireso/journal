import Layout from '../components/Layout'

const withLayout = (WrappedComponent) => {
  WrappedComponent.Layout = Layout

  return WrappedComponent
}

export default withLayout
