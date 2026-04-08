import { type Metadata } from 'next'
import { Suspense } from 'react'

import { MessagesProvider } from '@web/features/messages/useMessages'

import { Loader } from '@web/components/Loader'

import * as cls from './styles.css'

export const metadata: Metadata = {
  title: 'Admin'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <MessagesProvider>
      <Suspense
        fallback={
          <div className={cls.loaderWrapper}>
            <Loader />
          </div>
        }
      >
        {children}
      </Suspense>
    </MessagesProvider>
  )
}
