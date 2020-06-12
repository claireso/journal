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

  const storeRequests = {}

  const getAction = (name) => {
    const actions = options.actions
    const action = actions && actions[name]

    if (!action || !action.action) {
      throw new Error(
        `ResourceManager: missing options for the action '${name}'`
      )
    }

    return action
  }

  const processRequest = async (action, actionName, ...args) => {
    if (action.abortable) {
      storeRequests[actionName]?.abort()
    }

    const currentRequest = action.action(...args)

    storeRequests[actionName] = currentRequest

    let response = await currentRequest.ready

    if (action.preprocess) {
      response = action.preprocess(response)
    }

    return response
  }

  const onSuccess = (action) => {
    action.onSuccess && action.onSuccess()
  }

  const onError = (err, action, dispatch) => {
    if (err.name === 'AbortError') return

    dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_ERROR })

    if (err?.response?.status === 401) return

    action.onError && action.onError()
  }

  const onEnd = (action, actionName) => {
    action.onEnd && action.onEnd()
    storeRequests[actionName] = undefined
  }

  const useResourcesReducer = () => {
    const state = useResourcesState()
    const dispatch = useResourcesDispatch()

    const loadResources = useCallback(
      async (page = 1) => {
        dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_LOADING })

        const actionName = 'loadResources'

        const action = getAction(actionName)

        try {
          const response = await processRequest(action, actionName, page)

          dispatch({ type: ACTION_LOAD_RESOURCES, response })

          onSuccess(action)
        } catch (err) {
          onError(err, action, dispatch)
        } finally {
          onEnd(action, actionName)
        }
      },
      [dispatch]
    )

    const loadResource = useCallback(
      async (id) => {
        const actionName = 'loadResource'

        const action = getAction(actionName)

        try {
          const response = await processRequest(action, actionName, id)

          dispatch({ type: ACTION_LOAD_RESOURCE, response })

          onSuccess(action)
        } catch (err) {
          onError(err, action, dispatch)
        } finally {
          onEnd(action, actionName)
        }
      },
      [dispatch]
    )

    const createResource = useCallback(
      async (data) => {
        dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_PENDING })

        const actionName = 'createResource'

        const action = getAction(actionName)

        try {
          const response = await processRequest(action, actionName, data)

          dispatch({ type: ACTION_ADD_RESOURCE, response })

          onSuccess(action)
        } catch (err) {
          onError(err, action, dispatch)
        } finally {
          onEnd(action, actionName)
        }
      },
      [dispatch]
    )

    const editResource = useCallback(
      async (id, data) => {
        dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_PENDING })

        const actionName = 'editResource'

        const action = getAction(actionName)

        try {
          const response = await processRequest(action, actionName, id, data)

          dispatch({ type: ACTION_EDIT_RESOURCE, response })

          onSuccess(action)
        } catch (err) {
          onError(err, action, dispatch)
        } finally {
          onEnd(action, actionName)
        }
      },
      [dispatch]
    )

    const deleteResource = useCallback(
      async (id) => {
        dispatch({ type: ACTION_UPDATE_STATUS, status: STATUS_PENDING })

        const actionName = 'deleteResource'

        const action = getAction(actionName)

        try {
          await processRequest(action, actionName, id)

          dispatch({ type: ACTION_DELETE_RESOURCE, id })

          onSuccess(action)
        } catch (err) {
          onError(err, action, dispatch)
        } finally {
          onEnd(action, actionName)
        }
      },
      [dispatch]
    )

    return [
      state,
      {
        loadResources,
        loadResource,
        createResource,
        editResource,
        deleteResource
      }
    ]
  }

  return {
    INITIAL_STATE: { ...INITIAL_STATE },
    Provider: ResourcesProvider,
    useReducer: useResourcesReducer
  }
}
