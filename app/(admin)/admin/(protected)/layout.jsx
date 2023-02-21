import ProtectedLayout from './ProtectedLayout.client'
import Layout from './Layout.client'

const AdminLayout = ({ children }) => {
  return (
    <ProtectedLayout>
      <Layout>{children}</Layout>
    </ProtectedLayout>
  )
}

export default AdminLayout
