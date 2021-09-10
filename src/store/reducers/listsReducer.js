import { RECEIVE_LISTS } from '../actionTypes/lists';

const defaultListsState = {
  lists: []
}

const listsReducer = (state = defaultListsState, { type, payload }) => {
  const newState = { ...state }
  switch (type) {
    case RECEIVE_LISTS:
      newState.lists = payload.lists
      return newState;

    default:
      return state;
  }
}

export default listsReducer
