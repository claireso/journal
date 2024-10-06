import { withAuth } from 'next-auth/middleware'
import authOptions from '@infrastructure/auth/options'

export default withAuth({
  pages: authOptions.pages
})

export const config = { matcher: ['/admin/:subpath*'] }
