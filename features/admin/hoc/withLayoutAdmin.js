import Layout from '../components/Layout'

export default (WrapperComponent) => {
  WrapperComponent.Layout = Layout

  return WrapperComponent
}
