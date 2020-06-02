import { useEffect } from 'react'
import Router from 'next/router'

const AdminHomepage = () => {
  useEffect(() => {
    Router.replace('/admin/photos')
  }, [])

  return null
}

export default AdminHomepage
