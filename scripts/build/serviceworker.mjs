import esbuild from 'esbuild'
import dotenv from '@next/env'

const { loadEnvConfig } = dotenv

const projectDir = process.cwd()
// load environment variables from `.env` files
loadEnvConfig(projectDir)

const context = await esbuild.context({
  entryPoints: ['src/interface/web/services/serviceworker/sw.ts'],
  outfile: 'public/sw.js',
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  define: {
    ['process.env.NODE_ENV']: JSON.stringify(process.env.NODE_ENV ?? ''),
    ['process.env.NOTIFICATIONS_ENABLED']: JSON.stringify(
      Boolean(process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY) && Boolean(process.env.NOTIFICATIONS_PRIVATE_KEY)
    ),
    ['process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY']: JSON.stringify(
      process.env.NEXT_PUBLIC_NOTIFICATIONS_PUBLIC_KEY
    )
  },
  plugins: [
    {
      name: 'rebuild-notify',
      setup(build) {
        build.onEnd((result) => {
          console.log(`Build serviceworker ended with ${result.errors.length} errors \n`)
        })
      }
    }
  ]
})

try {
  if (process.env.WATCH === 'true') {
    console.log('Watching for changes...')
    await context.watch()
  } else {
    await context.rebuild()
    process.exit(0)
  }
} catch (err) {
  console.error('Build failed:', err)
  process.exit(0)
}
