import { createResourceManager, reducer } from './index'

describe('Resource reducer', () => {
  describe('Initialization', () => {
    const manager = createResourceManager()

    test('should be defined', () => {
      expect(manager.INITIAL_STATE).toBeDefined()
      expect(manager.Provider).toBeDefined()
      expect(manager.useReducer).toBeDefined()
    })
  })

  describe('reducer', () => {
    const manager = createResourceManager()

    let state = manager.INITIAL_STATE

    test('ACTION_UPDATE_STATUS', () => {
      state = reducer(state, {
        type: 'resources/update_status',
        status: 'pending'
      })

      expect(state.status).toEqual('pending')
    })

    test('ACTION_LOAD_RESOURCES', () => {
      state = reducer(state, {
        type: 'resources/get_all',
        response: global.__PHOTOS__
      })

      expect(state.status).toEqual('resources/update_success')
      expect(state.items).toHaveLength(2)
      expect(state.pager.count).toEqual(184)
    })

    test('ACTION_LOAD_RESOURCE', () => {
      state = reducer(state, {
        type: 'resources/get',
        response: global.__PHOTO__
      })

      expect(state.status).toEqual('resources/update_success')
      expect(state.single).toBeDefined()
      expect(state.single.title).toEqual('Single photography')
    })

    test('ACTION_ADD_RESOURCE', () => {
      state = reducer(state, {
        type: 'resources/add',
        response: global.__PHOTO__
      })

      expect(state.status).toEqual('resources/update_success')
      expect(state.items).toHaveLength(3)
      expect(state.items[0].title).toEqual('Single photography')
    })

    test('ACTION_EDIT_RESOURCE', () => {
      state = reducer(state, {
        type: 'resources/edit',
        response: { ...global.__PHOTO__, title: 'Single photography edit' }
      })

      expect(state.status).toEqual('resources/update_success')
      expect(state.items).toHaveLength(3)
      expect(state.items[0].title).toEqual('Single photography edit')
    })

    test('ACTION_DELETE_RESOURCE', () => {
      state = reducer(state, { type: 'resources/delete', id: 1 })

      expect(state.status).toEqual('resources/update_success')
      expect(state.items).toHaveLength(2)
      expect(state.items[0].id).toEqual(199)
    })
  })
})
