import { all, fork } from 'redux-saga/effects';

import todos from './todos';
import journal from './journal';
import auth from './auth';
import profile from './profile';
import lists from './lists';

function* rootSaga() {
  yield all([
    fork(todos),
    fork(journal),
    fork(auth),
    fork(profile),
    fork(lists)
  ])
}

export default rootSaga;
