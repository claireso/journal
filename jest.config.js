const path = require('path')

module.exports = {
  rootDir: './src',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.js')],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/.cypress'],
  // collectCoverageFrom: [
  //   '**/*.js',
  //   '!**/coverage/**',
  //   '!**/pages/api/**',
  //   '!**/services/db/**',
  //   '!**/services/middlewares/**',
  // ],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/components$1',
    '^@utils(.*)$': '<rootDir>/utils$1',
    '^@services(.*)$': '<rootDir>/services$1',
    '^@features(.*)$': '<rootDir>/features$1',
    '^@hooks(.*)$': '<rootDir>/hooks$1',
    '^@types(.*)$': '<rootDir>/types$1',
    '^@theme(.*)$': '<rootDir>/theme$1'
  },
  // temp waiting next swc transforms
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: ['next/babel']
      }
    ]
  },
  globals: {
    __PHOTOS__: {
      items: [
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
          source: '01d2y7jt2j24dv0s82m9xq729d.jpg',
          position: 'right',
          portrait: false,
          square: false,
          created_at: '2019-02-05T07:05:02.548Z',
          updated_at: '2019-02-05T08:24:09.612Z'
        },
        {
          id: 198,
          title: '',
          description: 'Janvier 2019',
          name: '01d2tf2h38pwcd953ans2f64p7.jpg',
          source: '01d2tf2h38pwcd953ans2f64p7.jpg',
          position: 'center',
          portrait: false,
          square: false,
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
      name: '01d2tf2h38pwcd953ans2f64p7.jpg',
      source: '01d2tf2h38pwcd953ans2f64p7.jpg',
      position: 'center',
      portrait: false,
      square: false,
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
