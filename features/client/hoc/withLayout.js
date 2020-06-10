import Layout from '../components/Layout'

export default (WrappedComponent) => {
  WrappedComponent.Layout = Layout

  return WrappedComponent
}
