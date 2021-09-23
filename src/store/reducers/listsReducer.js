import { RECEIVE_LISTS, RECEIVE_NEW_LIST } from '../actionTypes/lists';

const defaultListsState = {
  lists: []
}

const listsReducer = (state = defaultListsState, { type, payload }) => {
  const newState = { ...state }
  switch (type) {
    case RECEIVE_LISTS:
      newState.lists = payload.lists
      return newState;

    case RECEIVE_NEW_LIST:
      newState.lists = [payload.list, ...newState.lists]
      return newState;


    default:
      return state;
  }
}

export default listsReducer
