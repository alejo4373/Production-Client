import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api';
import { RECEIVE_ERROR } from '../actionTypes/comm';
import { REQUEST_LISTS, RECEIVE_LISTS } from '../actionTypes/lists'

function* requestLists() {
  try {
    const { data } = yield call(api.requestLists)
    yield put({
      type: RECEIVE_LISTS,
      payload: { lists: data.payload.lists }
    })
  } catch (err) {
    console.log('ERROR in lists saga => ', err)
    yield put({ type: RECEIVE_ERROR, error: err });
  }
}

function* listsWatcher() {
  yield takeEvery(REQUEST_LISTS, requestLists)
}

export default listsWatcher;


