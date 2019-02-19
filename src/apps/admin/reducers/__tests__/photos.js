import * as actionTypes from '../../actions/photos'
import photosReducer from '../photos'

describe('reducer photos', () => {
  let reducer

  test('should request photos', () => {
    const action = {
      type: actionTypes.LOAD_PHOTOS_REQUEST
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      items: [],
      pager: null,
      isLoading: true,
      isProcessing: false
    })
  })

  test('should load photos', () => {
    const action = {
      type: actionTypes.LOAD_PHOTOS_SUCCESS,
      response: __PHOTOS__
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      items: [
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
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
      },
      isLoading: false,
      isProcessing: false
    })
  })

  test('should load one photo', () => {
    const action = {
      type: actionTypes.LOAD_PHOTO_SUCCESS,
      response: __PHOTO__
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      detail: {
        id: 1,
        title: 'Single photography',
        description: 'Janvier 2019',
        name: '01d2tf2h38pwcd953ans2f64p7.jpg',
        position: 'center',
        portrait: false,
        square: false,
        created_at: '2019-02-03T19:59:00.088Z',
        updated_at: '2019-02-03T19:59:00.088Z'
      },
      items: [
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
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
      },
      isLoading: false,
      isProcessing: false
    })
  })

  test('should start create a photo', () => {
    const action = {
      type: actionTypes.CREATE_PHOTO_REQUEST
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      detail: {
        id: 1,
        title: 'Single photography',
        description: 'Janvier 2019',
        name: '01d2tf2h38pwcd953ans2f64p7.jpg',
        position: 'center',
        portrait: false,
        square: false,
        created_at: '2019-02-03T19:59:00.088Z',
        updated_at: '2019-02-03T19:59:00.088Z'
      },
      items: [
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
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
      },
      isLoading: false,
      isProcessing: true
    })
  })

  test('should not create photo', () => {
    const action = {
      type: actionTypes.CREATE_PHOTO_ERROR,
      error: { message: 'error' }
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      detail: {
        id: 1,
        title: 'Single photography',
        description: 'Janvier 2019',
        name: '01d2tf2h38pwcd953ans2f64p7.jpg',
        position: 'center',
        portrait: false,
        square: false,
        created_at: '2019-02-03T19:59:00.088Z',
        updated_at: '2019-02-03T19:59:00.088Z'
      },
      items: [
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
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
      },
      isLoading: false,
      isProcessing: false,
      error: {
        message: 'error'
      }
    })
  })

  test('should create one photo', () => {
    const action = {
      type: actionTypes.CREATE_PHOTO_SUCCESS,
      response: __PHOTO__
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      detail: {
        id: 1,
        title: 'Single photography',
        description: 'Janvier 2019',
        name: '01d2tf2h38pwcd953ans2f64p7.jpg',
        position: 'center',
        portrait: false,
        square: false,
        created_at: '2019-02-03T19:59:00.088Z',
        updated_at: '2019-02-03T19:59:00.088Z'
      },
      items: [
        {
          id: 1,
          title: 'Single photography',
          description: 'Janvier 2019',
          name: '01d2tf2h38pwcd953ans2f64p7.jpg',
          position: 'center',
          portrait: false,
          square: false,
          created_at: '2019-02-03T19:59:00.088Z',
          updated_at: '2019-02-03T19:59:00.088Z'
        },
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
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
      },
      isLoading: false,
      isProcessing: false,
      error: null
    })
  })

  test('should start edit photo', () => {
    const action = {
      type: actionTypes.EDIT_PHOTO_REQUEST
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      detail: {
        id: 1,
        title: 'Single photography',
        description: 'Janvier 2019',
        name: '01d2tf2h38pwcd953ans2f64p7.jpg',
        position: 'center',
        portrait: false,
        square: false,
        created_at: '2019-02-03T19:59:00.088Z',
        updated_at: '2019-02-03T19:59:00.088Z'
      },
      items: [
        {
          id: 1,
          title: 'Single photography',
          description: 'Janvier 2019',
          name: '01d2tf2h38pwcd953ans2f64p7.jpg',
          position: 'center',
          portrait: false,
          square: false,
          created_at: '2019-02-03T19:59:00.088Z',
          updated_at: '2019-02-03T19:59:00.088Z'
        },
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
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
      },
      isLoading: false,
      isProcessing: true,
      error: null
    })
  })

  test('should edit photo', () => {
    const action = {
      type: actionTypes.EDIT_PHOTO_SUCCESS,
      response: {
        ...__PHOTO__,
        title: 'Single photography edit'
      }
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      detail: {
        id: 1,
        title: 'Single photography',
        description: 'Janvier 2019',
        name: '01d2tf2h38pwcd953ans2f64p7.jpg',
        position: 'center',
        portrait: false,
        square: false,
        created_at: '2019-02-03T19:59:00.088Z',
        updated_at: '2019-02-03T19:59:00.088Z'
      },
      items: [
        {
          id: 1,
          title: 'Single photography edit',
          description: 'Janvier 2019',
          name: '01d2tf2h38pwcd953ans2f64p7.jpg',
          position: 'center',
          portrait: false,
          square: false,
          created_at: '2019-02-03T19:59:00.088Z',
          updated_at: '2019-02-03T19:59:00.088Z'
        },
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
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
      },
      isLoading: false,
      isProcessing: false,
      error: null
    })
  })

  test('should start delete photo', () => {
    const action = {
      type: actionTypes.DELETE_PHOTO_REQUEST
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      detail: {
        id: 1,
        title: 'Single photography',
        description: 'Janvier 2019',
        name: '01d2tf2h38pwcd953ans2f64p7.jpg',
        position: 'center',
        portrait: false,
        square: false,
        created_at: '2019-02-03T19:59:00.088Z',
        updated_at: '2019-02-03T19:59:00.088Z'
      },
      items: [
        {
          id: 1,
          title: 'Single photography edit',
          description: 'Janvier 2019',
          name: '01d2tf2h38pwcd953ans2f64p7.jpg',
          position: 'center',
          portrait: false,
          square: false,
          created_at: '2019-02-03T19:59:00.088Z',
          updated_at: '2019-02-03T19:59:00.088Z'
        },
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
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
      },
      isLoading: false,
      isProcessing: true,
      error: null
    })
  })

  test('should not delete photo', () => {
    const action = {
      type: actionTypes.DELETE_PHOTO_ERROR
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      detail: {
        id: 1,
        title: 'Single photography',
        description: 'Janvier 2019',
        name: '01d2tf2h38pwcd953ans2f64p7.jpg',
        position: 'center',
        portrait: false,
        square: false,
        created_at: '2019-02-03T19:59:00.088Z',
        updated_at: '2019-02-03T19:59:00.088Z'
      },
      items: [
        {
          id: 1,
          title: 'Single photography edit',
          description: 'Janvier 2019',
          name: '01d2tf2h38pwcd953ans2f64p7.jpg',
          position: 'center',
          portrait: false,
          square: false,
          created_at: '2019-02-03T19:59:00.088Z',
          updated_at: '2019-02-03T19:59:00.088Z'
        },
        {
          id: 199,
          title: '',
          description: 'Février 2019',
          name: '01d2y7jt2j24dv0s82m9xq729d.jpg',
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
      },
      isLoading: false,
      isProcessing: false,
      error: null
    })
  })

  test('should delete photo', () => {
    const action = {
      type: actionTypes.DELETE_PHOTO_SUCCESS,
      id: 199
    }

    reducer = photosReducer(reducer, action)

    expect(reducer).toEqual({
      detail: {
        id: 1,
        title: 'Single photography',
        description: 'Janvier 2019',
        name: '01d2tf2h38pwcd953ans2f64p7.jpg',
        position: 'center',
        portrait: false,
        square: false,
        created_at: '2019-02-03T19:59:00.088Z',
        updated_at: '2019-02-03T19:59:00.088Z'
      },
      items: [
        {
          id: 1,
          title: 'Single photography edit',
          description: 'Janvier 2019',
          name: '01d2tf2h38pwcd953ans2f64p7.jpg',
          position: 'center',
          portrait: false,
          square: false,
          created_at: '2019-02-03T19:59:00.088Z',
          updated_at: '2019-02-03T19:59:00.088Z'
        },
        {
          id: 198,
          title: '',
          description: 'Janvier 2019',
          name: '01d2tf2h38pwcd953ans2f64p7.jpg',
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
      },
      isLoading: false,
      isProcessing: false,
      error: null
    })
  })
})
