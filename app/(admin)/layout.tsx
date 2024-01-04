import { type Metadata } from 'next'

import Layout from './Layout.client'

export const metadata: Metadata = {
  title: 'Admin'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
