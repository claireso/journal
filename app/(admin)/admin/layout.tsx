import Layout from './Layout.client'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <Layout>{children}</Layout>
}

export default AdminLayout
