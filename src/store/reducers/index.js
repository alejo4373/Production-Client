import { combineReducers } from 'redux';
import { RESET_STATE } from '../actionTypes/comm';

import todosReducer from './todosReducer';
import journalReducer from './journalReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import listsReducer from './listsReducer';

const appReducer = combineReducers({
  todos: todosReducer,
  journal: journalReducer,
  auth: authReducer,
  profile: profileReducer,
  lists: listsReducer
})

const rootReducer = (state = {}, action) => {
  if (action.type === RESET_STATE) {
    return {
      todos: {},
      journal: {},
      auth: {},
      profile: {}
    }
  }
  return appReducer(state, action)
}

export default rootReducer;
