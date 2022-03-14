import * as api from '../../api'
import { RECEIVE_ERROR } from '../actionTypes/comm'
import {
  RECEIVE_LISTS,
  RECEIVE_NEW_LIST,
  REQUEST_ADD_LIST,
  REQUEST_LISTS,
  REQUEST_LISTS_PENDING
} from '../actionTypes/lists'
import { call, put, takeEvery } from 'redux-saga/effects'

function* requestLists() {
  try {
    yield put({ type: REQUEST_LISTS_PENDING })
    const { data } = yield call(api.requestLists)
    yield put({
      type: RECEIVE_LISTS,
      payload: { lists: data.payload.lists }
    })
  } catch (err) {
    console.error('ERROR in lists saga => ', err)
    yield put({ type: RECEIVE_ERROR, error: err })
  }
}

function* requestAddList(action) {
  try {
    const { data } = yield call(api.requestAddList, action.payload.name)
    yield put({
      type: RECEIVE_NEW_LIST,
      payload: { list: data.payload.list }
    })
  } catch (err) {
    console.error('ERROR in lists saga => ', err)
    yield put({ type: RECEIVE_ERROR, error: err })
  }
}

function* listsWatcher() {
  yield takeEvery(REQUEST_LISTS, requestLists)
  yield takeEvery(REQUEST_ADD_LIST, requestAddList)
}

export default listsWatcher
