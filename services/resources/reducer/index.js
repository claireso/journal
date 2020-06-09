import React, { useReducer, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

const STATUS_IDLE = 'idle'
const STATUS_PENDING = 'pending'
const STATUS_LOADING = 'loading'
const STATUS_ERROR = 'error'
const STATUS_UPDATE_DATA_SUCCESS = 'resources/update_success'

const ACTION_UPDATE_STATUS = 'resources/update_status'
const ACTION_LOAD_RESOURCES = 'resources/get_all'
const ACTION_LOAD_RESOURCE = 'resources/get'
const ACTION_ADD_RESOURCE = 'resources/add'
const ACTION_DELETE_RESOURCE = 'resources/delete'
const ACTION_EDIT_RESOURCE = 'resources/edit'

const INITIAL_STATE = {
  status: STATUS_IDLE,
  items: [],
  pager: {}
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_UPDATE_STATUS:
      return {
        ...state,
        status: action.status
      }

    case ACTION_LOAD_RESOURCES:
      return {
        ...state,
        ...action.response,
        status: STATUS_UPDATE_DATA_SUCCESS
      }

    case ACTION_LOAD_RESOURCE:
      return {
        ...state,
        single: action.response
      }

    case ACTION_ADD_RESOURCE:
      return {
        ...state,
        status: STATUS_UPDATE_DATA_SUCCESS,
        items: [action.response, ...state.items],
        pager: {
          ...state.pager,
          count: state.pager.count + 1
        }
      }

    case ACTION_EDIT_RESOURCE: {
      const index = state.items.findIndex((p) => p.id == action.response.id)

      if (index < 0) return { ...state }

      return {
        ...state,
        status: STATUS_UPDATE_DATA_SUCCESS,
        items: [
          ...state.items.slice(0, index),
          action.response,
          ...state.items.slice(index + 1)
        ]
      }
    }

    case ACTION_DELETE_RESOURCE: {
      const index = state.items.findIndex((p) => p.id === action.id)

      if (index < 0) return { ...state }

      return {
        ...state,
        status: STATUS_UPDATE_DATA_SUCCESS,
        items: [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1)
        ],
        pager: {
          ...state.pager,
          count: state.pager.count - 1
        }
      }
    }
    default:
      return { ...state }
  }
}

export const createResourceManager = (options = {}) => {
  const ResourcesStateContext = React.createContext()
  const ResourcesDispatchContext = React.createContext()

  const ResourcesProvider = ({ children, value }) => {
    const [state, dispatch] = useReducer(reducer, value)

    return (
      <ResourcesStateContext.Provider value={state}>
        <ResourcesDispatchContext.Provider value={dispatch}>
          {children}
        </ResourcesDispatchContext.Provider>
      </ResourcesStateContext.Provider>
    )
  }

  ResourcesProvider.propTypes = {
    children: PropTypes.any,
    value: PropTypes.any
  }

  const useResourcesState = () => {
    const context = useContext(ResourcesStateContext)

    if (context === undefined) {
      throw new Error(
        'useResourcesState must be used within a ResourcesProvider'
      )
    }

    return context
  }

  const useResourcesDispatch = () => {
    const context = useContext(ResourcesDispatchContext)

    if (context === undefined) {
      throw new Error(
        'useResourcesDispatch must be used within a ResourcesProvider'
      )
    }

    return context
  }

  const getAction = (name) => {
    const actionsOptions = options.actions || {}
    const action = actionsOptions[name]

    if (!action || !action.action) {
      throw new Error(
        `ResourceManager: missing options for the action '${name}'`
      )
    }

    return action
  }

  const onSuccess = (action) => {
    if (action.onSuccess) {
      const message = action.onSuccess()
      if (message) {
        message
      }
    }
  }

  const onError = (action, err) => {
    if (err?.response?.status === 401) return

    if (action.onError) {
      const message = action.onError()
      if (message) {
        message
      }
    }
  }

  const onEnd = (action) => {
    action.onEnd && action.onEnd()
  }

  const useResourcesReducer = () => {
    const state = useResourcesState()
    const dispatch = useResourcesDispatch()

    const loadResources = useCallback(
      async (page = 1) => {
        dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_LOADING })

        const action = getAction('loadResources')

        try {
          let response = await action.action(page)

          if (action.preprocess) {
            response = action.preprocess(response)
          }

          dispatch({ type: ACTION_LOAD_RESOURCES, response })

          onSuccess(action)
        } catch (err) {
          dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_ERROR })

          onError(action, err)
        } finally {
          onEnd(action)
        }
      },
      [dispatch]
    )

    const loadResource = useCallback(
      async (id) => {
        const action = getAction('loadResource')

        try {
          let response = await action.action(id)

          if (action.preprocess) {
            response = action.preprocess(response)
          }

          dispatch({ type: ACTION_LOAD_RESOURCE, response })

          onSuccess(action)
        } catch (err) {
          dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_ERROR })

          onError(action, err)
        } finally {
          onEnd(action)
        }
      },
      [dispatch]
    )

    const createResource = useCallback(
      async (data) => {
        dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_PENDING })

        const action = getAction('createResource')

        try {
          let response = await action.action(data)

          if (action.preprocess) {
            response = action.preprocess(response)
          }

          dispatch({ type: ACTION_ADD_RESOURCE, response })

          onSuccess(action)
        } catch (err) {
          dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_ERROR })

          onError(action, err)
        } finally {
          onEnd(action)
        }
      },
      [dispatch]
    )

    const editResource = useCallback(
      async (id, data) => {
        dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_PENDING })

        const action = getAction('editResource')

        try {
          let response = await action.action(id, data)

          if (action.preprocess) {
            response = action.preprocess(response)
          }

          dispatch({ type: ACTION_EDIT_RESOURCE, response })

          onSuccess(action)
        } catch (err) {
          dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_ERROR })

          onError(action, err)
        } finally {
          onEnd(action)
        }
      },
      [dispatch]
    )

    const deleteResource = useCallback(
      async (id) => {
        dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_PENDING })

        const action = getAction('deleteResource')

        try {
          await action.action(id)
          dispatch({ type: ACTION_DELETE_RESOURCE, id })

          onSuccess(action)
        } catch (err) {
          dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_ERROR })
          onError(action, err)
        } finally {
          onEnd(action)
        }
      },
      [dispatch]
    )

    const test = () => {
      dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_ERROR })
    }

    return [
      state,
      {
        loadResources,
        loadResource,
        createResource,
        editResource,
        deleteResource,
        test
      }
    ]
  }

  return {
    INITIAL_STATE: { ...INITIAL_STATE },
    Provider: ResourcesProvider,
    useReducer: useResourcesReducer
  }
}
