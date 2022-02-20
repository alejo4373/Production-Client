import {
  RECEIVE_LISTS,
  RECEIVE_NEW_LIST,
  REQUEST_LISTS_PENDING
} from '../actionTypes/lists'

const defaultListsState = {
  lists: [],
  loading: false
}

const listsReducer = (state = defaultListsState, { type, payload }) => {
  const newState = { ...state }
  switch (type) {
    case REQUEST_LISTS_PENDING:
      newState.loading = true
      return newState

    case RECEIVE_LISTS:
      newState.lists = payload.lists
      newState.loading = false
      return newState

    case RECEIVE_NEW_LIST:
      newState.lists = [payload.list, ...newState.lists]
      return newState

    default:
      return state
  }
}

export default listsReducer
