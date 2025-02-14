import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Journal',
    short_name: 'Journal',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#297373',
    theme_color: '#297373',
    icons: [
      {
        src: '/icons/icon-192-2.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512-2.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
