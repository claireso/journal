import { type Metadata } from 'next'

import { MessagesProvider } from '@web/features/messages/useMessages'

export const metadata: Metadata = {
  title: 'Admin'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <MessagesProvider>{children}</MessagesProvider>
}
