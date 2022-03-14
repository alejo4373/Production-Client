import * as api from '../../api'
import { RECEIVE_USER, REQUEST_USER } from '../actionTypes/profile'
import { call, put, takeEvery } from 'redux-saga/effects'

function* getUser({ type }) {
  try {
    const { data } = yield call(api.getUser)
    yield put({
      type: RECEIVE_USER,
      payload: { user: data.payload.user }
    })
  } catch (err) {
    console.error('ERROR in getUser saga => ', err)
  }
}

function* profileWatcher() {
  yield takeEvery(REQUEST_USER, getUser)
}

export default profileWatcher
