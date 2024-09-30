// jest.config.js
const nextJest = require('next/jest')

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' })

// Any custom config you want to pass to Jest
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/.cypress'],
  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@types(.*)$': '<rootDir>/src/types$1',
    '^@web(.*)$': '<rootDir>/src/interface/web$1',
    '^@models(.*)$': '<rootDir>/src/models$1'
  },
  globals: {
    __PHOTOS__: {
      items: [
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          media: {
            name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
            source: '/uploads/01d2y7jt2j24dv0s82m9xq729d.jpg',
            portrait: false,
            square: false
          },
          position: 'right',
          created_at: '2019-02-05T07:05:02.548Z',
          updated_at: '2019-02-05T08:24:09.612Z'
        },
        {
          id: 198,
          title: '',
          description: 'Janvier 2019',
          media: {
            name: '01d2tf2h38pwcd953ans2f64p7.jpg',
            source: '/uploads/01d2tf2h38pwcd953ans2f64p7.jpg',
            portrait: false,
            square: false
          },
          position: 'center',
          created_at: '2019-02-03T19:59:00.088Z',
          updated_at: '2019-02-03T19:59:00.088Z'
        }
      ],
      pager: {
        count: 184,
        totalPages: 19,
        limit: 10,
        offset: 0,
        next: 2,
        last: 19
      }
    },
    __PHOTO__: {
      id: 1,
      title: 'Single photography',
      description: 'Janvier 2019',
      media: {
        name: '01d2tf2h38pwcd953ans2f64p7.jpg',
        source: '/uploads/01d2tf2h38pwcd953ans2f64p7.jpg',
        portrait: false,
        square: false
      },
      position: 'center',
      created_at: '2019-02-03T19:59:00.088Z',
      updated_at: '2019-02-03T19:59:00.088Z'
    },
    __NOTIFICATIONS_PUBLIC_KEY__:
      'BF5aNmzb2AOaGpjZbZu4peOrCM5bRYjIv4BC0U1o-_qAhiA0RMiO09SnAOFUlQuQeLcG9mtwlUgksO1vckjQOXU',
    __SUBSCRIPTIONS__: {
      items: [
        {
          id: 118,
          subscription: {
            endpoint: 'https://fcm.googleapis.com/',
            expirationTime: null,
            keys: {
              p256dh: 'BH_v',
              auth: 'nijX1'
            }
          },
          created_at: '2019-02-05T15:41:23.646Z',
          updated_at: '2019-02-05T15:41:23.646Z'
        }
      ],
      pager: {
        count: 184,
        totalPages: 19,
        limit: 10,
        offset: 0,
        next: 2,
        last: 19
      }
    },
    __USER__: {
      cid: 1
    }
  }
}

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig)
